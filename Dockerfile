FROM node:12

WORKDIR /usr/api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "./src/serve.js" ]