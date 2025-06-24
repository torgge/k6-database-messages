import {
    Writer,
    Reader,
    Connection,
    SchemaRegistry,
    KEY,
    VALUE,
    TOPIC_NAME_STRATEGY,
    SCHEMA_TYPE_AVRO,
    CODEC_SNAPPY
} from "k6/x/kafka"; // import kafka extension
import {
    brokers,
    topic,
    registry,
} from "../utils/envs.js";

const keySchema = open('../schemas/order-key.avsc');
const valueSchema = open('../schemas/order-value.avsc');

const connection = new Connection({
    address: brokers[0],
});

const schemaRegistry = new SchemaRegistry({
    url: registry
});

const writer = new Writer({
    brokers: brokers,
    topic: topic,
    autoCreateTopic: true,
    compression: CODEC_SNAPPY
});

const reader = new Reader({
    brokers: brokers,
    groupId: `k6-kafka-order-group-${__VU}`,
    groupTopics: [topic],
});

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

function createTopicIfNotExists() {
    connection.createTopic({
        topic: topic,
        numPartitions: 6,
        replicationFactor: 1,
        configEntries: [
            {
                configName: "compression.type",
                configValue: CODEC_SNAPPY,
            },
        ],
    })
}

function closeAll() {
    writer.close();
    reader.close();
    connection.close();
    console.log("All connections closed");
}

function deleteTopicMessages() {
    connection.deleteTopic(topic);
    console.log(`Topic ${topic} deleted`);
}

export {
    connection,
    schemaRegistry,
    writer,
    reader,
    keySchemaObject,
    valueSchemaObject,
    topic,
    brokers,
    keySubjectName,
    valueSubjectName,
    createTopicIfNotExists,
    closeAll,
    deleteTopicMessages
}