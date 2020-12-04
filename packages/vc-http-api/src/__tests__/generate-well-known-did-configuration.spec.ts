import supertest, { SuperTest } from 'supertest';

import { getTestServer } from '../server';
import { keys } from '../keys';
import moment from 'moment';
import fs from 'fs';
import path from 'path';

let api: SuperTest<any>;
let server: any;

beforeAll(async () => {
  server = await getTestServer();
  api = supertest(server.server);
});

afterAll(async () => {
  await server.close();
});

let origin = 'https://vc.transmute.world';

const config: any = {
  '@context':
    'https://identity.foundation/.well-known/contexts/did-configuration-v0.0.jsonld',
  linked_dids: [],
};
describe('can generate did config', () => {
  keys.forEach(k => {
    it(k.controller, async () => {
      const response: any = await api.post('/v0.1.0/issue/credentials').send({
        credential: {
          '@context': [
            'https://www.w3.org/2018/credentials/v1',
            'https://identity.foundation/.well-known/contexts/did-configuration-v0.0.jsonld',
          ],
          issuer: k.controller,
          issuanceDate: moment().format(),
          expirationDate: moment()
            .add(5, 'years')
            .format(),
          type: ['VerifiableCredential', 'DomainLinkageCredential'],
          credentialSubject: {
            id: k.controller,
            origin,
          },
        },
        options: {
          proofPurpose: 'assertionMethod',
          assertionMethod: k.id,
        },
      });
      config.linked_dids.push(response.body);
    });
  });
  it('write config', () => {
    fs.writeFileSync(
      path.resolve(__dirname, `../__fixtures__/did-configuration.json`),
      JSON.stringify(config, null, 2)
    );
  });
});
