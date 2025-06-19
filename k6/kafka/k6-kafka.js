/*
This is a k6 test script that imports the xk6-kafka and
tests Kafka with a 100 Avro messages per iteration.
*/

import { check } from "k6";
import {
  Writer,
  Reader,
  Connection,
  SchemaRegistry,
  KEY,
  VALUE,
  TOPIC_NAME_STRATEGY,
  RECORD_NAME_STRATEGY,
  SCHEMA_TYPE_AVRO,
  SCHEMA_TYPE_JSON,
  SCHEMA_TYPE_STRING
} from "k6/x/kafka"; // import kafka extension

const brokers = [__ENV.KAFKA_BROKER || "localhost:9092"];
const topic = __ENV.KAFKA_TOPIC || "test-topic-avro";
const registry = __ENV.SCHEMA_REGISTRY_URL || "http://localhost:8081";

const writer = new Writer({
  brokers: brokers,
  topic: topic,
  autoCreateTopic: true,
});
const reader = new Reader({
  brokers: brokers,
  topic: topic,
});
const connection = new Connection({
  address: brokers[0],
});
const schemaRegistry = new SchemaRegistry({
  url: registry
});

// Create the topic if it does not exist
// This is done only once by the first virtual user (VU)
// to avoid creating the topic multiple times
// and to ensure that the topic is created before any messages are produced.
if (__VU == 0) {
  connection.createTopic({ topic: topic });
}

const keySchema = open('schemas/order-key.avsc');
const valueSchema = open('schemas/order-value.avsc');

const keySubjectName = schemaRegistry.getSubjectName({
  topic: topic,
  element: KEY,
  subjectNameStrategy: TOPIC_NAME_STRATEGY,
  schema: keySchema,
});

const valueSubjectName = schemaRegistry.getSubjectName({
  topic: topic,
  element: VALUE,
  subjectNameStrategy: TOPIC_NAME_STRATEGY,
  schema: valueSchema,
});

const keySchemaObject = schemaRegistry.createSchema({
  subject: keySubjectName,
  schema: keySchema,
  schemaType: SCHEMA_TYPE_AVRO,
});

const valueSchemaObject = schemaRegistry.createSchema({
  subject: valueSubjectName,
  schema: valueSchema,
  schemaType: SCHEMA_TYPE_AVRO,
});

function getItems(index) {
  let items = [];
  let rows = Math.floor(Math.random() * 50) + 1; // Random number of items between 1 and 50
  for (let i = 0; i < rows; i++) {
    items.push({
      sku: `${index}-${i}`,
      productName: `product-${index}-${i}`,
      quantity: Math.floor(Math.random() * 10) + 1
    });
  }
  return items;
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function () {
  for (let index = 0; index < 10; index++) {
    let messages = [
      {
        key: schemaRegistry.serialize({
          data: {
            key: "key-" + index,
          },
          schema: keySchemaObject,
          schemaType: SCHEMA_TYPE_AVRO,
        }),
        value: schemaRegistry.serialize({
          data: {
            id: index,
            clientName: "client-" + index,
            items: getItems(index),
          },
          schema: valueSchemaObject,
          schemaType: SCHEMA_TYPE_AVRO,
        }),
        headers: {
          "correlationId": `${uuidv4()}`,
          "origin": "k6-kafka-test",
          "timestamp": new Date().toISOString()
        }
      },
    ];
    writer.produce({ messages: messages });
  }

  const quantityOfMessage = 30; // Number of messages to consume

  let messages = reader.consume({ limit: quantityOfMessage});
  check(messages, {
    [`${quantityOfMessage} message returned`]: (msgs) => msgs.length == quantityOfMessage,
    "key starts with 'key-' string": (msgs) =>
      schemaRegistry
        .deserialize({
          data: msgs[0].key,
          schema: keySchemaObject,
          schemaType: SCHEMA_TYPE_AVRO,
        })
        .key.startsWith("key-"),
    "value contains 'clientName-' and 'productName-' strings": (msgs) =>
      schemaRegistry
        .deserialize({
          data: msgs[0].value,
          schema: valueSchemaObject,
          schemaType: SCHEMA_TYPE_AVRO,
        })
        .clientName.startsWith("client-") &&
      schemaRegistry
        .deserialize({
          data: msgs[0].value,
          schema: valueSchemaObject,
          schemaType: SCHEMA_TYPE_AVRO,
        })
        .items[0].productName.startsWith("product-"),
  });
}

export function teardown(data) {
  if (__VU == 0) {
    // Delete the topic
    // connection.deleteTopic(topic);
  }
  writer.close();
  reader.close();
  connection.close();
}