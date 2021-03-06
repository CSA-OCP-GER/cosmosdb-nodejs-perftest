FROM node:8.12.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY app.js ./
COPY test.json ./

CMD [ "node", "app.js" ]