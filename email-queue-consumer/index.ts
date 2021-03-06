import amqplib from "amqplib";
import { sendEmail } from "./src/mailService";

const QUEUE_NAME = "emailQ";
const EXCHANGE_TYPE = "direct";
const EXCHANGE_NAME = "main";
const KEY = "myKey";

const connection = amqplib.connect("amqp://rabbitmq");

connection.then(async (conn) => {
  const channel = await conn.createChannel();
  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
  await channel.assertQueue(QUEUE_NAME);
  channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, KEY);
  channel.consume(QUEUE_NAME, (m) => {
    const message = JSON.parse(m.content);
    const { emailContact, messageType, ...messageBody } = message;

    if (emailContact && messageType && messageBody) {
      sendEmail(emailContact, messageType, messageBody);
    } else {
      // tslint:disable-next-line:no-console
      console.log("Missing parameters");
    }

    channel.ack(m);
  });
});
