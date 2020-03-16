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
      try {
        const vc = await issuer.issue(request.body);
        return reply.code(200).send(vc);
      } catch (e) {
        console.log(e)
        return reply.code(500).send({ message: e.message });
      }

    }
  );

  done();
};
