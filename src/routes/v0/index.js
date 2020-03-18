/* eslint-disable global-require */
module.exports = (fastify, opts, done) => {
  fastify.register(require('./routes'), { prefix: '/' });
  done();
};
