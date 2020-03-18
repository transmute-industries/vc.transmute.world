module.exports = (fastify, opts, done) => {
  const { agent } = fastify.svcs;

  fastify.post(
    '/credentials',
    {
      schema: {
        tags: ['VC Data Model'],
        summary: 'Verifiable Credential',
      },
    },
    async (request, reply) => {
      try {
        const vc = await agent.createVerifiableCredential(request.body);
        return reply.code(200).send(vc);
      } catch (e) {
        console.log(e)
        return reply.code(500).send({ message: e.message });
      }

    }
  );

  fastify.post(
    '/presentations',
    {
      schema: {
        tags: ['VC Data Model'],
        summary: 'Verifiable Presentation',
      },
    },
    async (request, reply) => {
      try {
        const vp = await agent.createVerifiablePresentation(request.body);
        return reply.code(200).send(vp);
      } catch (e) {
        console.log(e)
        return reply.code(500).send({ message: e.message });
      }

    }
  );

  fastify.post(
    '/verifications',
    {
      schema: {
        tags: ['VC Data Model'],
        summary: 'Verification Result',
      },
    },
    async (request, reply) => {
      try {
        const verification = await agent.createVerification(request.body);
        return reply.code(200).send(verification);
      } catch (e) {
        return reply.code(400).send({
          message: e.message
        })
      }
    }
  );

  done();
};
