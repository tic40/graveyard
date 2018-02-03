# Scripts

npm scripts are defined in the package.json.

Hit the command below to list the all npm scripts.
```
$ npm run
```

All the npm scripts will be listed like the below.
```
$ npm run
Lifecycle scripts included in :
  start
    node build/dev-server.js
  test
    npm run unit && npm run e2e

available via `npm run-script`:
  dev
    node build/dev-server.js
  build
    node build/build.js
  unit
    jest --config test/unit/jest.conf.js --coverage
  e2e
    node test/e2e/runner.js
  eslint
    node_modules/eslint/bin/eslint.js './src/js/**/*.js' './src/js/**/*.ts'
  prettier
    node_modules/prettier-eslint-cli/dist/index.js --write './src/js/**/*.js' './src/js/**/*.ts' './test/unit/specs/**/*.ts'
  stylefmt
    node_modules/stylefmt/bin/cli.js -r 'src/sass/**/*.scss'
  apimock
    node apimock/server.js
  sasslint
    node_modules/sass-lint/bin/sass-lint.js -v
  gitbook
    node_modules/gitbook-cli/bin/gitbook.js serve ./gitbook --port 8082
```
