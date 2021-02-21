/* eslint-disable global-require */
import supertest, { SuperTest } from 'supertest';

import { getTestServer } from '../../server';

let api: SuperTest<any>;
let server: any;

beforeAll(async () => {
  server = await getTestServer();
  api = supertest(server.server);
});

afterAll(async () => {
  await server.close();
});

const verifiableCredential = [
  require('../../__interop__/verifiableCredentials/case-1.json'),
  require('../../__interop__/verifiableCredentials/case-2.json'),
  require('../../__interop__/verifiableCredentials/case-3.json'),
];

const domain = 'vc.transmute.world';
const challenge = '99612b24-63d9-11ea-b99f-4f66f3e4f81a';
const verificationMethod =
  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd';

describe('POST /next/credentials/derive', () => {
  it('should derive a verifiable credential', async () => {
    const response = await api.post('/next/credentials/derive').send({
      verifiableCredential: require('../../__interop__/verifiableCredentials/case-2.json'),
      frame: {
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          'https://w3id.org/citizenship/v1',
          'https://w3id.org/bbs/v1',
        ],
        type: ['VerifiableCredential', 'PermanentResidentCard'],
        credentialSubject: {
          '@explicit': true,
          type: ['PermanentResident', 'Person'],
          givenName: {},
          familyName: {},
        },
      },
    });
    expect(response.body.proof.type).toBe('BbsBlsSignatureProof2020');
    // console.log(JSON.stringify(response.body, null, 2));
  });
});

describe('POST /next/presentations/prove', () => {
  it('should prove a verifiable credential', async () => {
    const response = await api.post('/next/presentations/prove').send({
      presentation: {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiablePresentation'],
        holder: 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
        verifiableCredential,
      },
      options: {
        domain,
        challenge,
        proofPurpose: 'authentication',
        verificationMethod,
      },
    });
    expect(response.body.proof).toBeDefined();
    // console.log(JSON.stringify(response.body, null, 2));
  });
});
