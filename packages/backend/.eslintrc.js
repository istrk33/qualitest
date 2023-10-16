const { off } = require("process");

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'airbnb'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "import/no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    'import/no-unresolved': 'off',
    "@typescript-eslint/no-redeclare": "warning",
    'import/no-redeclare': 'off',
    'import/object-curly-newline': 'off',
    'import/no-useless-constructor': 'off',
    'import/no-empty-function': 'off',
    'import/indent': 'off',
    'import/class-methods-use-this': 'off',
    'import/no-extraneous-dependencies': 'off',
    'prettier/prettier': ['error'],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
