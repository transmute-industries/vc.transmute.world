const request = require('supertest');
const app = require('../app');

describe('Swagger', () => {
  describe('GET /', () => {
    it('should the swagger UI page', async () => {
      const res = await request(app)
        .get('/')
        .send();
      expect(res).toBeDefined();
      expect(res.text).toBeDefined();
      expect(res.text).toContain('Swagger UI');
    });
  });
});
