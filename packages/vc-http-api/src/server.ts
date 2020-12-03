import { fastify, FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { registerRoutes } from './routes';
import { registerServices } from './services';

import defaultConfig from './config';

export const getServer = (config: any) => {
  const server: FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse
  > = fastify({
    ignoreTrailingSlash: true,
  });

  registerServices(server, config);
  registerRoutes(server);
  return server;
};

export const getTestServer = async (
  withTestData: boolean = false,
  config: any = defaultConfig
) => {
  const server = getServer(config);
  await server.ready();

  if (withTestData) {
    // eslint-disable-next-line no-console
    console.error('withTestData not implemented');
  }
  return server;
};
