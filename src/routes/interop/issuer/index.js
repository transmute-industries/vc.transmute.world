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
            credential: {
              type: 'object', example: {
                "@context": [
                  "https://www.w3.org/2018/credentials/v1",
                  "https://www.w3.org/2018/credentials/examples/v1"
                ],
                "id": "http://example.gov/credentials/3732",
                "type": [
                  "VerifiableCredential",
                  "UniversityDegreeCredential"
                ],
                "issuer": "did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd",
                "issuanceDate": "2020-03-10T04:24:12.164Z",
                "credentialSubject": {
                  "id": "did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd",
                  "degree": {
                    "type": "BachelorDegree",
                    "name": "Bachelor of Science and Arts"
                  }
                }
              }
            },
            options: {
              type: 'object',
              properties: {
                issuer: { oneOf: [{ type: 'string' }, { type: 'object' }] },
                issuanceDate: { type: 'string' },
                assertionMethod: { type: 'string' }
              },
              example: {
                issuer: 'did:web:vc.transmute.world',
                issuanceDate: '2019-12-11T03:50:55Z',
                assertionMethod: 'did:web:vc.transmute.world#z6MksHh7qHWvybLg5QTPPdG2DgEjjduBDArV9EF9mRiRzMBN',
              }
            },
          },
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
