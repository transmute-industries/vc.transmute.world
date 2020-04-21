const request = require('supertest');

const { getFastify } = require('../../src/factory');
const config = require('../../src/config');
const fixtures = require('../__fixtures__');

const opts = {
  logger: false,
  config,
};

const { fastify } = getFastify(opts);

let tester;

jest.setTimeout(10 * 1000);

beforeAll(async () => {
  await fastify.ready();
  const port = fastify.svcs.config.fastify_base_url.split(':').pop();
  try {
    await fastify.listen(port);
  } catch (e) {
    // ignore
  }
  tester = request(fastify.server);
});

afterAll(async () => {
  await fastify.close();
});

describe('v0.0.0', () => {
  Object.keys(fixtures).forEach(useCase => {
    describe(useCase, () => {
      describe('POST /v0.0.0/credentials/issueCredential', () => {
        it('should issue a VC and return it in the response body', async () => {
          const res = await tester
            .post('/v0.0.0/credentials/issueCredential')
            .set('Accept', 'application/json')
            .send({
              // eslint-disable-next-line
              credential: fixtures[useCase].vcBindingModel,
              options: {
                proofPurpose: 'assertionMethod',
                assertionMethod:
                  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
              },
            });
          expect(res.status).toBe(201);
          expect(res.body.proof).toBeDefined();
        });
      });
      describe('POST /v0.0.0/verifier/credentials', () => {
        it('should return a vc verification result in the response body', async () => {
          const res = await tester
            .post('/v0.0.0/verifier/credentials')
            .set('Accept', 'application/json')
            .send({
              verifiableCredential: fixtures[useCase].vc,
              options: {
                checks: ['proof'],
              },
            });
          expect(res.status).toBe(200);
          expect(res.body.checks).toEqual(['proof']);
        });
      });

      describe('POST /v0.0.0/verifier/presentations', () => {
        it('should return a vp verification result in the response body', async () => {
          const res = await tester
            .post('/v0.0.0/verifier/presentations')
            .set('Accept', 'application/json')
            .send({
              verifiablePresentation: fixtures[useCase].vp,
              options: {
                domain: 'issuer.example.com',
                challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
                checks: ['proof'],
              },
            });
          // console.log(res.body)
          expect(res.status).toBe(200);
          expect(res.body.checks).toEqual(['proof']);
        });
      });
    });
  });
});
