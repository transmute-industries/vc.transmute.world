module.exports = (fastify, opts, done) => {
  const { verifier } = fastify.svcs;

  fastify.post(
    '/verify',
    {
      schema: {
        tags: ['Verifier'],
        summary: 'Verification Result',
      },
    },
    async (request, reply) => {
      const vc = await verifier.verify(request.body);
      return reply.code(200).send(vc);
    }
  );

  done();
};
