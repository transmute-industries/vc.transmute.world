const fs = require('fs');
const path = require('path');
const request = require('supertest');

const { getFastify } = require('../../factory');
const config = require('../../config');

const fixtures = require('../../__fixtures__/edu');

const didDoc = require('../../services/did.json')

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
describe('issuer and verify all keys', () => {
    didDoc.publicKey.forEach((publicKey) => {

        describe(publicKey.type, () => {
            it('should create and verify vc', async () => {
                let res = await tester
                    .post('/vc-data-model/credentials')
                    .set('Accept', 'application/json')
                    .send({
                        credential: { ...fixtures.vcBindingModel },
                        options: {
                            proofPurpose: 'assertionMethod',
                            issuer: fixtures.vcBindingModel.issuer,
                            verificationMethod:
                                publicKey.id,
                        },
                    });

                expect(res.status).toBe(200);
                expect(res.body.proof).toBeDefined();
                res = await tester
                    .post('/vc-data-model/verifications')
                    .set('Accept', 'application/json')
                    .send(res.body);

                // console.log(res.body)
                expect(res.status).toBe(200);
                expect(res.body.checks).toEqual(['proof']);
            });
        });

    })



});
