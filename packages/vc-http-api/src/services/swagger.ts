import fastifySwagger from 'fastify-swagger';

export const registerSwagger = (server: any, config: any) => {
  server.register(fastifySwagger, {
    routePrefix: 'api/docs',
    exposeRoute: true,
    openapi: {
      info: {
        title: 'Verifiable Credentials',
        description: 'Reference implementation of the vc-http-api spec',
        version: config.version,
      },
      components: {
        // securitySchemes: {
        //   apiKey: {
        //     type: 'apiKey',
        //     name: 'apiKey',
        //     in: 'header'
        //   }
        // }
      },
    },
    swagger: {
      info: {
        title: `Verifiable Credentials`,
        version: config.version,
        license: {
          name: 'Specification',
          url: 'https://w3c-ccg.github.io/vc-http-api/',
        },
        contact: {
          name: 'Source Code',
          url: 'https://github.com/transmute-industries/vc.transmute.world',
        },
      },
      basePath: '',
      definitions: {
        // securityDefinitions: {
        //   apiKey: {
        //     type: 'apiKey',
        //     name: 'apiKey',
        //     in: 'header'
        //   }
        // }
      },
    },
  });
};
