/* eslint-disable global-require */
module.exports = (fastify, opts, done) => {
  fastify.register(require('./issuer'), { prefix: '/issuer' });
  fastify.register(require('./verifier'), { prefix: '/verifier' });
  done();
};
