FROM node:16

WORKDIR /home/rabbitmq

COPY package*.json ./
RUN npm install
COPY . .
CMD npm run consumer
