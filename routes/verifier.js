const express = require('express');
const vcjs = require('vc-js');
const jsonld = require('jsonld');
const {
  Ed25519KeyPair,
  suites: { Ed25519Signature2018 },
} = require('jsonld-signatures');
const config = require('../config');

const router = express.Router();

router.post('/verifications', async (req, res, next) => {
  try {
    const keyPair = await Ed25519KeyPair.from(config.keyPairInfo);
    const suite = new Ed25519Signature2018({
      verificationMethod: keyPair.id,
      key: keyPair,
    });
    const documentLoader = async url => {
      if (url === config.keyPairInfo.controller) {
        return {
          contextUrl: null,
          documentUrl: url,
          document: {
            [keyPair.controller]: {
              '@context': 'https://w3id.org/security/v2',
              id: keyPair.controller,
              assertionMethod: [keyPair.id],
            },
          },
        };
      }
      return jsonld.documentLoaders.node()(url);
    };

    const result = await vcjs.verify({
      credential: req.body,
      suite,
      documentLoader,
    });
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
