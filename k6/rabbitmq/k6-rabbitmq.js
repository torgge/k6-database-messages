import Amqp from 'k6/x/amqp';
import Queue from 'k6/x/amqp/queue';
import { Trend } from 'k6/metrics';
export let publish_duration = new Trend('publish_duration');

// Função para gerar UUID v4
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const options = {
  vus: 600,
  duration: '30s',
  iterations: 600,
  thresholds: {
    // Todas as iterações devem ser concluídas
    iterations: ['count == 100'],
    // Duração média da iteração deve ser menor que 1s
    iteration_duration: ['p(95)<1000'],
    // Falhas não podem ocorrer
    checks: ['rate==1'],
    // Publicação deve ser rápida
    publish_duration: ['p(95)<500']
  },
};


// Função setup para k6
export function setup() {
  const url = __ENV.RABBITMQ_URL ? __ENV.RABBITMQ_URL : "amqp://guest:guest@localhost:5672/";
  Amqp.start({
    connection_url: url
  });
  console.log("Connection opened in setup: " + url);

  const queueName = 'my_k6_queue_' + Math.floor(Math.random() * 1000);
  const exchangeName = 'my_k6_exchange_' + Math.floor(Math.random() * 1000);
  const routingKey = 'my_k6_routing_key_' + Math.floor(Math.random() * 1000);
  const exchangeType = 'direct'; // Pode ser 'direct', 'fanout', 'topic', etc.


  Queue.declare({
    name: queueName,
    exchangeName: exchangeName,
    routingKey: routingKey,
    durable: true,
    type: exchangeType,
    // durable: false,
    // delete_when_unused: false,
    // exclusive: false,
    // no_wait: false,
    // args: null
  });
  console.log(queueName + " queue declared in setup");

  // Retorne dados se quiser compartilhar com VUs
  return { queueName, url, exchangeName, routingKey };
}

export default function ({ queueName, url, exchangeName, routingKey }) {
  // Use the RABBITMQ_URL environment variable if set, otherwise default to localhost
  // Example: export RABBITMQ_URL=amqp://guest:guest@localhost:5672/
  // If not set, it will use the default RabbitMQ connection URL
  console.log("Connection opened: " + url)
  const start = Date.now();
  const payload = {
    id: uuidv4(),
    message: 'Hello, RabbitMQ from k6!',
    timestamp: new Date().toISOString()
  }

  console.log(queueName + " queue is ready")

  Amqp.publish({
    exchange: exchangeName,
    routing_key: routingKey,
    body: JSON.stringify(payload),
    content_type: "application/json",
    // mandatory: false,
    // immediate: false,
    headers: {
      'x-version': '1.0',
      'correlation-id': payload.id,
      'timestamp': payload.timestamp,
    },
  })

  const listener = function(data) { console.log('received data: ' + data) }
  Amqp.listen({
    queue_name: queueName,
    listener: listener,
    // consumer: '',
    auto_ack: true,
    // exclusive: false,
		// no_local: false,
		// no_wait: false,
    // args: null
  })
  publish_duration.add(Date.now() - start);
}
