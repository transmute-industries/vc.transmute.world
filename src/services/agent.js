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
      const suite = await getSuite(options);
      return vcjs.issue({
        credential: {
          ...credential,
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
      const suite = await getSuite(options);
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

      if (!verifiableCredential && !verifiablePresentation) {
        throw new Error(
          'verifiableCredential or verifiablePresentation required in post body'
        );
      }
      try {
        if (verifiableCredential) {
          const suite = await getSuite(verifiableCredential.proof);
          const result = await vcjs.verifyCredential({
            credential: verifiableCredential,
            suite,
            documentLoader,
          });
          results.push({ result, verifiableCredential });
          if (!result.verified) {
            flag = true;
          }
        }
        if (verifiablePresentation) {
          if (!verifiablePresentation.proof) {
            const vcs = Array.isArray(
              verifiablePresentation.verifiableCredential
            )
              ? verifiablePresentation.verifiableCredential
              : [verifiablePresentation.verifiableCredential];
            vcs.forEach(async vc => {
              const suite = await getSuite(vc.proof);
              const result = await vcjs.verifyCredential({
                credential: vc,
                suite,
                documentLoader,
              });
              results.push({ result, verifiableCredential: vc });
              if (!result.verified) {
                flag = true;
              }
            });
          } else {
            const suite = await getSuite(verifiablePresentation.proof);
            const params = {
              presentation: verifiablePresentation,
              suite,
              challenge: options.challenge,
              domain: options.domain,
              documentLoader,
            };
            const result = await vcjs.verify(params);
            // console.log(JSON.stringify(verifiablePresentation, null, 2))
            results.push({ result, verifiablePresentation });
            if (!result.verified) {
              flag = true;
            }
          }
        }
      } catch (e) {
        console.log(e);
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
