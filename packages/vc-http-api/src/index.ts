import { getServer } from './server';
import config from './config';

const fastify = getServer(config);

export default fastify;
