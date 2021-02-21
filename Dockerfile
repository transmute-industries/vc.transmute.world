FROM node:12

EXPOSE 8080

WORKDIR /usr/src/app

COPY package.json package.json
COPY lerna.json lerna.json
COPY ./packages/vc-http-api ./packages/vc-http-api

RUN [ "npm", "install" ]
RUN [ "npm", "run", "postinstall" ]

WORKDIR /usr/src/app/packages/vc-http-api

CMD [ "npm", "run", "start" ]