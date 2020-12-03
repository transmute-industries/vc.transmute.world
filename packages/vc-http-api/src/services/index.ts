import fastifyPlugin from 'fastify-plugin';
import fastifyCors from 'fastify-cors';
import { registerSwagger } from './swagger';
import * as vc from './vc-http-api';

async function servicesConnector(fastify: any, config: any) {
  fastify.decorate('vc', vc);
  fastify.decorate('config', config);
  fastify.addHook('onClose', async (_instance: any, done: any) => {
    // handle async shutdown here.
    done();
  });
}

export const registerServices = (server: any, config: any) => {
  registerSwagger(server, config);
  server.register(fastifyCors);
  server.register(fastifyPlugin(servicesConnector), config);
};
