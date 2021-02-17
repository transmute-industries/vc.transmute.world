// import credential from '../../data/c.json';
// import verifiableCredential from '../../data/vc.json';
// import verifiablePresentation from '../../data/vp.json';

export default (server: any, _opts: any, done: any) => {
  server.post(
    '/credentials/issueCredential',
    {
      schema: {
        description: '',
        tags: ['v0.0.0'],
        summary: 'Issue credential',
        body: {
          type: 'object',
          properties: {
            credential: {
              type: 'object',
              // example: credential,
            },
            options: {
              type: 'object',
              properties: {
                issuer: { oneOf: [{ type: 'string' }, { type: 'object' }] },
                issuanceDate: { type: 'string' },
                assertionMethod: { type: 'string' },
              },
              example: {
                issuanceDate: '2019-12-11T03:50:55Z',
                assertionMethod:
                  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
              },
            },
          },
        },
        response: {
          200: {
            description: 'Success',
            type: 'object',
            additionalProperties: true,
          },
        },
      },
    },
    async (request: any, reply: any) => {
      const result = await server.vc.issueCredential(request.body.credential, {
        ...request.body.options,
      });
      return reply.send(result);
    }
  );

  server.post(
    '/verifier/credentials',
    {
      schema: {
        description: '',
        tags: ['v0.0.0'],
        summary: 'Verify credential',
        body: {
          type: 'object',
          properties: {
            verifiableCredential: {
              type: 'object',
              // example: verifiableCredential,
            },
            options: {
              type: 'object',
              example: {
                checks: ['proof'],
              },
            },
          },
        },
        response: {
          200: {
            description: 'Success',
            type: 'object',
            additionalProperties: true,
          },
        },
      },
    },
    async (request: any, reply: any) => {
      const result = await server.vc.verifyCredential(
        request.body.verifiableCredential,
        request.body.options
      );
      return reply.send(result);
    }
  );

  server.post(
    '/verifier/presentations',
    {
      schema: {
        description: '',
        tags: ['v0.0.0'],
        summary: 'Verify presentation',
        body: {
          type: 'object',
          properties: {
            verifiablePresentation: {
              type: 'object',
              // example: verifiablePresentation,
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
            additionalProperties: true,
          },
        },
      },
    },
    async (request: any, reply: any) => {
      const result = await server.vc.verifyPresentation(
        request.body.verifiablePresentation,
        request.body.options
      );
      return reply.send(result);
    }
  );

  done();
};
