const request = require('supertest');

const { getFastify } = require('../../factory');
const config = require('../../config');

const fixtures = require('../../__fixtures__');

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

describe('interop', () => {
  Object.keys(fixtures).forEach(useCase => {
    describe(useCase, () => {
      describe('POST /credentials/issueCredential', () => {
        it('should issue a VC and return it in the response body', async () => {
          const res = await tester
            .post('/credentials/issueCredential')
            .set('Accept', 'application/json')
            .send({
              // eslint-disable-next-line
              credential: fixtures[useCase].vcBindingModel,
              options: {
                proofPurpose: 'assertionMethod',
                issuer:
                  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                assertionMethod:
                  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
              },
            });
          expect(res.status).toBe(200);
          expect(res.body.proof).toBeDefined();
        });
      });

      describe('POST /vc-data-model/presentations', () => {
        it('should return a vp in response body', async () => {
          const res = await tester
            .post('/vc-data-model/presentations')
            .set('Accept', 'application/json')
            .send({
              presentation: fixtures[useCase].vpBindingModel,
              options: {
                proofPurpose: 'authentication',
                domain: 'issuer.example.com',
                challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
                verificationMethod:
                  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
              },
            });
          // console.log(JSON.stringify(res.body, null, 2))
          expect(res.body.proof).toBeDefined()
        });
      });

      describe('POST /verifications', () => {
        it('should return a vc verification result in the response body', async () => {
          const res = await tester
            .post('/verifier/credentials')
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

        it('should return a vp verification result in the response body', async () => {
          const res = await tester
            .post('/verifier/presentations')
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
