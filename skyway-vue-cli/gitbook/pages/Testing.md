# Testing

## Unit Test

This project is adopted the Jest for unit testing.

official document: https://facebook.github.io/jest/

### Config

Here's the config file

test/unit/jest.conf.js

### Run Unit Test

Hit the npm script below.
```
$ npm run unit
```

This command executes the all unit tests(test/unit/specs/**/*.ts) and create the coverage report.

```
Test Suites: 19 passed, 19 total
Tests:       80 passed, 80 total
Snapshots:   0 total
Time:        14.599s
Ran all test suites.
----------------------|----------|----------|----------|----------|----------------|
File                  |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------------------|----------|----------|----------|----------|----------------|
All files             |    33.27 |    30.93 |    23.42 |    33.06 |                |
 api                  |     62.5 |        0 |    58.82 |     62.5 |                |
  gibsonApi.ts        |    39.13 |        0 |        0 |    39.13 |... 86,87,88,93 |
  methods.ts          |      100 |      100 |      100 |      100 |                |
  wordpressApi.ts     |    71.43 |      100 |        0 |    71.43 |          10,13 |
 modules              |    45.95 |    33.33 |    63.64 |    45.95 |                |
  soundMeter.ts       |    16.67 |        0 |       20 |    16.67 |... 33,34,40,41 |
...
```

And after running the unit test, static html files will generate at test/unit/coverage/

You can see the report on browser to refer the test/unit/coverage/lcov-report/index.html.

## E2E Test

We have installed Nightwatch and set it up, but have not yet written any test case.
