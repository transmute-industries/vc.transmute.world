// import supertest, { SuperTest } from 'supertest';

// // import fs from 'fs';
// // import path from 'path';
// import { getTestServer } from '../server';

// // const { suitesInput } = require('jest-test-server');

// let api: SuperTest<any>;
// let server: any;

// beforeAll(async () => {
//   server = await getTestServer();
//   api = supertest(server.server);
// });

// afterAll(async () => {
//   await server.close();
// });

it.skip('can generate report with jest-test-server', async () => {
  // const response = await api
  //   .post('/test-suite-manager/generate-report')
  //   .send(suitesInput);
  // // fs.writeFileSync(
  // //   path.resolve(__dirname, '../__fixtures__/expected-suite-output.json'),
  // //   JSON.stringify(response.body.suitesReportJson, null, 2)
  // // );
  // // note that suitesReportTerminal will differ, because of paths
  // expect(response.body.suitesReportJson).toEqual(
  //   // eslint-disable-next-line global-require
  //   require('../__fixtures__/expected-suite-output.json')
  // );
});
