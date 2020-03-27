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
          checks: [
            {
              check: 'proof',
              error:
                'The verificationMethod (public key) associated with the digital signature could not be retrieved due to a network error.',
              verificationMethod:
                'did:example:c6f1c276e12ec21ebfeb1f712eb#jf893k',
            },
          ],
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
        },
      },
    },
    async (request, reply) => {
      try {
        const { verifiableCredential } = request.body;
        const verification = await agent.createVerification(
          verifiableCredential
        );
        return reply.code(200).send(verification);
      } catch (e) {
        return reply.code(400).send({
          errors: JSON.parse(e.message),
          checks: [
            {
              check: 'proof',
              error:
                'The verificationMethod (public key) associated with the digital signature could not be retrieved due to a network error.',
              verificationMethod:
                'did:example:c6f1c276e12ec21ebfeb1f712eb#jf893k',
            },
          ],
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
        },
      },
    },
    async (request, reply) => {
      try {
        const { verifiablePresentation } = request.body;
        const verification = await agent.createVerification(
          verifiablePresentation
        );
        return reply.code(200).send(verification);
      } catch (e) {
        return reply.code(400).send({
          errors: JSON.parse(e.message),
          checks: [
            {
              check: 'proof',
              error:
                'The verificationMethod (public key) associated with the digital signature could not be retrieved due to a network error.',
              verificationMethod:
                'did:example:c6f1c276e12ec21ebfeb1f712eb#jf893k',
            },
          ],
        });
      }
    }
  );

  done();
};
