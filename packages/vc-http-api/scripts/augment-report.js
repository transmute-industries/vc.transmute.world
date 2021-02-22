const fs = require('fs');
const path = require('path');

const pathToReport = path.resolve(
  __dirname,
  '../../../docs/vc-http-api/transmute/index.html'
);

fs.readFile(pathToReport, 'utf8', (err1, data) => {
  if (err1) {
    // eslint-disable-next-line no-console
    return console.log(err1);
  }

  const result = data.replace(
    'https://github.com/Hazyzh/jest-html-reporters',
    'https://github.com/transmute-industries/vc.transmute.world'
  );

  return fs.writeFile(pathToReport, result, 'utf8', err2 => {
    // eslint-disable-next-line no-console
    if (err2) return console.log(err2);
    // eslint-disable-next-line no-console
    console.log('Test augmentation complete...');
    return true;
  });
});
