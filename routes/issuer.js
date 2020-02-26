const express = require('express');
const uuid = require('uuid/v4');
const vc = require('vc-js');
const {
  Ed25519KeyPair,
  suites: { Ed25519Signature2018 },
} = require('jsonld-signatures');
const { issuer, keyPairInfo } = require('../config');

const router = express.Router();

router.post('/credential', async (req, res, next) => {
  try {
    const id = uuid();
    const types = req.body.types || [];
    const now = new Date().toISOString();
    const { subject } = req.body;
    const claims = req.body.claims || {};
    const unsignedCredential = {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://www.w3.org/2018/credentials/examples/v1',
      ],
      id: `http://example.com/credentials/${id}`,
      type: ['VerifiableCredential', ...types],
      issuer,
      issuanceDate: now,
      credentialSubject: {
        id: subject || 'did:example:subject',
        ...claims,
      },
    };

    const keyPair = await Ed25519KeyPair.from(keyPairInfo);
    const suite = new Ed25519Signature2018({
      verificationMethod: keyPair.id,
      key: keyPair,
    });
    const signedVC = await vc.issue({
      credential: unsignedCredential,
      suite,
    });
    res.status(200).json(signedVC);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
