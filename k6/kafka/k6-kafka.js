/*
This is a k6 test script that imports the xk6-kafka and
tests Kafka with a 1 Avro message per iteration.
*/

import { check, sleep } from "k6";
import {
  SCHEMA_TYPE_AVRO
} from "k6/x/kafka"; // import kafka extension
import { Trend } from "k6/metrics"; // import k6 metrics
import * as utils from "./utils/utils.js";
import { quantityOfMessage } from "./utils/envs.js";
import {
  schemaRegistry,
  writer,
  reader,
  keySchemaObject,
  valueSchemaObject,
  createTopicIfNotExists,
  closeAll,
  deleteTopicMessages
} from "./infra/kafka-config.js";

export const options = {
  stages: [
    // Ramp up to 5 users over 30 seconds
    { duration: "30s", target: 5 },
    // Maintain steady state of 10 users over the next 30 seconds
    { duration: "30s", target: 10 },
    // Ramp down to 0 users over the next 30 seconds
    { duration: "30s", target: 0 },
  ],
};

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

export let produceDuration = new Trend("produce_duration", true);

export function setup() {
  if (__VU == 0) {
    createTopicIfNotExists();
  }
}

export default function () {
  const start = new Date().getTime();

  for (let index = 0; index < quantityOfMessage; index++) {
    let correlationId = `${utils.uuidv4()}`;
    let messages = [
      {
        key: schemaRegistry.serialize({
          data: {
            key: `key-${correlationId}`,
          },
          schema: keySchemaObject,
          schemaType: SCHEMA_TYPE_AVRO,
        }),
        value: schemaRegistry.serialize({
          data: {
            id: index,
            clientName: `client-${index}`,
            items: getItems(index),
          },
          schema: valueSchemaObject,
          schemaType: SCHEMA_TYPE_AVRO,
        }),
        headers: {
          "correlationId": `${correlationId}`,
          "origin": "k6-kafka-test",
          "timestamp": new Date().toISOString()
        }
      },
    ];
    writer.produce({ messages: messages });
    sleep(1); // Sleep to simulate some delay between message production
  }
  // Wait for the messages to be produced
  produceDuration.add(new Date().getTime() - start);

  let messages = reader.consume({ limit: quantityOfMessage, timeout: 60000 }); // 60 segundos

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

export function teardown() {
  if (__VU == 0) {
    // Delete the topic
    deleteTopicMessages();
  }
  closeAll();
}