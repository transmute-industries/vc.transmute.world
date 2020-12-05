import supertest, { SuperTest } from 'supertest';

// import fs from 'fs';
// import path from 'path';
import { getTestServer } from '../server';

const { suitesInput, suitesOutput } = require('jest-test-server');

let api: SuperTest<any>;
let server: any;

beforeAll(async () => {
  server = await getTestServer();
  api = supertest(server.server);
});

afterAll(async () => {
  await server.close();
});

it('can generate report with jest-test-server', async () => {
  let response = await api
    .post('/test-suite-manager/generate-report')
    .send(suitesInput);

  expect(response.body.suitesReportJson).toEqual(suitesOutput.suitesReportJson);
  // note that suitesReportTerminal will differ, because of paths
});
