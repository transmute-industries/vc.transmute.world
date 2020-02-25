const express = require('express');
const uuid = require('uuid/v4');
const config = require('../config');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.status(200).json({
      issuer: true,
    });
  } catch (e) {
    next(e);
  }
});

router.post('/credential', async (req, res, next) => {
  try {
    const id = uuid();
    const now = new Date().toISOString();
    const types = req.body.types || [];
    const vc = {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://www.w3.org/2018/credentials/examples/v1',
      ],
      id: `http://example.com/credentials/${id}`,
      type: ['VerifiableCredential', ...types],
      issuer: config.issuer,
      issuanceDate: now,
      // credentialSubject: {
      //   id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
      //   alumniOf: {
      //     id: 'did:example:c276e12ec21ebfeb1f712ebc6f1',
      //     name: [
      //       {
      //         value: 'Example University',
      //         lang: 'en',
      //       },
      //       {
      //         value: "Exemple d'Université",
      //         lang: 'fr',
      //       },
      //     ],
      //   },
      // },
      // proof: {
      //   type: 'RsaSignature2018',
      //   created: '2017-06-18T21:19:10Z',
      //   proofPurpose: 'assertionMethod',
      //   verificationMethod: 'https://example.edu/issuers/keys/1',
      //   jws:
      //     'eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..TCYt5XsITJX1CxPCT8yAV-TVkIEq_PbChOMqsLfRoPsnsgw5WEuts01mq-pQy7UJiN5mgRxD-WUcX16dUEMGlv50aqzpqh4Qktb3rk-BuQy72IFLOqV0G_zS245-kronKb78cPN25DGlcTwLtjPAYuNzVBAh4vGHSrQyHUdBBPM',
      // },
    };
    res.status(200).json(vc);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
