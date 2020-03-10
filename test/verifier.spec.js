const request = require('supertest');

const { getFastify } = require('../src/factory');
const config = require('../src/config');

const opts = {
  logger: false,
  config,
};

const { fastify } = getFastify(opts);

const vc = require('./vc.json');

let tester;

describe('verifier', () => {
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

  describe('verify', () => {
    it('should return a verification result', async () => {
      const res = await tester
        .post('/api/v1/verifier/verify')
        .set('Accept', 'application/json')
        .send(vc);
      expect(res.status).toBe(200);
      expect(res.body.verified).toBe(true);

      expect(res.body.results).toBeDefined();
    });
  });
});
