const { Ed25519KeyPair } = require('crypto-ld');
const vcjs = require('vc-js');
const jsigs = require('jsonld-signatures');

const documentLoader = require('./documentLoader');

const { Ed25519Signature2018 } = jsigs.suites;
const { AssertionProofPurpose, AuthenticationProofPurpose } = jsigs.purposes;

const purposeMap = {
  assertionMethod: AssertionProofPurpose,
  authentication: AuthenticationProofPurpose,
};

const privateKey = require('./privateKey.json');

let key;

// eslint-disable-next-line
module.exports = opts => {
  return {
    createVerifiableCredential: async ({
      credential,
      options = {
        issuer: 'did:web:vc.transmute.world',
        issuanceDate: '2019-12-11T03:50:55Z',
        proofPurpose: 'assertionMethod',
        verificationMethod:
          'did:web:vc.transmute.world#z6MksHh7qHWvybLg5QTPPdG2DgEjjduBDArV9EF9mRiRzMBN',
      },
    }) => {
      key = new Ed25519KeyPair({
        ...privateKey,
        id: options.verificationMethod,
        controller: options.verificationMethod.split('#')[0],
      });
      return vcjs.issue({
        credential: {
          ...credential,
          issuer: options.issuer,
        },
        suite: new Ed25519Signature2018({
          key,
          date: options.issuanceDate,
        }),
        documentLoader,
      });
    },
    createVerifiablePresentation: async ({
      presentation,
      options = {
        proofPurpose: 'assertionMethod',
        verificationMethod:
          'did:web:vc.transmute.world#z6MksHh7qHWvybLg5QTPPdG2DgEjjduBDArV9EF9mRiRzMBN',
      },
    }) => {
      key = new Ed25519KeyPair({
        ...privateKey,
        id: options.verificationMethod,
        controller: options.verificationMethod.split('#')[0],
      });
      const purpose = new purposeMap[options.proofPurpose](options);
      return jsigs.sign(
        { ...presentation },
        {
          documentLoader,
          suite: new Ed25519Signature2018({
            key,
            date: options.issuanceDate,
          }),
          purpose,
          compactProof: false,
        }
      );
    },
    createVerification: async vcOrVp => {
      let flag = false;

      if (vcOrVp.type === 'VerifiablePresentation') {
        if (vcOrVp.verifiableCredential) {

          if (Array.isArray(vcOrVp.verifiableCredential)) {
            await Promise.all(
              vcOrVp.verifiableCredential.map(async vc => {
                const result = await vcjs.verify({
                  credential: vc,
                  documentLoader,
                  suite: new Ed25519Signature2018({}),
                });
                if (!result.verified) {
                  flag = true;
                }
              })
            );
          } else {
            const result = await vcjs.verify({
              credential: vcOrVp.verifiableCredential,
              documentLoader,
              suite: new Ed25519Signature2018({}),
            });
            if (!result.verified) {
              flag = true;
            }
          }
        }
        if (vcOrVp.proof) {
          const purpose = new purposeMap[vcOrVp.proof.proofPurpose](
            vcOrVp.proof
          );
          const result = await jsigs.verify(vcOrVp, {
            documentLoader,
            suite: new Ed25519Signature2018({}),
            purpose,
          });
          if (!result.verified) {
            flag = true;
          }
        }
        if (flag) {
          throw new Error(
            JSON.stringify(result)
          );
        }
        return {
          checks: ['proof'],
        };
      }
      const result = await vcjs.verify({
        credential: vcOrVp,
        documentLoader,
        suite: new Ed25519Signature2018({}),
      });
      if (result.verified) {
        return {
          checks: ['proof'],
        };
      }

      console.log(result.error)
      throw new Error(
        JSON.stringify(result)
      );
    },
  };
};
