const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.status(200).json({
      verifier: true,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
