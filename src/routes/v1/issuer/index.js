module.exports = (fastify, opts, done) => {
  const { issuer } = fastify.svcs;

  fastify.post(
    '/issue',
    {
      schema: {
        tags: ['Issuer'],
        summary: 'Verifiable Credential',
      },
    },
    async (request, reply) => {
      const vc = await issuer.issue(request.body);
      return reply.code(200).send(vc);
    }
  );

  done();
};
