import amqplib from "amqplib";

// TODO: maybe env?
const QUEUE_NAME = "emailQ";

const connection = amqplib.connect("amqp://localhost");

connection.then(async (conn) => {
  const channel = await conn.createChannel();
  channel.consume(QUEUE_NAME, (m) => {
    const message = JSON.parse(m.content);
    console.log(message);
    channel.ack(m);
  });
});
