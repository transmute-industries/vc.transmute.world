const fs = require('fs');
const path = require('path');
const request = require('supertest');

const { getFastify } = require('../../factory');
const config = require('../../config');

const fixtures = require('../../__fixtures__/didAuth');

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

let vp;
describe('DIDAuth', () => {
  describe('POST /presentations', () => {
    it('should create a VP (with proof) and return it in the response body', async () => {
      const res = await tester
        .post('/vc-data-model/presentations')
        .set('Accept', 'application/json')
        .send({
          presentation: fixtures.vpBindingModel,
          options: {
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
        path.resolve(__dirname, '../../__fixtures__/didAuth/vp.json'),
        JSON.stringify(vp, null, 2)
      );
    });
  });

  describe('POST /verifications', () => {
    it('should return a verification result in the response body for a VP (with proof)', async () => {
      const res = await tester
        .post('/vc-data-model/verifications')
        .set('Accept', 'application/json')
        .send({
          verifiablePresentation: vp,
          options: {
            "challenge": "99612b24-63d9-11ea-b99f-4f66f3e4f81a",
            "domain": "issuer.example.com",
          }
        });
      expect(res.status).toBe(200);
      expect(res.body.checks).toEqual(['proof']);
    });
  });
});
