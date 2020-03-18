/* eslint-disable global-require */
module.exports = (fastify, opts, done) => {

  fastify.register(require('./well-known'), { prefix: '/.well-known' });
  fastify.register(require('./v0'), { prefix: '/vc-data-model' });
  fastify.register(require('./interop'), { prefix: '/' });
  done();
};
