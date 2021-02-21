import jest from 'jest';
import path from 'path';

const JEST_TEST_TIMEOUT_MS = 15000;

export default async (config: any) => {
  const results = await jest.runCLI(
    {
      json: false,
      roots: [path.resolve(`${__dirname}/../../`)],
      globals: JSON.stringify({ suiteConfig: config }),
      testTimeout: JEST_TEST_TIMEOUT_MS,
    } as any,
    [process.cwd()]
  );
  return results;
};
