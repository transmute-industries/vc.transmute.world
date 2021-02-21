const fixtures = require('require-all')({
  dirname: __dirname,
  filter: /.json$/,
  map(__, path) {
    return `${path}`;
  },
});

module.exports = Object.values(fixtures).map(item => {
  return {
    name: item.name,
    data: item,
  };
});
