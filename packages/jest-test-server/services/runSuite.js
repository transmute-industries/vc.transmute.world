const jest = require("jest");

module.exports = async (suiteName, config) => {
  let results = await jest.runCLI(
    {
      // json: true,
      // ci: true,
      // silent: true,
      roots: [`suites/${suiteName}`],
      globals: JSON.stringify({ suiteConfig: config }),
    },
    [process.cwd()]
  );
  return results;
};
