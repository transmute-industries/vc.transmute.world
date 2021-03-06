/* eslint-disable global-require, func-names */
import fp from 'fastify-plugin';

// simple decorator plugin example if needed for auth on specific routes
export default fp(async function(fastify, opts: any) {
  fastify.register(require('fastify-auth0-verify'), opts);

  fastify.decorate('authenticate', async function(
    request: { jwtVerify: () => any },
    reply: { send: (arg0: any) => void }
  ) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});
