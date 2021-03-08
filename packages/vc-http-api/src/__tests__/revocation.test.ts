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

it('case 14', async () => {
  // eslint-disable-next-line global-require
  const vc = require('../__interop__/verifiableCredentials/case-14.json');
  const response = await api.post('/next/credentials/verify').send({
    verifiableCredential: vc,
    options: {
      checks: ['proof', 'credentialStatus'],
    },
  });
  expect(response.body).toEqual({
    checks: ['proof'],
    warnings: [],
    errors: [],
  });
});

it('case 15', async () => {
  // eslint-disable-next-line global-require
  const vc = require('../__interop__/verifiableCredentials/case-15.json');
  const response = await api.post('/next/credentials/verify').send({
    verifiableCredential: vc,
    options: {
      checks: ['proof', 'credentialStatus'],
    },
  });
  expect(response.status).toBe(400);
});
