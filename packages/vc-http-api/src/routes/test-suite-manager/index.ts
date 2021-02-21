// import { getReportResults, suitesInput, suitesOutput } from 'jest-test-server';

export default (server: any, _opts: any, done: any) => {
  server.post(
    '/generate-report',
    {
      schema: {
        tags: ['Test Suite Manager'],
        summary: 'Generate Report',
        description: 'Run tests on supplied suites',
        body: {
          type: 'array',
          // example: suitesInput,
          additionalProperties: true,
        },
        response: {
          200: {
            description: 'Success',
            type: 'object',
            // example: suitesOutput,
            additionalProperties: true,
          },
        },
      },
    },
    async (_request: any, reply: any) => {
      // try {
      //   const results = await getReportResults(request.body);
      //   return reply.send(results);
      // } catch (e) {
      //   // eslint-disable-next-line no-console
      //   console.error(e);
      //   return reply.status(400).send({ message: e.message });
      // }
      return reply.status(501).send({ message: 'not implemented' });
    }
  );

  done();
};
