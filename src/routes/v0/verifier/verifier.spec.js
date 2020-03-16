const request = require('supertest');

const { getFastify } = require('../../../factory');
const config = require('../../../config');

const opts = {
  logger: false,
  config,
};

const { fastify } = getFastify(opts);

const vc = require('../../../__fixtures__/edu/vc.json');

let tester;

jest.setTimeout(10 * 1000);

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
        .post('/api/v0/verifier/verify')
        .set('Accept', 'application/json')
        .send(vc);
      expect(res.status).toBe(200);
      expect(res.body.verified).toBe(true);
      expect(res.body.results).toBeDefined();
    });
  });
});
