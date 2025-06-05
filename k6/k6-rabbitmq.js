import Amqp from 'k6/x/amqp';
import Queue from 'k6/x/amqp/queue';

export default function () {
  // Use the RABBITMQ_URL environment variable if set, otherwise default to localhost
  // Example: export RABBITMQ_URL=amqp://guest:guest@localhost:5672/
  // If not set, it will use the default RabbitMQ connection URL
  const url = __ENV.RABBITMQ_URL ? __ENV.RABBITMQ_URL : "amqp://guest:guest@localhost:5672/"
  Amqp.start({
    connection_url: url
  })
  console.log("Connection opened: " + url)

  const queueName = 'K6 general'

  Queue.declare({
    name: queueName,
    // durable: false,
    // delete_when_unused: false,
    // exclusive: false,
    // no_wait: false,
    // args: null
  })

  console.log(queueName + " queue is ready")

  Amqp.publish({
    queue_name: queueName,
    body: "Ping from k6",
    content_type: "text/plain"
    // exchange: '',
    // mandatory: false,
    // immediate: false,
    // headers: {
    //   'header-1': '',
    // },
  })

  const listener = function(data) { console.log('received data: ' + data) }
  Amqp.listen({
    queue_name: queueName,
    listener: listener,
    // consumer: '',
    // auto_ack: true,
    // exclusive: false,
		// no_local: false,
		// no_wait: false,
    // args: null
  })
}
