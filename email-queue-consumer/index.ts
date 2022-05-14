import amqplib from "amqplib";
import { sendEmail } from "./src/mailin";

// TODO: maybe env?
const QUEUE_NAME = "emailQ";

const connection = amqplib.connect("amqp://localhost");

connection.then(async (conn) => {
  const channel = await conn.createChannel();
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
