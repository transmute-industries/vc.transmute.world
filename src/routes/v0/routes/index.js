module.exports = (fastify, opts, done) => {
  const { issuer, verifier } = fastify.svcs;

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
        const vc = await issuer.issue(request.body);
        return reply.code(200).send(vc);
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
        await verifier.verify(request.body);
        return reply.code(200).send({
          "checks": [
            "proof"
          ]
        });
      } catch (e) {
        return reply.code(400).send({
          "checks": [
            {
              "check": "proof",
              "error": "The verificationMethod (public key) associated with the digital signature could not be retrieved due to a network error.",
              "verificationMethod": "did:example:c6f1c276e12ec21ebfeb1f712eb#jf893k"
            }
          ]
        })
      }
    }
  );

  done();
};
