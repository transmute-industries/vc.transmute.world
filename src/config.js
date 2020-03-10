const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const config = {
  fastify_logger: process.env.FASTIFY_LOGGER === 'true',
  fastify_base_url: process.env.FASTIFY_BASE_URL,
};

module.exports = config;
