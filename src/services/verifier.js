const vcjs = require('vc-js');
const jsigs = require('jsonld-signatures');

const documentLoader = require('./documentLoader');

const { Ed25519Signature2018 } = jsigs.suites;

const suite = new Ed25519Signature2018({});

// eslint-disable-next-line
module.exports = options => {
  return {
    verify: async vc => {
      const result = await vcjs.verify({
        credential: vc,
        documentLoader,
        suite,
      });
      return result;
    },
  };
};
