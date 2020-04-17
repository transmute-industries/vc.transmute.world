const fs = require('fs');
const path = require('path');
const vc = require('vc-js');
const jsigs = require('jsonld-signatures');
const { Ed25519KeyPair } = require('crypto-ld');

const {
  JsonWebKeyLinkedDataKeyClass2020,
  JsonWebSignature2020,
} = require('lds-jws2020');

const { Ed25519Signature2018 } = jsigs.suites;

const documentLoader = require('../../services/documentLoader');
const unlockedDIDs = require('../../services/unlockedDIDs');
const useCase = require('../../__fixtures__/did-configuration');

const credential = useCase.vcBindingModel;
let verifiableCredential;
describe.skip('generate did configuration', () => {
  const entries = [];
  Object.keys(unlockedDIDs).forEach(did => {
    describe(`should link ${did} to ${credential.credentialSubject.domain}`, () => {
      const didDocument = unlockedDIDs[did];
      it('using Ed25519VerificationKey2018', async () => {
        let doneEd25519VerificationKey2018 = false;
        const bucket = didDocument.publicKey || didDocument.assertionMethod;
        return Promise.all(
          bucket.map(async key => {
            if (
              !doneEd25519VerificationKey2018 &&
              key.type === 'Ed25519VerificationKey2018'
            ) {
              doneEd25519VerificationKey2018 = true;
              const suite = new Ed25519Signature2018({
                key: new Ed25519KeyPair(key),
              });
              verifiableCredential = await vc.issue({
                credential: {
                  ...credential,
                  issuer: key.controller,
                  credentialSubject: {
                    ...credential.credentialSubject,
                    id: key.controller,
                  },
                },
                compactProof: false,
                documentLoader,
                suite,
              });
              return entries.push(verifiableCredential);
            }
            return null;
          })
        );
      });
      it('using JwsVerificationKey2020', async () => {
        let doneJwsVerificationKey2020 = false;
        const bucket = didDocument.publicKey || didDocument.assertionMethod;
        return Promise.all(
          bucket.map(async key => {
            if (
              !doneJwsVerificationKey2020 &&
              key.type === 'JwsVerificationKey2020'
            ) {
              doneJwsVerificationKey2020 = true;
              const suite = new JsonWebSignature2020({
                LDKeyClass: JsonWebKeyLinkedDataKeyClass2020,
                linkedDataSigantureType: 'JsonWebSignature2020',
                linkedDataSignatureVerificationKeyType:
                  'JwsVerificationKey2020',
                key: new JsonWebKeyLinkedDataKeyClass2020(key),
              });
              verifiableCredential = await vc.issue({
                credential: {
                  ...credential,
                  issuer: key.controller,
                  credentialSubject: {
                    ...credential.credentialSubject,
                    id: key.controller,
                  },
                },
                compactProof: false,
                documentLoader,
                suite,
              });
              return entries.push(verifiableCredential);
            }
            return null;
          })
        );
      });
    });
    it('write configuration', async () => {
      fs.writeFileSync(
        path.resolve(__dirname, '../../services/did-configuration.json'),
        JSON.stringify(
          {
            '@context':
              'https://identity.foundation/.well-known/contexts/did-configuration-v0.0.jsonld',
            entries,
          },
          null,
          2
        )
      );
    });
  });
});
