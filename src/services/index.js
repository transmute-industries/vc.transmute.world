const fastifyPlugin = require('fastify-plugin');

const did_document = require('./did.json')

const issuer = require('./issuer')
const verifier = require('./verifier')


async function servicesConnector(fastify, options) {
  fastify.decorate('svcs', {
    config: options.config,
    issuer: issuer(),
    verifier: verifier(),
    did_document,
  });
}

module.exports = fastifyPlugin(servicesConnector);
