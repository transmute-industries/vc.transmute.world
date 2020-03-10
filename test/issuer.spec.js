

const request = require('supertest');

const { getFastify } = require('../src/factory');
const config = require('../src/config');

const opts = {
    logger: false,
    config,
};

const { fastify } = getFastify(opts);

const bindingModel = require('./vc.bindingModel.json');

let tester;

describe('issuer', () => {

    beforeAll(async () => {
        await fastify.ready();
        port = fastify.svcs.config.fastify_base_url.split(':').pop();
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

    describe('issue', () => {
        it('should return a vc with proof', async () => {
            const res = await tester
                .post('/api/v1/issuer/issue')
                .set('Accept', 'application/json')
                .send(bindingModel);
            expect(res.status).toBe(200)
            expect(res.body.proof).toBeDefined()
        })
    })
})

