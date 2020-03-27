module.exports = (fastify, opts, done) => {
  const { agent } = fastify.svcs;

  fastify.post(
    '/credentials/issueCredential',
    {
      schema: {
        tags: ['CCG Issuer'],
        summary: 'Verifiable Credential',
        body: {
          type: 'object',
          properties: {
            credential: { type: 'object' },
            options: {
              type: 'object'
            },
          }

        },
      },
    },
    async (request, reply) => {
      try {
        const { credential, options } = request.body;
        const vc = await agent.createVerifiableCredential({
          credential,
          options,
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
