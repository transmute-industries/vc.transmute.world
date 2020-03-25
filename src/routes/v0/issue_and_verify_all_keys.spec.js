const fs = require('fs');
const path = require('path');

const request = require('supertest');

const { getFastify } = require('../../factory');
const config = require('../../config');

const fixtures = require('../../__fixtures__/edu');

const unlockedDIDs = require('../../services/unlockedDIDs');

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

describe("Issue and Verify All DIDs", () => {
  Object.values(unlockedDIDs).forEach((didDocument) => {
    describe(didDocument.id, () => {
      didDocument.publicKey.forEach(publicKey => {
        if (['Ed25519VerificationKey2018', 'JwsVerificationKey2020'].indexOf(publicKey.type) === -1) {
          return;
        }
        describe(publicKey.id, () => {
          it('should create and verify vc', async () => {
            let res = await tester
              .post('/vc-data-model/credentials')
              .set('Accept', 'application/json')
              .send({
                credential: { ...fixtures.vcBindingModel },
                options: {
                  proofPurpose: 'assertionMethod',
                  issuer: fixtures.vcBindingModel.issuer,
                  verificationMethod: publicKey.id,
                },
              });
            fs.writeFileSync(path.resolve(__dirname, `../../__fixtures__/edu/examples/vc.${publicKey.id}.json`), JSON.stringify(res.body, null, 2))
            expect(res.status).toBe(200);
            expect(res.body.proof).toBeDefined();
            res = await tester
              .post('/vc-data-model/verifications')
              .set('Accept', 'application/json')
              .send(res.body);
            expect(res.status).toBe(200);
            expect(res.body.checks).toEqual(['proof']);
          });
        });
      });
    });
  })
})
