module.exports = (fastify, opts, done) => {
  const { agent } = fastify.svcs;

  fastify.post(
    '/credentials',
    {
      schema: {
        tags: ['VC Data Model'],
        summary: 'Verifiable Credential',
        body: {
          type: 'object',
          properties: {
            credential: {
              type: 'object',
              example: {
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
                },
              }
            },
            options: {
              type: 'object',
              properties: {
                issuer: { oneOf: [{ type: 'string' }, { type: 'object' }] },
                issuanceDate: { type: 'string' },
                proofPurpose: { type: 'string' },
                verificationMethod: { type: 'string' }
              },
              example: {
                issuer: 'did:web:vc.transmute.world',
                issuanceDate: '2019-12-11T03:50:55Z',
                proofPurpose: 'assertionMethod',
                verificationMethod:
                  'did:web:vc.transmute.world#z6MksHh7qHWvybLg5QTPPdG2DgEjjduBDArV9EF9mRiRzMBN',
              }
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const vc = await agent.createVerifiableCredential(request.body);
        return reply.code(200).send(vc);
      } catch (e) {
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
        body: {
          type: 'object',
          properties: {
            presentation: {
              type: 'object', example: {
                "@context": [
                  "https://www.w3.org/2018/credentials/v1"
                ],
                "type": [
                  "VerifiablePresentation"
                ],
                "holder": "did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd",
                "verifiableCredential": [
                  {
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
                    },
                    "proof": {
                      "type": "Ed25519Signature2018",
                      "created": "2020-04-10T21:35:35Z",
                      "verificationMethod": "did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd",
                      "proofPurpose": "assertionMethod",
                      "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..l9d0YHjcFAH2H4dB9xlWFZQLUpixVCWJk0eOt4CXQe1NXKWZwmhmn9OQp6YxX0a2LffegtYESTCJEoGVXLqWAA"
                    }
                  }
                ],
              }
            },
            options: {
              type: 'object',
              properties: {
                domain: { type: 'string' },
                challenge: { type: 'string' },
                proofPurpose: { type: 'string' },
                verificationMethod: { type: 'string' },
              },
              example: {
                "domain": "issuer.example.com",
                "challenge": "99612b24-63d9-11ea-b99f-4f66f3e4f81a",
                "proofPurpose": "authentication",
                verificationMethod:
                  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
              }
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const vp = await agent.createVerifiablePresentation(request.body);
        return reply.code(200).send(vp);
      } catch (e) {
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
        body: {
          type: 'object',
          properties: {
            verifiablePresentation: {
              type: 'object', example: {
                "@context": [
                  "https://www.w3.org/2018/credentials/v1"
                ],
                "type": [
                  "VerifiablePresentation"
                ],
                "holder": "did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd",
                "verifiableCredential": [
                  {
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
                    },
                    "proof": {
                      "type": "Ed25519Signature2018",
                      "created": "2020-04-10T21:35:35Z",
                      "verificationMethod": "did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd",
                      "proofPurpose": "assertionMethod",
                      "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..l9d0YHjcFAH2H4dB9xlWFZQLUpixVCWJk0eOt4CXQe1NXKWZwmhmn9OQp6YxX0a2LffegtYESTCJEoGVXLqWAA"
                    }
                  }
                ],
                "proof": {
                  "type": "Ed25519Signature2018",
                  "created": "2020-04-14T17:06:27Z",
                  "verificationMethod": "did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd",
                  "proofPurpose": "authentication",
                  "challenge": "99612b24-63d9-11ea-b99f-4f66f3e4f81a",
                  "domain": "issuer.example.com",
                  "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..vLU6wVOdzpvLd0ljOukhKXPLCsChEO6icNs67qTNuUZzDjqGwESBFn5AQXRr-8LWdkODWUxVZ39bdx9EQhxPCw"
                }
              }
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
                "domain": "issuer.example.com",
                "challenge": "99612b24-63d9-11ea-b99f-4f66f3e4f81a",
                "proofPurpose": "authentication",
                verificationMethod:
                  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
              }
            },
          }
        },
      },
    },
    async (request, reply) => {
      try {
        const verification = await agent.createVerification(request.body);
        return reply.code(200).send(verification);
      } catch (e) {
        // console.log(e.message)
        return reply.code(400).send({
          message: JSON.parse(e.message),
        });
      }
    }
  );

  done();
};
