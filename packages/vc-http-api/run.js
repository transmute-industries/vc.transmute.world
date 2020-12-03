const fastifyServer = require('./dist').default;
const port = 8080;

console.log(
  `serving server on port ${port}`
);

fastifyServer.listen(port, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
  }
  fastifyServer.log.info(`server listening on ${address}`);
});