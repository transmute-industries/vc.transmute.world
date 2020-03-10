module.exports = (fastify, opts, done) => {
  const { did_document } = fastify.svcs;

  fastify.get(
    '/did.json',
    {
      schema: {
        tags: ['DID'],
        summary: 'DID Document',
      },
    },
    async (request, reply) => {
      return reply.code(200).send(did_document);
    }
  );

  done();
};
