module.exports = (fastify, opts, done) => {
  const { didDocument, didConfiguraton } = fastify.svcs;

  fastify.get(
    '/did.json',
    {
      schema: {
        tags: ['DID'],
        summary: 'DID Document',
      },
    },
    async (request, reply) => {
      return reply.code(200).send(didDocument);
    }
  );

  fastify.get(
    '/did-configuration.json',
    {
      schema: {
        tags: ['DID'],
        summary: 'DID Configuration',
      },
    },
    async (request, reply) => {
      return reply.code(200).send(didConfiguraton);
    }
  );

  done();
};
