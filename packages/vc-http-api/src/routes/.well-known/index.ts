import didDocument from '../../data/didDocument.json';

export default (server: any, _opts: any, done: any) => {
  server.get(
    '/did.json',
    {
      schema: {
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
      return reply.send(didDocument);
    }
  );

  done();
};
