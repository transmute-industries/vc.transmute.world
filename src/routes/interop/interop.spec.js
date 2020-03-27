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

let vc;

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
                  'did:elem:EiBJJPdo-ONF0jxqt8mZYEj9Z7FbdC87m2xvN0_HAbcoEg',
                assertionMethod:
                  'did:elem:EiBJJPdo-ONF0jxqt8mZYEj9Z7FbdC87m2xvN0_HAbcoEg#xqc3gS1gz1vch7R3RvNebWMjLvBOY-n_14feCYRPsUo',
              },
            });
          expect(res.status).toBe(200);
          expect(res.body.proof).toBeDefined();
          vc = res.body;
        });
      });
      describe('POST /verifications', () => {
        it('should return a verification result in the response body', async () => {
          const res = await tester
            .post('/verifications')
            .set('Accept', 'application/json')
            .send(vc);
          expect(res.status).toBe(200);
          expect(res.body.checks).toEqual(['proof']);
        });

        it('should return a vc verification result in the response body', async () => {
          const res = await tester
            .post('/verifier/credentials')
            .set('Accept', 'application/json')
            .send({
              verifiableCredential: vc,
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
              verifiablePresentation: vc,
              options: {
                checks: ['proof'],
              },
            });
          expect(res.status).toBe(200);
          expect(res.body.checks).toEqual(['proof']);
        });
      });
    });
  });
});
