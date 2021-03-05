import { FastifyInstance } from 'fastify';
import { docs, rapidoc } from './docs';
import config from '../config';

export const registerRoutes = (server: FastifyInstance) => {
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
        console.log(
          o,
          '\n\nDynamically Enabling route:',
          o.name,
          'at:',
          o.prefix
        );
        server.register(o.obj, { prefix: o.prefix });
      }
    }
  });
};
