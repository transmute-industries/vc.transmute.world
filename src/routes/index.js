/* eslint-disable global-require */
module.exports = (fastify, opts, done) => {
  fastify.register(require('./v0'), { prefix: '/api/v0' });
  fastify.register(require('./well-known'), { prefix: '/.well-known' });
  done();
};
