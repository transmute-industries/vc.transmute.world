const express = require('express');
const uuid = require('uuid/v4');
const vc = require('vc-js');
const {
  Ed25519KeyPair,
  suites: { Ed25519Signature2018 },
} = require('jsonld-signatures');
const { issuer, keyPairInfo } = require('../config');

const router = express.Router();

/**
 * @swagger
 *
 * definitions:
 *   IssueRequest:
 *     type: object
 *     properties:
 *       subject:
 *         type: string
 *         description: Optional identifier for the subject of the credential.
 *         example: did:example:subject
 *       types:
 *         type: array
 *         items:
 *           type: string
 *         description: Optional value for the type(s) of a credential.
 *         example: ["UniversityDegreeCredential"]
 *       claims:
 *         type: object
 *         additionalProperties: true
 *         description: Optional object containing claims and their values.
 *         example: { "alumniOf": { "id": "did:example:university", "name": "Example University" } }
 */

/**
 * @swagger
 *
 * paths:
 *   "/issuer/credential":
 *     post:
 *       tags: [Issuer]
 *       produces:
 *       - application/json
 *       parameters:
 *       - in: body
 *         name: body
 *         description: Parameters for issuing the credential
 *         schema:
 *           $ref: '#/definitions/IssueRequest'
 *       responses:
 *         '200':
 *           description: Success
 */
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
