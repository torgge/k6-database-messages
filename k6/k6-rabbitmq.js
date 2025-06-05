import amqp from 'k6/x/amqp';
import { check, sleep } from 'k6';
import { Counter, Rate } from 'k6/metrics';

// Configure RabbitMQ connection details
const RABBITMQ_URL = 'amqp://guest:guest@localhost:5672/'; // Replace with your RabbitMQ URL
const QUEUE_NAME = 'k6_test_queue';
const MESSAGE_PREFIX = 'k6_test_message_';

// Custom metrics
const producedMessages = new Counter('produced_messages');
const consumedMessages = new Counter('consumed_messages');
const messageProductionErrorRate = new Rate('message_production_error_rate');
const messageConsumptionErrorRate = new Rate('message_consumption_error_rate');
const endToEndLatency = new Rate('end_to_end_latency_ms'); // To track latency of message delivery

export const options = {
    // A small number of VUs and iterations for initial testing
    // For actual load testing, increase VUs and duration/iterations
    vus: 5,
    iterations: 20,
    duration: '30s', // Test duration
    thresholds: {
        'produced_messages': ['count>0'],
        'consumed_messages': ['count>0'],
        'message_production_error_rate': ['rate<0.01'], // Less than 1% production errors
        'message_consumption_error_rate': ['rate<0.01'], // Less than 1% consumption errors
        'end_to_end_latency_ms': ['p(95)<1000'], // 95th percentile latency below 1 second
    },
};

export function setup() {
    console.log('Setting up RabbitMQ connection and queue...');
    let client = amqp.connect(RABBITMQ_URL);
    if (!client) {
        throw new Error('Failed to connect to RabbitMQ in setup phase.');
    }

    try {
        client.queueDeclare(QUEUE_NAME, { durable: true });
        console.log(`Queue '${QUEUE_NAME}' declared.`);
    } catch (e) {
        console.error(`Error declaring queue: ${e}`);
        client.close();
        throw e;
    } finally {
        client.close();
    }
    return { rabbitmqUrl: RABBITMQ_URL, queueName: QUEUE_NAME };
}

export default function (data) {
    let producerClient;
    let consumerClient;
    let messageId = `${__VU}_${__ITER}`;
    let messageContent = `${MESSAGE_PREFIX}${messageId}_${Date.now()}`;
    let success = false;

    // --- Producer ---
    try {
        producerClient = amqp.connect(data.rabbitmqUrl);
        if (!producerClient) {
            throw new Error('Failed to connect producer to RabbitMQ.');
        }

        producerClient.publish('amq.direct', data.queueName, messageContent);
        producedMessages.add(1);
        messageProductionErrorRate.add(0);
        console.log(`VU ${__VU}: Produced message: ${messageContent}`);
    } catch (e) {
        console.error(`VU ${__VU}: Error producing message: ${e}`);
        messageProductionErrorRate.add(1);
    } finally {
        if (producerClient) {
            producerClient.close();
        }
    }

    // --- Consumer ---
    // Introduce a small delay to allow message to be routed
    sleep(0.1); // 100ms

    try {
        consumerClient = amqp.connect(data.rabbitmqUrl);
        if (!consumerClient) {
            throw new Error('Failed to connect consumer to RabbitMQ.');
        }

        let consumedMessage = consumerClient.consume(data.queueName);
        if (consumedMessage) {
            consumedMessages.add(1);
            messageConsumptionErrorRate.add(0);
            console.log(`VU ${__VU}: Consumed message: ${consumedMessage.body}`);

            // Check if the consumed message matches the produced message
            if (consumedMessage.body === messageContent) {
                success = true;
                const sentTimestamp = parseInt(messageContent.split('_').pop());
                const receivedTimestamp = Date.now();
                endToEndLatency.add(receivedTimestamp - sentTimestamp);
            } else {
                console.warn(`VU ${__VU}: Consumed message mismatch! Expected: ${messageContent}, Got: ${consumedMessage.body}`);
            }
        } else {
            console.warn(`VU ${__VU}: No message consumed from queue '${data.queueName}'.`);
            messageConsumptionErrorRate.add(1);
        }
    } catch (e) {
        console.error(`VU ${__VU}: Error consuming message: ${e}`);
        messageConsumptionErrorRate.add(1);
    } finally {
        if (consumerClient) {
            consumerClient.close();
        }
    }

    check(success, { 'message produced and consumed successfully': success });
    sleep(1); // Adjust sleep time to control message rate
}

export function teardown(data) {
    console.log('Tearing down RabbitMQ connection and queue...');
    let client = amqp.connect(data.rabbitmqUrl);
    if (!client) {
        console.error('Failed to connect to RabbitMQ in teardown phase.');
        return;
    }

    try {
        // Optionally delete the queue after the test
        // client.queueDelete(data.queueName);
        console.log(`Queue '${data.queueName}' operations completed.`);
    } catch (e) {
        console.error(`Error during teardown: ${e}`);
    } finally {
        client.close();
    }
}