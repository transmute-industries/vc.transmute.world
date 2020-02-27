const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const router = express.Router();

const swaggerDoc = swaggerJSDoc({
  definition: {
    info: {
      title: 'Issuer Verifier VC API',
      version: '0.0.1',
      description:
        "Transmute's implementation of the Issuer/Verfier Verifiable Credential API",
    },
  },
  apis: ['./routes/*'],
});

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

module.exports = router;
