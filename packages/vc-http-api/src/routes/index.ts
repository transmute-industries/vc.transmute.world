import { FastifyInstance } from 'fastify';
// if you wish to force auth on a global level:
// import * as authenticate from 'fastify-auth0-verify';
import { docs, rapidoc } from './docs';
import config from '../config';

export const registerRoutes = (server: FastifyInstance) => {
  // setup auth if configured globally which would be recommended in
  // production for all routes other than .well-known
  //
  // if (config.security.auth0_enabled) {
  //   server.register(authenticate, config.security.options);
  // }
  // eslint-disable-next-line global-require
  server.register(require('fastify-auth0-verify'), config.security.options);

  // redoc
  server.get(
    '/',
    {
      schema: {
        hide: true,
        description: '',
        tags: ['DID'],
        summary: 'DID Web Endpoint',
        response: {
          200: {
            description: 'Success',
            type: 'object',
            additionalProperties: true,
          },
        },
      },
    },
    async (_request: any, reply: any) => {
      // return reply.redirect('/docs/index.html');
      return reply.type('text/html').send(docs);
    }
  );
  // rapidoc
  server.get(
    '/rapidoc',
    {
      schema: {
        hide: true,
        description: '',
        tags: ['DID'],
        summary: 'DID Web Endpoint',
        response: {
          200: {
            description: 'Success',
            type: 'object',
            additionalProperties: true,
          },
        },
      },
    },
    async (_request: any, reply: any) => {
      return reply.type('text/html').send(rapidoc);
    }
  );
  // swagger
  server.get(
    '/swagger',
    {
      schema: {
        hide: true,
        description: '',
        tags: ['DID'],
        summary: 'DID Web Endpoint',
        response: {
          200: {
            description: 'Success',
            type: 'object',
            additionalProperties: true,
          },
        },
      },
    },
    async (_request: any, reply: any) => {
      return reply.redirect('/docs/index.html');
    }
  );

  config.routes.configured.forEach(o => {
    if (!config.routes.disabled.includes(o.name)) {
      if (config.security.allow_unauthenticated) {
        // eslint-disable-next-line no-console
        console.log('Dynamically Enabling Route:', o.name, 'at:', o.prefix);
        server.register(o.obj, { prefix: o.prefix });
      }
      if (config.routes.oauth.includes(o.name)) {
        if (config.server.debug) {
          // eslint-disable-next-line no-console
          console.log(
            'Attempting to register authenticated route for:',
            o.name
          );
        }
        try {
          server
            .register(o.aobj as any, {
              prefix: config.security.auth_prefix + o.prefix,
            })
            .addHook('preValidation', async (request, reply) => {
              try {
                if (request.routerPath.includes(config.security.auth_prefix)) {
                  await (request as any).jwtVerify();
                }
              } catch (jwtErr) {
                if (config.server.debug) {
                  // eslint-disable-next-line no-console
                  console.log(
                    'Unauthenticated request!',
                    jwtErr
                    // 'on request:', JSON.stringify(request)
                  );
                }
                reply.send({
                  401: {
                    description: 'Authentication failed.',
                    type: 'object',
                    additionalProperties: false,
                  },
                });
              }
            });
          // server.decorateRequest(config.security.auth_prefix, (<any>server).authenticate);
        } catch (regError) {
          // eslint-disable-next-line no-console
          console.log(
            '!Error registering authentication on route:',
            o,
            '\n\ndetailed error',
            regError
          );
        }
      }
    }
  });
};
