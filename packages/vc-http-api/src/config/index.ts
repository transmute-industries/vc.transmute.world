/* eslint-disable import/no-duplicates */
import wellKnown from '../routes/.well-known';
import next from '../routes/next';
import anext from '../routes/next';
import v000 from '../routes/v0.0.0';
import av000 from '../routes/v0.0.0';
import v010 from '../routes/v0.1.0';
import av010 from '../routes/v0.1.0';
import testSuiteManager from '../routes/test-suite-manager';

const config = {
  version: '0.0.0',
  server: {
    debug: true,
  },
  routes: {
    configured: [
      {
        name: 'wellKnown',
        prefix: '/.well-known',
        obj: wellKnown,
      },
      {
        name: 'next',
        prefix: '/next',
        obj: next,
        aobj: anext, // this second is a total work around deep cloning issues in JS/TS
      },
      {
        name: 'v010',
        prefix: '/v0.1.0',
        obj: v010,
        aobj: av010,
      },
      {
        name: 'v000',
        prefix: '/v0.0.0',
        obj: v000,
        aobj: av000,
      },
      {
        name: 'testSuiteManager',
        prefix: '/test-suite-manager',
        obj: testSuiteManager,
      },
    ],
    disabled: [
      'disabled',
      // 'v010',
      // 'v000'
    ],
    oauth: [
      // to enable auth on a route include it in this array
      // 'next',
      'disabled',
    ],
  },
  security: {
    auth_prefix: '/auth',
    allow_unauthenticated: true,
    auth0_enabled: false,
    options: {
      // please note that these are set to env vars for demonstration
      // for production please use a secrets manager
      // domain: process.env.VC_AUTH_DOMAIN,
      // audience: process.env.VC_AUTH_AUDIENCE,
      // client: process.env.VC_AUTH_CLIENT,
      // secret: process.env.VC_AUTH_SECRET,
      domain: 'example.org',
    },
  },
};

export default config;
