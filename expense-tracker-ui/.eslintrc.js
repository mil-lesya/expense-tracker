module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard-with-typescript', 'plugin:react/recommended'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './expense-tracker-ui/tsconfig.json'
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    semi: 'off',
    '@typescript-eslint/semi': [2, 'always'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    'react/no-deprecated': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
  }
};
