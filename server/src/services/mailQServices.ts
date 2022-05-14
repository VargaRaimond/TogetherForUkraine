import amqplib from "amqplib";
import { Response } from "express";
import { IOfferActionMail } from "../models/mailQModels";

// TODO: maybe env?
const QUEUE_NAME = "emailQ";

const EXCHANGE_TYPE = "direct";
const EXCHANGE_NAME = "main";
const KEY = "myKey";

export const addEmailToQueue = async (message, res) => {
  try {
    const connection = await amqplib.connect("amqp://rabbitmq");
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
    await channel.assertQueue(QUEUE_NAME);

    channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, KEY);
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)));

  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log(`Failed with error ${e}`);
  }
};

export const addOfferActionMail = async (
  mailData: IOfferActionMail,
  res: Response,
  messageType
) => {
  const emailContact = mailData.volunteerContactEmail;

  const messageBody = {
    volunteerName: mailData.volunteerName,
    offerTitle: mailData.offerTitle,
  };

  await addEmailToQueue({ emailContact, messageType, ...messageBody }, res);
};
