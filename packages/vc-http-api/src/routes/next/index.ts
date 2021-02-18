// import credential from '../../data/c.json';
// import presentation from '../../data/p.json';
// import verifiableCredential from '../../data/vc.json';
import verifiablePresentation from '../../data/vp.json';

export default (server: any, _opts: any, done: any) => {
  server.post(
    '/credentials/issue',
    {
      schema: {
        description: '',
        tags: ['next'],
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
              example: {
                proofPurpose: 'assertionMethod',
                verificationMethod:
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
      try {
        const result = await server.vc.issueCredential(
          request.body.credential,
          request.body.options
        );
        return reply.status(201).send(result);
      } catch (e) {
        return reply.status(400).send({ error: true });
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
              // example: presentation,
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
          200: {
            description: 'Success',
            type: 'object',
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
      return reply.send(result);
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

      if (result.errors.length) {
        return reply.status(400).send(result);
      }
      return reply.send(result);
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
              // example: verifiablePresentation,
            },
            options: {
              type: 'object',
              example: {
                checks: ['proof'],
                domain: verifiablePresentation.proof.domain,
                challenge: verifiablePresentation.proof.challenge,
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
      try {
        const result = await server.vc.verifyPresentation(
          request.body.verifiablePresentation,
          request.body.options
        );
        return reply.send(result);
      } catch (e) {
        return reply.status(400).send({});
      }
    }
  );

  done();
};
