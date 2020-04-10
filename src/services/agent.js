const vcjs = require('vc-js');
const jsigs = require('jsonld-signatures');

const documentLoader = require('./documentLoader');
const { getSuite } = require('./suiteManager');

const { AssertionProofPurpose, AuthenticationProofPurpose } = jsigs.purposes;

const purposeMap = {
  assertionMethod: AssertionProofPurpose,
  authentication: AuthenticationProofPurpose,
};

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
      // hack around static interp api
      if (options.assertionMethod) {
        // eslint-disable-next-line
        options.verificationMethod = options.assertionMethod;
      }
      const suite = getSuite(options);
      return vcjs.issue({
        credential: {
          ...credential,
          issuer: options.issuer,
        },
        suite,
        compactProof: false,
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
      const suite = getSuite(options);
      const purpose = new purposeMap[options.proofPurpose](options);
      return jsigs.sign(
        { ...presentation },
        {
          documentLoader,
          suite,
          purpose,
          compactProof: false,
        }
      );
    },
    createVerification: async vcOrVp => {
      let flag = false;
      const results = [];
      const { verifiableCredential, verifiablePresentation, options } = vcOrVp;
      try {
        if (verifiableCredential) {
          const suite = getSuite(verifiableCredential.proof);
          const result = await vcjs.verifyCredential({
            credential: verifiableCredential,
            suite,
            documentLoader,
          });
          if (!result.verified) {
            flag = true;
          }
        }
        if (verifiablePresentation) {
          if (!verifiablePresentation.proof) {
            const vcs = Array.isArray(verifiablePresentation.verifiableCredential) ? verifiablePresentation.verifiableCredential : [verifiablePresentation.verifiableCredential]
            vcs.forEach(async (vc) => {
              const suite = getSuite(vc.proof);
              const result = await vcjs.verifyCredential({
                credential: vc,
                suite,
                documentLoader,
              });
              if (!result.verified) {
                flag = true;
              }
            })

          } else {
            const suite = getSuite(verifiablePresentation.proof);
            const result = await vcjs.verify({
              presentation: verifiablePresentation,
              suite,
              ...options,
              documentLoader,
            });
            if (!result.verified) {
              flag = true;
            }
          }
        }
      } catch (e) {
        throw new Error(JSON.stringify(e));
      }
      if (flag) {
        throw new Error(JSON.stringify(results));
      }
      return {
        checks: ['proof'],
      };
    },
  };
};
