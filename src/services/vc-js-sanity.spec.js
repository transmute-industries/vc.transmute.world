const jsigs = require('jsonld-signatures');
const { Ed25519KeyPair } = require('crypto-ld');
const vc = require('vc-js');

const documentLoader = require('./documentLoader');

const unlockedDIDs = require('./unlockedDIDs');

const { Ed25519Signature2018 } = jsigs.suites;

const firstKey =
  unlockedDIDs['did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd']
    .publicKey[0];

const key = new Ed25519KeyPair(firstKey);

const suite = new Ed25519Signature2018({
  key,
  date: '2019-12-11T03:50:55Z',
});

let verifiableCredential;
let verifiablePresentation;

const credential = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://www.w3.org/2018/credentials/examples/v1',
  ],
  id: 'http://example.gov/credentials/3732',
  type: ['VerifiableCredential', 'UniversityDegreeCredential'],
  issuer: {
    id: 'did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd',
  },
  issuanceDate: '2020-03-10T04:24:12.164Z',
  credentialSubject: {
    id: 'did:example:123',
    degree: {
      type: 'BachelorDegree',
      name: 'Bachelor of Science and Arts',
    },
  },
};

jest.setTimeout(10 * 1000);

describe('vc-js-sanity', () => {
  it('issue verifiableCredential', async () => {
    verifiableCredential = await vc.issue({
      credential: { ...credential },
      suite,
      documentLoader,
    });
    expect(verifiableCredential.proof).toBeDefined();
  });

  it('verify verifiableCredential', async () => {
    const result = await vc.verifyCredential({
      credential: verifiableCredential,
      suite,
      documentLoader,
    });
    expect(result.verified).toBe(true);
  });

  it('createPresentation & signPresentation', async () => {
    const id = 'ebc6f1c2';
    const holder = 'did:ex:12345';
    const presentation = vc.createPresentation({
      verifiableCredential,
      id,
      holder,
    });
    expect(presentation.type).toEqual(['VerifiablePresentation']);
    verifiablePresentation = await vc.signPresentation({
      presentation,
      suite,
      challenge: '123',
      documentLoader,
    });
    expect(verifiablePresentation.proof).toBeDefined();
  });

  it('verify verifiablePresentation', async () => {
    const result = await vc.verify({
      presentation: verifiablePresentation,
      challenge: '123',
      suite,
      documentLoader,
    });
    expect(result.verified).toBe(true);
  });
});
