import supertest, { SuperTest } from 'supertest';

import { getTestServer } from '../server';

import fs from 'fs';
import path from 'path';

import { verifiableCredentials } from '../__fixtures__';

let api: SuperTest<any>;
let server: any;

beforeAll(async () => {
  server = await getTestServer();
  api = supertest(server.server);
});

afterAll(async () => {
  await server.close();
});

describe('can verify vc from', () => {
  verifiableCredentials.forEach((vc, i) => {
    it(vc.issuer, async () => {
      const response = await api.post('/v0.1.0/verify/credentials').send({
        verifiableCredential: vc,
        options: {
          checks: ['proof'],
        },
      });
      fs.writeFileSync(
        path.resolve(__dirname, `../__fixtures__/vc${i}-verification.json`),
        JSON.stringify(response.body, null, 2)
      );
    });
  });
});
