import jest from 'jest';
import path from 'path';

const JEST_TEST_TIMEOUT_MS = 15000;

export default async (config: any) => {
  const roots = [path.resolve(`${__dirname}/../suites`)];
  const globals = JSON.stringify({ suiteConfig: config });
  const results = await jest.runCLI(
    {
      json: false,
      roots,
      globals,
      testTimeout: JEST_TEST_TIMEOUT_MS,
    } as any,
    [process.cwd()]
  );
  return results;
};
