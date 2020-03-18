module.exports = (fastify, opts, done) => {
  const { agent } = fastify.svcs;

  fastify.post(
    '/credentials/issueCredential',
    {
      schema: {
        tags: ['CCG Issuer'],
        summary: 'Verifiable Credential',
      },
    },
    async (request, reply) => {
      try {
        const vc = await agent.createVerifiableCredential({
          credential: request.body,
        });
        return reply.code(200).send(vc);
      } catch (e) {
        // console.log(e);
        return reply.code(500).send({ message: e.message });
      }
    }
  );

  done();
};
