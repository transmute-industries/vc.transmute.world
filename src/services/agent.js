const { Ed25519KeyPair } = require('crypto-ld');
const vcjs = require('vc-js');
const jsigs = require('jsonld-signatures');

const documentLoader = require('./documentLoader')

const { Ed25519Signature2018 } = jsigs.suites;
const { AssertionProofPurpose } = jsigs.purposes;

const privateKey = require('./privateKey.json');

const key = new Ed25519KeyPair({
    ...privateKey,
    id: 'did:web:vc.transmute.world#z6MksHh7qHWvybLg5QTPPdG2DgEjjduBDArV9EF9mRiRzMBN',
    controller: 'did:web:vc.transmute.world',
});

// eslint-disable-next-line
module.exports = options => {
    return {
        createVerifiableCredential: async credentialBindingModel => {
            const vc = await vcjs.issue({
                credential: {
                    ...credentialBindingModel,
                    issuer: key.controller,
                },
                suite: new Ed25519Signature2018({
                    key,
                    date: "2019-12-11T03:50:55Z"
                }),
                documentLoader
            });
            return vc;
        },
        createVerifiablePresentation: async presentationBindingModel => {
            const vpWithProof = await jsigs.sign(
                { ...presentationBindingModel },
                {
                    documentLoader,
                    suite: new Ed25519Signature2018({
                        key,
                        date: "2019-12-11T03:50:55Z"
                    }),
                    purpose: new AssertionProofPurpose(),
                    compactProof: false
                }
            );
            return vpWithProof;
        },
        createVerification: async vcOrVp => {
            // console.log(vcOrVp)
            let flag = false;

            if (vcOrVp.type === 'VerifiablePresentation') {
                await Promise.all(vcOrVp.verifiableCredential.map(async (vc) => {
                    const result = await vcjs.verify({
                        credential: vc,
                        documentLoader,
                        suite: new Ed25519Signature2018({
                            key
                        }),
                    });
                    if (!result.verified) {
                        flag = true;
                    }
                }))

                if (vcOrVp.proof) {
                    const result = await jsigs.verify(vcOrVp, {
                        documentLoader,
                        suite: new Ed25519Signature2018({
                            key
                        }),
                        purpose: new AssertionProofPurpose()
                    });
                    if (!result.verified) {
                        flag = true;
                    }
                }
                if (flag) {
                    throw new Error('VerifiablePresentation contained one or more invalid proofs.')
                }
                return {
                    "checks": [
                        "proof"
                    ]
                }

            }
            const result = await vcjs.verify({
                credential: vcOrVp,
                documentLoader,
                suite: new Ed25519Signature2018({
                    key
                }),
            });
            if (result.verified) {
                return {
                    "checks": [
                        "proof"
                    ]
                }
            }
            throw new Error('VerifiableCredential contained one or more invalid proofs.')
        }
    };
};
