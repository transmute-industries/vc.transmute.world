FROM node:12

EXPOSE 8080

# Install project
WORKDIR /usr/src/app
COPY package.json package.json
COPY lerna.json lerna.json

COPY ./packages/vc-http-api ./packages/vc-http-api

# Build the app
WORKDIR /usr/src/app/packages/vc-http-api

RUN [ "npm", "run", "build" ]

CMD [ "npm", "run", "start" ]