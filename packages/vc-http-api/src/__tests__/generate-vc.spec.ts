import supertest, { SuperTest } from 'supertest';

import fs from 'fs';
import path from 'path';
import { getTestServer } from '../server';
import { keys } from '../keys';
import credential from '../data/c.json';

let api: SuperTest<any>;
let server: any;

beforeAll(async () => {
  server = await getTestServer();
  api = supertest(server.server);
});

afterAll(async () => {
  await server.close();
});

describe('can issue from', () => {
  keys.forEach((k, i) => {
    it(k.controller, async () => {
      const response = await api.post('/v0.1.0/issue/credentials').send({
        credential: {
          ...credential,
          issuer: k.controller,
        },
        options: {
          proofPurpose: 'assertionMethod',
          assertionMethod: k.id,
        },
      });
      fs.writeFileSync(
        path.resolve(__dirname, `../__fixtures__/vc${i}.json`),
        JSON.stringify(response.body, null, 2)
      );
    });
  });
});
