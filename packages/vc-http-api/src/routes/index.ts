import { FastifyInstance } from 'fastify';
import { docs } from './docs';
import wellKnown from './.well-known';
import v010 from './v0.1.0';
import v000 from './v0.0.0';
import next from './next';

import testSuiteManager from './test-suite-manager';

export const registerRoutes = (server: FastifyInstance) => {
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

  server.register(wellKnown, { prefix: '/.well-known' });
  server.register(next, { prefix: '/next' });
  server.register(v010, { prefix: '/v0.1.0' });
  server.register(v000, { prefix: '/v0.0.0' });
  server.register(testSuiteManager, { prefix: '/test-suite-manager' });
};
