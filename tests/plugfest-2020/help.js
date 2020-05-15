// eslint-disable-next-line node/no-unpublished-require
const uuid = require('uuid-random');
const request = require('supertest');
const { getFastify } = require('../../src/factory');
const config = require('../../src/config');

const opts = {
  logger: false,
  config,
};
const { fastify } = getFastify(opts);

let tester;

const getTester = async () => {
  if (tester) {
    return tester;
  }
  await fastify.ready();
  const port = fastify.svcs.config.fastify_base_url.split(':').pop();
  try {
    await fastify.listen(port);
  } catch (e) {
    // ignore
  }
  tester = request(fastify.server);
  return tester;
};

const closeTester = async () => {
  await fastify.close();
};

const getJson = async url => {
  const res = await tester
    .get(url.replace(fastify.svcs.config.fastify_base_url, ''))
    .set('Accept', 'application/ld+json');

  if (res.status > 300) {
    console.error('ERROR with GET: ', url);
    console.error(res.body);
  }
  return res;
};

const postJson = async (url, body) => {
  const res = await tester
    .post(url.replace(fastify.svcs.config.fastify_base_url, ''))
    .set('Accept', 'application/ld+json')
    .set('Content-Type', 'application/json')
    .send(body);

  return { status: res.status, body: res.body };
};

const cloneObj = obj => {
  return JSON.parse(JSON.stringify(obj));
};

const annotateWithUniqueId = credentials => {
  return credentials.map(credential =>
    credential.id
      ? {
          ...credential,
          id: `${credential.id}#${uuid()}`,
        }
      : credential
  );
};

module.exports = {
  cloneObj,
  annotateWithUniqueId,
  getJson,
  postJson,
  getTester,
  closeTester,
};
