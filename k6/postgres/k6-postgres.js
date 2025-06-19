// k6-script.js
import { check, sleep } from 'k6';
import sql from 'k6/x/sql';
import driver from 'k6/x/sql/driver/postgres'; 

// Configurações do PostgreSQL
const pgHost = __ENV.PG_HOST || 'localhost';
const pgPort = __ENV.PG_PORT || '5432';
const pgUser = __ENV.PG_USER || 'dev';
const pgPassword = __ENV.PG_PASSWORD || 'dev';
const pgDatabase = __ENV.PG_DATABASE || 'mydatabase';

const connectionString = `postgres://${pgUser}:${pgPassword}@${pgHost}:${pgPort}/${pgDatabase}?sslmode=disable`;

export function setup() {
  console.log(`connetionString ${connectionString}`)
  let db = sql.open(driver, connectionString)
  sleep(1); // Dê um tempo para o tópico ser criado
  return { db };
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
    });
  } else {
    console.log('Nenhum produto encontrado para publicar.');
  }

  sleep(1); // Pausa para simular um comportamento de teste
}

export function teardown(data) {
  data.close
}