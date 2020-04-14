module.exports = (fastify, opts, done) => {
  const { agent } = fastify.svcs;

  fastify.post(
    '/verifier/credentials',
    {
      schema: {
        tags: ['CCG Verifier'],
        summary: 'Verification Result',
        body: {
          type: 'object',
          properties: {
            verifiableCredential: {
              type: 'object',
              example: {
                '@context': [
                  'https://www.w3.org/2018/credentials/v1',
                  'https://www.w3.org/2018/credentials/examples/v1',
                ],
                id: 'http://example.gov/credentials/3732',
                type: ['VerifiableCredential', 'UniversityDegreeCredential'],
                issuer:
                  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                issuanceDate: '2020-03-10T04:24:12.164Z',
                credentialSubject: {
                  id:
                    'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                  degree: {
                    type: 'BachelorDegree',
                    name: 'Bachelor of Science and Arts',
                  },
                },
                proof: {
                  type: 'Ed25519Signature2018',
                  created: '2020-04-10T21:35:35Z',
                  verificationMethod:
                    'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                  proofPurpose: 'assertionMethod',
                  jws:
                    'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..l9d0YHjcFAH2H4dB9xlWFZQLUpixVCWJk0eOt4CXQe1NXKWZwmhmn9OQp6YxX0a2LffegtYESTCJEoGVXLqWAA',
                },
              },
            },
            options: {
              type: 'object',
              properties: {
                checks: { type: 'array' },
                domain: { type: 'string' },
                challenge: { type: 'string' },
                proofPurpose: { type: 'string' },
                verificationMethod: { type: 'string' },
              },
              example: {
                checks: ['proof'],
                domain: 'issuer.example.com',
                challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
                proofPurpose: 'authentication',
                verificationMethod:
                  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
              },
            },
          },
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
    '/verifier/presentations',
    {
      schema: {
        tags: ['CCG Verifier'],
        summary: 'Verification Result',
        body: {
          type: 'object',
          properties: {
            verifiablePresentation: {
              type: 'object',
              example: {
                '@context': ['https://www.w3.org/2018/credentials/v1'],
                type: ['VerifiablePresentation'],
                holder:
                  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                verifiableCredential: [
                  {
                    '@context': [
                      'https://www.w3.org/2018/credentials/v1',
                      'https://www.w3.org/2018/credentials/examples/v1',
                    ],
                    id: 'http://example.gov/credentials/3732',
                    type: [
                      'VerifiableCredential',
                      'UniversityDegreeCredential',
                    ],
                    issuer:
                      'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                    issuanceDate: '2020-03-10T04:24:12.164Z',
                    credentialSubject: {
                      id:
                        'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                      degree: {
                        type: 'BachelorDegree',
                        name: 'Bachelor of Science and Arts',
                      },
                    },
                    proof: {
                      type: 'Ed25519Signature2018',
                      created: '2020-04-10T21:35:35Z',
                      verificationMethod:
                        'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                      proofPurpose: 'assertionMethod',
                      jws:
                        'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..l9d0YHjcFAH2H4dB9xlWFZQLUpixVCWJk0eOt4CXQe1NXKWZwmhmn9OQp6YxX0a2LffegtYESTCJEoGVXLqWAA',
                    },
                  },
                ],
                proof: {
                  type: 'Ed25519Signature2018',
                  created: '2020-04-14T17:06:27Z',
                  verificationMethod:
                    'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                  proofPurpose: 'authentication',
                  challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
                  domain: 'issuer.example.com',
                  jws:
                    'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..vLU6wVOdzpvLd0ljOukhKXPLCsChEO6icNs67qTNuUZzDjqGwESBFn5AQXRr-8LWdkODWUxVZ39bdx9EQhxPCw',
                },
              },
            },
            options: {
              type: 'object',
              properties: {
                checks: { type: 'array' },
                domain: { type: 'string' },
                challenge: { type: 'string' },
                proofPurpose: { type: 'string' },
                verificationMethod: { type: 'string' },
              },
              example: {
                checks: ['proof'],
                domain: 'issuer.example.com',
                challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
                proofPurpose: 'authentication',
                verificationMethod:
                  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
              },
            },
          },
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

  done();
};
