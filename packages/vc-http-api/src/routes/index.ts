import { FastifyInstance } from 'fastify';
import { docs, rapidoc } from './docs';
import config from '../config';
import wellKnown from './.well-known';
import v010 from './v0.1.0';
import v000 from './v0.0.0';
import next from './next';

import testSuiteManager from './test-suite-manager';

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

  if (!config.routes.disabled.includes('wellKnown')) {
    server.register(wellKnown, { prefix: '/.well-known' });
  }
  if (!config.routes.disabled.includes('next')) {
    server.register(next, { prefix: '/next' });
  }
  if (!config.routes.disabled.includes('v010')) {
    server.register(v010, { prefix: '/v0.1.0' });
  }
  if (!config.routes.disabled.includes('v000')) {
    server.register(v000, { prefix: '/v0.0.0' });
  }
  if (!config.routes.disabled.includes('testSuiteManager')) {
    server.register(testSuiteManager, { prefix: '/test-suite-manager' });
  }
};
