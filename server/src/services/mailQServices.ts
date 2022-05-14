import amqplib from "amqplib";

// TODO: maybe env?
const QUEUE_NAME = "emailQ";

const EXCHANGE_TYPE = "direct";
const EXCHANGE_NAME = "main";
const KEY = "myKey";

export const addEmailToQueue = async (message, res) => {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
    await channel.assertQueue(QUEUE_NAME);

    channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, KEY);
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)));

    res.send({ msg: "Success" });
  } catch (e) {
    res.send({ msg: "Failed" });
  }
};
