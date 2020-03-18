/* eslint-disable global-require */
module.exports = (fastify, opts, done) => {
  fastify.register(require('./issuer'), { prefix: '/' });
  fastify.register(require('./verifier'), { prefix: '/' });
  done();
};
