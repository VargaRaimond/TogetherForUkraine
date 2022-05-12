FROM node:16

WORKDIR /home/server

COPY package*.json ./
RUN npm install
COPY . .
CMD npm run seeds & npm run server
