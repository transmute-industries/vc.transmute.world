const { getFastify } = require('./factory');

const config = require('./config');

const opts = {
  logger: config.fastify_logger,
  config,
};

const { fastify } = getFastify(opts);

console.log(`serving: ${config.fastify_base_url}\n`);

fastify.listen(
  config.fastify_base_url.split(':').pop(),
  '0.0.0.0',
  (err, address) => {
    if (err) {
      console.error(err);
    }
    fastify.log.info(`server listening on ${address}`);
  }
);

module.exports = fastify;
