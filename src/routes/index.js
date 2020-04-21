/* eslint-disable global-require */
module.exports = (fastify, opts, done) => {
  fastify.register(require('./well-known'), { prefix: '/.well-known' });
  fastify.register(require('./v0.1.0'), { prefix: '/v0.1.0' });
  fastify.register(require('./v0.0.0'), { prefix: '/v0.0.0' });
  fastify.register(require('./vc-data-model'), { prefix: '/vc-data-model' });
  done();
};
