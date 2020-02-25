const express = require('express');

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

module.exports = router;
