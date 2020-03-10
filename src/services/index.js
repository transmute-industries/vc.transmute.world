const fastifyPlugin = require('fastify-plugin');

const didDocument = require('./did.json');

const issuer = require('./issuer');
const verifier = require('./verifier');

async function servicesConnector(fastify, options) {
  fastify.decorate('svcs', {
    config: options.config,
    issuer: issuer(),
    verifier: verifier(),
    didDocument,
  });
}

module.exports = fastifyPlugin(servicesConnector);
