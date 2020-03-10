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
        title: 'VC HTTP',
        description: 'W3C CCG Issuer & Verifier API',
        version: '0.0.1',
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
