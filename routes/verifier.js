const express = require('express');

const router = express.Router();

router.post('/verifications', async (req, res, next) => {
  try {
    res.status(200).json({
      verified: true,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
