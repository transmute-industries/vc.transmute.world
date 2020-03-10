/* eslint-disable global-require */
module.exports = (fastify, opts, done) => {
    fastify.register(require('./v1'), { prefix: '/api/v1' });
    fastify.register(require('./well-known'), { prefix: '/.well-known' });
    done();
  };
  