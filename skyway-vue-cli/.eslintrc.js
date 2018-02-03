// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  // parser: 'babel-eslint',
  parser: 'typescript-eslint-parser',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
    jquery: true,
    node: true
  },
  extends: 'eslint:recommended',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'indent': ['error', 2],
    // allow paren-less arrow functions
    'arrow-parens': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'space-before-function-paren': ['error', {
        'anonymous': 'always',
        'named': 'always',
        'asyncArrow': 'always'
    }],
    'no-process-env': 'off',
    'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
    'no-empty-pattern': 'off',
    'no-empty': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 'off'
  }
}
