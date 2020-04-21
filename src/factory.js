/* eslint-disable global-require */
const fastify = require('fastify');
const fastifySwagger = require('fastify-swagger');

const getFastify = opts => {
  const app = fastify({
    ...opts,
    ignoreTrailingSlash: true,
  });

  app.register(require('fastify-cors'));
  app.register(require('./services'), {
    config: {
      ...opts.config,
    },
  });

  // Swagger must be registered before the routes
  app.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Transmute VC HTTP API',
        description:
          "Transmute's implementation of the [PROPOSED VC HTTP API](https://transmute-industries.github.io/vc-http-api/), an HTTP API for the Verifiable Credentials Data Model. Additional non-standard endpoints provided for demonstration of interoperability and developer convenience.",
        version: '0.0.0',
        license: {
          name: 'PROPOSED VC HTTP API',
          url: 'https://transmute-industries.github.io/vc-http-api/',
        },
        contact: {
          name: 'GitHub Source Code',
          url: 'https://github.com/transmute-industries/vc.transmute.world',
        },
      },

      basePath: '',
    },
    routePrefix: 'api/docs',
    exposeRoute: true,
  });

  app.register(require('./routes'), { prefix: '/' });

  return { fastify: app };
};

module.exports = { getFastify };
