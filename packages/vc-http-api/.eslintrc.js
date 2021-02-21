module.exports = {
  plugins: ['jest'],
  extends: [
    'airbnb-typescript/base',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    'jest/globals': true,
  },
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
