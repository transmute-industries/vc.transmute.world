const fs = require('fs');
const path = require('path');
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
let vp;

describe('v0', () => {
  Object.keys(fixtures).forEach(useCase => {
    describe(useCase, () => {
      describe('POST /credentials', () => {
        it('should issue a VC and return it in the response body', async () => {
          const res = await tester
            .post('/vc-data-model/credentials')
            .set('Accept', 'application/json')
            // eslint-disable-next-line
            .send({ credential: fixtures[useCase].vcBindingModel });
          expect(res.status).toBe(200);
          expect(res.body.proof).toBeDefined();
          vc = res.body;
          // eslint-disable-next-line
          fs.writeFileSync(
            path.resolve(__dirname, '../../__fixtures__/cmtr/vc.json'),
            JSON.stringify(vc, null, 2)
          );
        });
      });

      describe('POST /presentations', () => {
        it('should create a VP (with proof) and return it in the response body', async () => {
          const res = await tester
            .post('/vc-data-model/presentations')
            .set('Accept', 'application/json')
            // eslint-disable-next-line
            .send({
              presentation: fixtures[useCase].vpBindingModel, options: {
                proofPurpose: 'authentication',
                domain: 'issuer.example.com',
                challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
                verificationMethod:
                  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
              },
            });
          expect(res.status).toBe(200);
          expect(res.body.proof).toBeDefined();
          vp = res.body;
          // eslint-disable-next-line
          fs.writeFileSync(
            path.resolve(__dirname, '../../__fixtures__/cmtr/vp.json'),
            JSON.stringify(vp, null, 2)
          );
        });
      });

      describe('POST /verifications', () => {
        it('should return a verification result in the response body for a VC', async () => {
          const res = await tester
            .post('/vc-data-model/verifications')
            .set('Accept', 'application/json')
            .send({ verifiableCredential: vc });

          expect(res.status).toBe(200);
          expect(res.body.checks).toEqual(['proof']);
        });

        it('should return a verification result in the response body for a VP (with proof)', async () => {
          const body = {
            verifiablePresentation: vp, options: {
              domain: 'issuer.example.com',
              challenge: '99612b24-63d9-11ea-b99f-4f66f3e4f81a',
            }
          }
          // console.log(JSON.stringify(body, null, 2))
          const res = await tester
            .post('/vc-data-model/verifications')
            .set('Accept', 'application/json')
            .send(body);

          expect(res.status).toBe(200);
          expect(res.body.checks).toEqual(['proof']);
        });

        it('should return a verification result in the response body for a VP (without proof)', async () => {
          // why is this even called verifiable...
          const vpWithoutProof = { ...vp };
          delete vpWithoutProof.proof;
          const res = await tester
            .post('/vc-data-model/verifications')
            .set('Accept', 'application/json')
            .send({ verifiablePresentation: vpWithoutProof });
          // console.log(res.body)
          expect(res.status).toBe(200);
          expect(res.body.checks).toEqual(['proof']);
        });
      });
    });
  });
});
