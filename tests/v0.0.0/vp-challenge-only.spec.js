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

let vc;
let vp;
describe('v0.0.0 vp-challenge-only', () => {
  Object.keys(fixtures).forEach(useCase => {
    if (
      fixtures[useCase].vcBindingModel.type[1] !== 'UniversityDegreeCredential'
    ) {
      return;
    }
    describe(useCase, () => {
      describe('POST /v0.0.0/credentials/issueCredential', () => {
        it('should issue a VC and return it in the response body', async () => {
          const res = await tester
            .post('/v0.0.0/credentials/issueCredential')
            .set('Accept', 'application/json')
            .send({
              // eslint-disable-next-line
                            credential: {
                ...fixtures[useCase].vcBindingModel,
                issuer:
                  'did:v1:test:nym:z6MkhdmzFu659ZJ4XKj31vtEDmjvsi5yDZG5L7Caz63oP39k',
                credentialSubject: {
                  ...fixtures[useCase].vcBindingModel.credentialSubject,
                  id:
                    'did:elem:ropsten:EiBJJPdo-ONF0jxqt8mZYEj9Z7FbdC87m2xvN0_HAbcoEg',
                },
              },
              options: {
                proofPurpose: 'assertionMethod',
                assertionMethod:
                  'did:v1:test:nym:z6MkhdmzFu659ZJ4XKj31vtEDmjvsi5yDZG5L7Caz63oP39k#z6MkiukuAuQAE8ozxvmahnQGzApvtW7KT5XXKfojjwbdEomY',
              },
            });
          expect(res.status).toBe(201);
          // console.log(JSON.stringify(res.body, null, 2))
          expect(res.body.proof).toBeDefined();
          vc = res.body;
        });
      });
      describe('POST /v0.1.0/prove/presentations', () => {
        it('should issue a VC and return it in the response body', async () => {
          const res = await tester
            .post('/v0.1.0/prove/presentations')
            .set('Accept', 'application/json')
            .send({
              presentation: {
                '@context': ['https://www.w3.org/2018/credentials/v1'],
                type: ['VerifiablePresentation'],
                holder:
                  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
                verifiableCredential: [vc],
              },
              options: {
                proofPurpose: 'authentication',
                challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
                verificationMethod:
                  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
              },
            });
          expect(res.status).toBe(201);
          // console.log(JSON.stringify(res.body, null, 2))
          expect(res.body.proof).toBeDefined();
          vp = res.body;
        });
      });

      describe('POST /v0.0.0/verifier/presentations', () => {
        it('should return a vp verification result in the response body', async () => {
          const res = await tester
            .post('/v0.0.0/verifier/presentations')
            .set('Accept', 'application/json')
            .send({
              verifiablePresentation: vp,
              options: {
                challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
                checks: ['proof'],
              },
            });
          // console.log(JSON.stringify(res.body, null, 2))
          expect(res.status).toBe(200);
          expect(res.body.checks).toEqual(['proof']);
        });
      });
    });
  });
});
