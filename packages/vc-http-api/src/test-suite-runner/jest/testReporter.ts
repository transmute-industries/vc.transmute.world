import MyCustomReporter from 'jest-html-reporters';
import fs, { promises } from 'fs';

export default async (directory: string, name: string, results: any) => {
  if (!fs.existsSync(directory)) {
    await promises.mkdir(directory, { recursive: true });
  }
  const reporter = new MyCustomReporter(
    {},
    {
      filename: `${directory}/index.html`,
      pageTitle: `${name} VC-HTTP-API Test Report`,
    }
  );

  await reporter.onRunComplete({}, results);
};
