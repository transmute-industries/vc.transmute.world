const { testRunner } = require('./dist');

const { transmute } = require('./src/__interop__/vendors');

(async () => {
  console.log('🧙‍♂️ running jest suites.\n');
  await testRunner(transmute);
})();
