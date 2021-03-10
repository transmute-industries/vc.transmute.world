import supertest, { SuperTest } from 'supertest';

import { getTestServer } from '../server';

let api: SuperTest<any>;
let server: any;

beforeAll(async () => {
  server = await getTestServer();
  api = supertest(server.server);
});

afterAll(async () => {
  await server.close();
});

it('case', async () => {
  // eslint-disable-next-line global-require
  const vc = require('../__interop__/verifiableCredentials/case-16.json');
  const res = await api.post('/next/credentials/verify').send({
    verifiableCredential: vc,
    options: {
      checks: ['proof'],
    },
  });
  expect(res.status).toBe(200);
  expect(res.body.checks).toEqual(['proof']);
});
