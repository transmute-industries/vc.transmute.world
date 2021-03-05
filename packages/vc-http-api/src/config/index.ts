import wellKnown from "../routes/.well-known";
import next from "../routes/next";
import v000 from "../routes/v0.0.0";
import v010 from "../routes/v0.1.0";
import testSuiteManager from "../routes/test-suite-manager";

const config = {
  version: '0.0.0',
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
      },
      {
        name: 'v010',
        prefix: '/v0.1.0',
        obj: v010,
      },
      {
        name: 'v000',
        prefix: '/v0.0.0',
        obj: v000,
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
    oauth: ['next'],
  },
  security: {
    allow_unauthenticated: true,
  },
};

export default config;
