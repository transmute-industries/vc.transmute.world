import MyCustomReporter from 'jest-html-reporters';
import fs, { promises } from 'fs';

export default async (directory: string, _name: string, results: any) => {
  if (!fs.existsSync(directory)) {
    await promises.mkdir(directory, { recursive: true });
  }
  const reporter = new MyCustomReporter(
    {},
    {
      logoImgPath: './logo.png',
      filename: `${directory}/index.html`,
      pageTitle: `VC-HTTP-API Test Report`,
    }
  );

  await reporter.onRunComplete({}, results);
};
