FROM node:12

WORKDIR /usr/api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8085

CMD [ "node", "./src/serve.js" ]