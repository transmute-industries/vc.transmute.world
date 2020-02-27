const express = require('express');

const router = express.Router();

router.use('/issuer', require('./issuer'));
router.use('/verifier', require('./verifier'));
router.use('/', require('./swagger'));

module.exports = router;
