module.exports = (fastify, opts, done) => {
  const { didDocument } = fastify.svcs;

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

  done();
};
