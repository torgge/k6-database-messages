// k6-script.js
import { check, sleep } from 'k6';
import sql from 'k6/x/sql';
import driver from 'k6/x/sql/driver/postgres'; 
import { Kafka, Producer } from 'k6/x/kafka';

// Configurações do PostgreSQL
const pgHost = __ENV.PG_HOST || 'localhost';
const pgPort = __ENV.PG_PORT || '5432';
const pgUser = __ENV.PG_USER || 'dev';
const pgPassword = __ENV.PG_PASSWORD || 'dev';
const pgDatabase = __ENV.PG_DATABASE || 'mydatabase';

const connectionString = `postgres://${pgUser}:${pgPassword}@${pgHost}:${pgPort}/${pgDatabase}?sslmode=disable`;

// Configurações do Kafka
const kafkaBrokers = __ENV.KAFKA_BROKERS ? __ENV.KAFKA_BROKERS.split(',') : ['localhost:9093']; // Use localhost:9093 para acesso externo
const kafkaTopic = __ENV.KAFKA_TOPIC || 'my_topic';

let db;
let producer;
let kafka;

export function setup() {
  console.log(`connetionString ${connectionString}`)
  db = sql.open(driver, connectionString)

  kafka = new Kafka();
  producer = new Producer({
    brokers: kafkaBrokers,
    compression: 'none', // 'none', 'gzip', 'snappy', 'lz4', 'zstd'
  });

  // Crie o tópico se ele não existir (opcional, pode ser feito manualmente também)
  kafka.createTopic({
    topic: kafkaTopic,
    numPartitions: 1,
    replicationFactor: 1,
  });
  sleep(1); // Dê um tempo para o tópico ser criado

  return { db, producer };
}

export default function () {
  // Consulta ao PostgreSQL
  const result = db.query`SELECT id, name, price FROM products;`;
  console.log(`Número de produtos encontrados: ${result.rows.length}`);

  if (result.rows.length > 0) {
    // Publica cada linha no Kafka
    result.rows.forEach(row => {
      const product = {
        id: row.id,
        name: row.name,
        price: parseFloat(row.price), // Garante que o preço é um número
      };
      const message = JSON.stringify(product);

      producer.produce({
        topic: kafkaTopic,
        headers: {
          'content-type': 'application/json',
        },
        value: message,
        key: product.id.toString(), // Use o ID do produto como chave
      });
      console.log(`Publicado no Kafka: ${message}`);
    });
  } else {
    console.log('Nenhum produto encontrado para publicar.');
  }

  // Verificação de sucesso
  check(result, {
    'rows retrieved from DB': (r) => r.rows.length > 0,
  });

  sleep(1); // Pausa para simular um comportamento de teste
}

export function teardown(data) {
  if (data.db) {
    data.db.close();
    console.log('Conexão com PostgreSQL fechada.');
  }
  if (data.producer) {
    data.producer.close();
    console.log('Produtor Kafka fechado.');
  }
}