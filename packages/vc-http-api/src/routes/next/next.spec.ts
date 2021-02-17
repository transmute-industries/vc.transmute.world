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

const credentialTemplate = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://w3id.org/vaccination/v1',
  ],
  type: ['VerifiableCredential', 'VaccinationCertificate'],
  id: 'urn:uvci:af5vshde843jf831j128fj',
  name: 'COVID-19 Vaccination Certificate',
  description: 'COVID-19 Vaccination Certificate',
  issuanceDate: '2019-12-03T12:19:52Z',
  expirationDate: '2029-12-03T12:19:52Z',
  issuer: 'did:key:z6MkiY62766b1LJkExWMsM3QG4WtX7QpY823dxoYzr9qZvJ3',
  credentialSubject: {
    type: 'VaccineRecipient',
    givenName: 'JOHN',
    familyName: 'SMITH',
    gender: 'Male',
    birthDate: '1958-07-17',
    vaccine: {
      type: 'Vaccine',
      disease: 'COVID-19',
      atcCode: 'J07BX03',
      medicinalProductName: 'COVID-19 Vaccine Moderna',
      marketingAuthorizationHolder: 'Moderna Biotech',
      event: {
        type: 'VaccinationEvent',
        batchNumber: '1183738569',
        administeringCentre: 'MoH',
        healthProfessional: 'MoH',
        countryOfVaccination: 'NZ',
      },
    },
  },
};

let verifiableCredential: any;
let verifiablePresentation: any;

const domain = 'vc.transmute.world';
const challenge = '99612b24-63d9-11ea-b99f-4f66f3e4f81a';
const verificationMethod =
  'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd#z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd';

describe('POST /next/issue/credentials', () => {
  it('should issue a verifiable credential', async () => {
    const response = await api.post('/next/issue/credentials').send({
      credential: {
        ...credentialTemplate,
        issuer: 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
      },
    });
    verifiableCredential = response.body;
    expect(response.body.proof).toBeDefined();
  });
});

describe('POST /next/prove/presentations', () => {
  it('should prove a verifiable credential', async () => {
    const response = await api.post('/next/prove/presentations').send({
      presentation: {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiablePresentation'],
        holder: 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
        verifiableCredential: [{ ...verifiableCredential }],
      },
      options: {
        domain,
        challenge,
        proofPurpose: 'authentication',
        verificationMethod,
      },
    });
    verifiablePresentation = response.body;
    expect(response.body.proof).toBeDefined();
  });
});

describe('POST /next/verify/credentials', () => {
  it('should verify a verifiable credential', async () => {
    const response = await api.post('/next/verify/credentials').send({
      verifiableCredential,
      options: {
        checks: ['proof'],
      },
    });
    expect(response.body).toEqual({
      checks: ['proof'],
      warnings: [],
      errors: [],
    });
  });
});

describe('POST /next/verify/presentations', () => {
  it('should verify a verifiable presentation', async () => {
    const response = await api.post('/next/verify/presentations').send({
      verifiablePresentation,
      options: {
        domain,
        challenge,
      },
    });
    expect(response.body).toEqual({
      checks: ['proof'],
      warnings: [],
      errors: [],
    });
  });
});
