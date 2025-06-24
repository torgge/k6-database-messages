const brokers = [__ENV.KAFKA_BROKER || "localhost:9092"];
const topic = __ENV.KAFKA_TOPIC || "test-topic-avro";
const registry = __ENV.SCHEMA_REGISTRY_URL || "http://localhost:8081";
const quantityOfMessage = __ENV.QUANTITY_OF_MESSAGE || 1;

export {
    brokers,
    topic,
    registry,
    quantityOfMessage
}

