const express = require('express');
const verifiableCredential = require('./verifiable-credential.json');

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
    res.status(200).json(verifiableCredential);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
