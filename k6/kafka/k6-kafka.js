import {
    Writer,
    SchemaRegistry,
    SCHEMA_TYPE_AVRO,
} from 'k6/x/kafka';

// Configurações
const broker = __ENV.KAFKA_BROKER || "localhost:9092";
const registry = __ENV.SCHEMA_REGISTRY_URL || "http://localhost:8081";
const topic = __ENV.KAFKA_TOPIC || "test-topic-avro";

// Carrega os schemas (pode ser feito via URL também)
const keySchema = open('schemas/key.avsc');
const valueSchema = open('schemas/value.avsc');

// Cria o cliente do Schema Registry
const schemaRegistry = new SchemaRegistry(registry);

// Registra ou obtém os schemas
const schemaId = schemaRegistry.createSchema({
    schema: valueSchema,
    schemaType: SCHEMA_TYPE_AVRO,
    topic: topic,
    subject: topic + "-value",
});

const keySchemaId = schemaRegistry.createSchema({
    schema: keySchema,
    schemaType: SCHEMA_TYPE_AVRO,
    topic: topic,
    subject: topic + "-key",
});

// Cria o produtor
const writer = new Writer({
    brokers: [broker],
    topic: topic,
    autoCreateTopic: true,
});

// Função para gerar dados de teste
function generateUser(id) {
    return {
        id: id,
        name: `User ${id}`,
        email: `user${id}@example.com`,
        timestamp: Date.now(),
    };
}

export default function () {
    for (let i = 0; i < 10; i++) {
        const key = `key-${i}`;
        const value = generateUser(i);
        
        // Serializa os dados para Avro
        const serializedValue = schemaRegistry.serialize({
            schemaId: schemaId,
            data: value,
        });
        
        const serializedKey = schemaRegistry.serialize({
            schemaId: keySchemaId,
            data: key,
        });

        // Envia a mensagem
        writer.produce({
            key: serializedKey,
            value: serializedValue,
        });

        console.log(`Message ${i} sent`);
    }
}

export function teardown() {
    writer.close();
    schemaRegistry.close();
}