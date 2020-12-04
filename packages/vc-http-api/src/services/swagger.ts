import fastifySwagger from 'fastify-swagger';

export const registerSwagger = (server: any, config: any) => {
  server.register(fastifySwagger, {
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
      definitions: [],
    },
    routePrefix: 'api/docs',
    exposeRoute: true,
  });
};
