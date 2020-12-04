FROM node:12

EXPOSE 8080

# Install project
WORKDIR /usr/src/app
COPY package.json package.json
COPY lerna.json lerna.json

RUN [ "npm", "install" ]

COPY ./packages/vc-http-api ./packages/vc-http-api

WORKDIR /usr/src/app/packages/vc-http-api

CMD [ "npm", "run", "start" ]