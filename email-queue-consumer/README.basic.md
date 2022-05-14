# RabbitMQ - how to use it

## Implementation (basic)

### Publisher
```typescript
import amqplib from "amqplib";

const QUEUE_NAME = "square";
const EXCHANGE_TYPE = "direct";
const EXCHANGE_NAME = "main";
const KEY = "myKey";
const number = "5";

const connection = amqplib.connect("amqp://localhost");
connection.then(async (conn) => {
   const channel = await conn.createChannel();
   await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
   await channel.assertQueue(QUEUE_NAME);
   channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, KEY);
   channel.sendToQueue(QUEUE_NAME, Buffer.from(number));
 });
```

### Consumer
```typescript
import amqplib from "amqplib";

const QUEUE_NAME = "emailQ";

const connection = amqplib.connect("amqp://localhost");
connection.then(async (conn) => {
  const channel = await conn.createChannel();
  channel.consume(QUEUE_NAME, (m) => {
    const nr = parseInt(m.content.toString(), 10);
    const square = nr * nr;
    console.log(square);
    channel.ack(m);
  });
});
```

## Usage

In terminal:
```
docker run --rm -it --hostname my-rabbit -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```

In browser: http://localhost:15672/


