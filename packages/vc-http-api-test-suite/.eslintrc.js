module.exports = {
    extends: [
      'airbnb-typescript/base',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended',
    ],
    parserOptions: {
      project: './tsconfig.json',
    },
    rules: {
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  };