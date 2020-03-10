const { Ed25519KeyPair } = require('crypto-ld');
const vcjs = require('vc-js');
const jsigs = require('jsonld-signatures');

const { Ed25519Signature2018 } = jsigs.suites;
// const { keyToDidDoc } = didMethodKey.driver();

const privateKey = require('./privateKey.json');

const key = new Ed25519KeyPair({
  ...privateKey,
  id: 'did:web:chapi.did.ai#z6MksHh7qHWvybLg5QTPPdG2DgEjjduBDArV9EF9mRiRzMBN',
  controller: 'did:web:chapi.did.ai',
});

const suite = new Ed25519Signature2018({
  key,
});

// eslint-disable-next-line
module.exports = options => {
  return {
    issue: async credentialBindingModel => {
      const vc = await vcjs.issue({
        credential: {
          ...credentialBindingModel,
          issuer: key.controller,
        },
        suite,
        // documentLoader
      });
      return vc;
    },
  };
};
