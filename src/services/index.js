const fastifyPlugin = require('fastify-plugin');

const didDocument = require('./did.json');
const didConfiguraton = require('./did-configuration.json');
const agent = require('./agent');

async function servicesConnector(fastify, options) {
  fastify.decorate('svcs', {
    config: options.config,
    agent: agent(),
    didDocument,
    didConfiguraton,
  });
}

module.exports = fastifyPlugin(servicesConnector);
