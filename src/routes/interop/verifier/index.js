module.exports = (fastify, opts, done) => {
  const { agent } = fastify.svcs;

  fastify.post(
    '/verifications',
    {
      schema: {
        tags: ['CCG Verifier'],
        summary: 'Verification Result',
        body: {
          type: 'object',
        },
      },
    },
    async (request, reply) => {
      try {
        const verification = await agent.createVerification(request.body);
        return reply.code(200).send(verification);
      } catch (e) {
        return reply.code(400).send({
          errors: JSON.parse(e.message),
        });
      }
    }
  );

  fastify.post(
    '/verifier/credentials',
    {
      schema: {
        tags: ['CCG Verifier'],
        summary: 'Verification Result',
        body: {
          type: 'object',
          properties: {
            verifiableCredential: { type: 'object' },
            options: {
              type: 'object',
              example: { checks: ['proof'] },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const verification = await agent.createVerification(
          request.body
        );
        return reply.code(200).send(verification);
      } catch (e) {
        return reply.code(400).send({
          errors: JSON.parse(e.message)
        });
      }
    }
  );

  fastify.post(
    '/verifier/presentations',
    {
      schema: {
        tags: ['CCG Verifier'],
        summary: 'Verification Result',
        body: {
          type: 'object',
          properties: {
            verifiablePresentation: { type: 'object' },
            options: {
              type: 'object',
              example: { checks: ['proof'] },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const verification = await agent.createVerification(
          request.body
        );
        return reply.code(200).send(verification);
      } catch (e) {
        return reply.code(400).send({
          errors: JSON.parse(e.message),
        });
      }
    }
  );

  done();
};
