FROM node:12

EXPOSE 8080

WORKDIR /usr/src/app

COPY ./packages/vc-http-api ./packages/vc-http-api
WORKDIR /usr/src/app/packages/vc-http-api

RUN [ "npm", "install"]
RUN [ "npm", "build" ]
CMD [ "npm", "run", "start" ]