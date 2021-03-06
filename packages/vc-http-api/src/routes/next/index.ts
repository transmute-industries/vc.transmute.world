export default (server: any, _opts: any, done: any) => {
  server.post(
    '/credentials/issue',
    {
      // if you wish to explicity attach authentication
      // to a route, and authentication is enabled
      // the following will force authentication
      // preValidation: server.authenticate,
      schema: {
        description: '',
        tags: ['next'],
        summary: 'Issue credential',
        body: {
          type: 'object',
          properties: {
            credential: {
              type: 'object',
              example: {
                '@context': ['https://www.w3.org/2018/credentials/v1'],
                id: 'urn:uuid:07aa969e-b40d-4c1b-ab46-ded252003ded',
                type: ['VerifiableCredential'],
                issuer: {
                  id:
                    'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                },
                issuanceDate: '2020-03-10T04:24:12.164Z',
                credentialSubject: {
                  id:
                    'did:key:z6Mkg9AkjefxdJFSphkStzXwHQnbweN43mCqA37aANGRxF1o',
                },
              },
            },
            options: {
              type: 'object',
              example: {
                proofPurpose: 'assertionMethod',
                verificationMethod:
                  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
              },
            },
          },
          additionalProperties: true,
        },
        response: {
          200: {
            description: 'Success',
            type: 'object',
            example: {
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              id: 'urn:uuid:07aa969e-b40d-4c1b-ab46-ded252003ded',
              type: ['VerifiableCredential'],
              issuer: {
                id: 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
              },
              issuanceDate: '2020-03-10T04:24:12.164Z',
              credentialSubject: {
                id: 'did:key:z6Mkg9AkjefxdJFSphkStzXwHQnbweN43mCqA37aANGRxF1o',
              },
              proof: {
                type: 'Ed25519Signature2018',
                created: '2021-03-03T20:25:54.400Z',
                jws:
                  'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..NjvhvcNQ5oFb-oqeFxevKRdc_rrae1nzQWQRZbgJa9YyAGf-uWl7ASfQ1iPNJW39Mc9udn7hhs3XlsV9Mpq0Bw',
                proofPurpose: 'assertionMethod',
                verificationMethod:
                  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
              },
            },
            additionalProperties: true,
          },
        },
      },
    },
    async (request: any, reply: any) => {
      try {
        const result = await server.vc.issueCredential(
          request.body.credential,
          request.body.options
        );
        return reply.status(201).send(result);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return reply.status(400).send({ error: true });
      }
    }
  );

  server.post(
    '/credentials/derive',
    {
      schema: {
        description: '',
        tags: ['next'],
        summary: 'Derive credential',
        body: {
          type: 'object',
          properties: {
            verifiableCredential: {
              type: 'object',
              additionalProperties: true,
            },
            frame: {
              type: 'object',
              additionalProperties: true,
            },
          },
        },
        response: {
          201: {
            description: 'Derived credential succcessfully',
            type: 'object',
            additionalProperties: true,
          },
        },
      },
    },
    async (request: any, reply: any) => {
      return reply
        .status(201)
        .send(
          await server.vc.deriveCredential(
            request.body.verifiableCredential,
            request.body.frame
          )
        );
    }
  );

  server.post(
    '/credentials/verify',
    {
      schema: {
        description: '',
        tags: ['next'],
        summary: 'Verify credential',
        body: {
          type: 'object',
          properties: {
            verifiableCredential: {
              type: 'object',
              example: {
                '@context': ['https://www.w3.org/2018/credentials/v1'],
                id: 'urn:uuid:07aa969e-b40d-4c1b-ab46-ded252003ded',
                type: ['VerifiableCredential'],
                issuer: {
                  id:
                    'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                },
                issuanceDate: '2020-03-10T04:24:12.164Z',
                credentialSubject: {
                  id:
                    'did:key:z6Mkg9AkjefxdJFSphkStzXwHQnbweN43mCqA37aANGRxF1o',
                },
                proof: {
                  type: 'Ed25519Signature2018',
                  created: '2021-03-03T20:25:54.400Z',
                  jws:
                    'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..NjvhvcNQ5oFb-oqeFxevKRdc_rrae1nzQWQRZbgJa9YyAGf-uWl7ASfQ1iPNJW39Mc9udn7hhs3XlsV9Mpq0Bw',
                  proofPurpose: 'assertionMethod',
                  verificationMethod:
                    'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                },
              },
            },
            options: {
              type: 'object',
              example: {
                verificationMethod:
                  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                proofPurpose: 'assertionMethod',
              },
            },
          },
          additionalProperties: true,
        },
        response: {
          200: {
            description: 'Success',
            type: 'object',
            example: {
              checks: ['proof'],
              warnings: [],
              errors: [],
            },
            additionalProperties: true,
          },
          400: {
            description: 'Invalid client request',
            type: 'object',
            example: {
              checks: [],
              warnings: [],
              errors: [],
            },
            additionalProperties: true,
          },
          500: {
            description: 'Internal server error',
            type: 'object',
            example: {
              checks: [],
              warnings: [],
              errors: [],
            },
            additionalProperties: true,
          },
        },
      },
    },
    async (request: any, reply: any) => {
      try {
        const result = await server.vc.verifyCredential(
          request.body.verifiableCredential,
          request.body.options
        );
        return reply.send(result);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return reply.status(400).send({});
      }
    }
  );

  server.post(
    '/presentations/prove',
    {
      schema: {
        description: '',
        tags: ['next'],
        summary: 'Prove presentation',
        body: {
          type: 'object',
          properties: {
            presentation: {
              type: 'object',
              example: {
                '@context': ['https://www.w3.org/2018/credentials/v1'],
                type: ['VerifiablePresentation'],
                holder:
                  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                verifiableCredential: [
                  {
                    '@context': ['https://www.w3.org/2018/credentials/v1'],
                    id: 'urn:uuid:07aa969e-b40d-4c1b-ab46-ded252003ded',
                    type: ['VerifiableCredential'],
                    issuer: {
                      id:
                        'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                    },
                    issuanceDate: '2020-03-10T04:24:12.164Z',
                    credentialSubject: {
                      id:
                        'did:key:z6Mkg9AkjefxdJFSphkStzXwHQnbweN43mCqA37aANGRxF1o',
                    },
                    proof: {
                      type: 'Ed25519Signature2018',
                      created: '2021-03-03T20:25:54.400Z',
                      jws:
                        'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..NjvhvcNQ5oFb-oqeFxevKRdc_rrae1nzQWQRZbgJa9YyAGf-uWl7ASfQ1iPNJW39Mc9udn7hhs3XlsV9Mpq0Bw',
                      proofPurpose: 'assertionMethod',
                      verificationMethod:
                        'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                    },
                  },
                ],
              },
            },
            options: {
              type: 'object',
              example: {
                domain: 'issuer.example.com',
                challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
                proofPurpose: 'authentication',
                verificationMethod:
                  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
              },
            },
          },
        },
        response: {
          201: {
            description: 'Created presentation successsfully',
            type: 'object',
            example: {
              '@context': ['https://www.w3.org/2018/credentials/v1'],
              type: ['VerifiablePresentation'],
              holder:
                'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
              verifiableCredential: [
                {
                  '@context': ['https://www.w3.org/2018/credentials/v1'],
                  id: 'urn:uuid:07aa969e-b40d-4c1b-ab46-ded252003ded',
                  type: ['VerifiableCredential'],
                  issuer: {
                    id:
                      'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                  },
                  issuanceDate: '2020-03-10T04:24:12.164Z',
                  credentialSubject: {
                    id:
                      'did:key:z6Mkg9AkjefxdJFSphkStzXwHQnbweN43mCqA37aANGRxF1o',
                  },
                  proof: {
                    type: 'Ed25519Signature2018',
                    created: '2021-03-03T20:25:54.400Z',
                    jws:
                      'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..NjvhvcNQ5oFb-oqeFxevKRdc_rrae1nzQWQRZbgJa9YyAGf-uWl7ASfQ1iPNJW39Mc9udn7hhs3XlsV9Mpq0Bw',
                    proofPurpose: 'assertionMethod',
                    verificationMethod:
                      'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                  },
                },
              ],
              proof: {
                type: 'Ed25519Signature2018',
                created: '2021-03-03T20:54:48.081Z',
                challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
                domain: 'issuer.example.com',
                jws:
                  'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..BT_2sALmkupJTT1h9K-F748MC39qZS6HVplXYogYHDfc7veTZiTGyuNt4RNGNjx5V5rpxDRMqqTtXCqBe3IABg',
                proofPurpose: 'authentication',
                verificationMethod:
                  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
              },
            },
            additionalProperties: true,
          },
        },
      },
    },
    async (request: any, reply: any) => {
      const result = await server.vc.signPresentation(
        request.body.presentation,
        request.body.options
      );
      return reply.status(201).send(result);
    }
  );

  server.post(
    '/presentations/verify',
    {
      schema: {
        description: '',
        tags: ['next'],
        summary: 'Verify presentation',
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
                    '@context': ['https://www.w3.org/2018/credentials/v1'],
                    id: 'urn:uuid:07aa969e-b40d-4c1b-ab46-ded252003ded',
                    type: ['VerifiableCredential'],
                    issuer: {
                      id:
                        'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                    },
                    issuanceDate: '2020-03-10T04:24:12.164Z',
                    credentialSubject: {
                      id:
                        'did:key:z6Mkg9AkjefxdJFSphkStzXwHQnbweN43mCqA37aANGRxF1o',
                    },
                    proof: {
                      type: 'Ed25519Signature2018',
                      created: '2021-03-03T20:25:54.400Z',
                      jws:
                        'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..NjvhvcNQ5oFb-oqeFxevKRdc_rrae1nzQWQRZbgJa9YyAGf-uWl7ASfQ1iPNJW39Mc9udn7hhs3XlsV9Mpq0Bw',
                      proofPurpose: 'assertionMethod',
                      verificationMethod:
                        'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                    },
                  },
                ],
                proof: {
                  type: 'Ed25519Signature2018',
                  created: '2021-03-03T20:54:48.081Z',
                  challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
                  domain: 'issuer.example.com',
                  jws:
                    'eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..BT_2sALmkupJTT1h9K-F748MC39qZS6HVplXYogYHDfc7veTZiTGyuNt4RNGNjx5V5rpxDRMqqTtXCqBe3IABg',
                  proofPurpose: 'authentication',
                  verificationMethod:
                    'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                },
              },
            },
            options: {
              type: 'object',
              example: {
                checks: ['proof'],
                domain: 'issuer.example.com',
                challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
              },
            },
          },
        },
        response: {
          200: {
            description: 'Success',
            type: 'object',
            example: {
              checks: ['proof'],
              warnings: [],
              errors: [],
            },
            additionalProperties: true,
          },
        },
      },
    },
    async (request: any, reply: any) => {
      try {
        const result = await server.vc.verifyPresentation(
          request.body.verifiablePresentation,
          request.body.options
        );
        return reply.send(result);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return reply.status(400).send({});
      }
    }
  );

  done();
};
