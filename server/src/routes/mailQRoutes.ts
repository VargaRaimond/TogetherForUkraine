import express from "express";
import amqplib from "amqplib";
import { routesHelper } from "./routesHelper";

const router = express.Router();
// const controller = new AuthController();

// TODO: maybe env?
const QUEUE_NAME = "emailQ";

const EXCHANGE_TYPE = "direct";
const EXCHANGE_NAME = "main";
const KEY = "myKey";

// OFFER ACCEPT
// OFFER DECLINE
// APPLY NOW
// DELETED BY ADMIN

router.post(
  "/",
  routesHelper(async (req, res) => {
    try {
      const connection = await amqplib.connect("amqp://localhost");
      const channel = await connection.createChannel();
      await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
      await channel.assertQueue(QUEUE_NAME);

      channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, KEY);
      channel.sendToQueue(
        QUEUE_NAME,
        Buffer.from(JSON.stringify({ msg: "msg" }))
      );

      res.send({ msg: "Success" });
    } catch (e) {
      res.send({ msg: "Failed" });
    }
  })
);

export default router;
