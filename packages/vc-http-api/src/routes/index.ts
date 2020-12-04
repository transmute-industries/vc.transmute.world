import { FastifyInstance } from 'fastify';
import wellKnown from './.well-known';
import v010 from './v0.1.0';
import v000 from './v0.0.0';

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
      return reply.redirect('/api/docs');
    }
  );

  server.register(wellKnown, { prefix: '/.well-known' });
  server.register(v010, { prefix: '/v0.1.0' });
  server.register(v000, { prefix: '/v0.0.0' });
};
