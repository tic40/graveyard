const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  testMatch: ['**/test/unit/specs/**/*.spec.(ts|tsx|js)'],
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@js/(.*)$': '<rootDir>/src/js/$1'
  },
  transform: {
    '^.+\\.ts$': '<rootDir>/node_modules/ts-jest',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.vue$': '<rootDir>/node_modules/vue-jest'
  },
  testPathIgnorePatterns: [
    '<rootDir>/test/e2e'
  ],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: ['<rootDir>/test/unit/setup'],
  mapCoverage: true,
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'src/js/**/*.{js,ts}',
    '!src/js/app.ts',
    '!src/js/config/*',
    '!src/js/constants/*',
    '!src/js/components/**/*',
    '!src/js/store/index.ts',
    '!src/js/router/*',
    '!**/node_modules/**'
  ],
  "globals": {
    "ts-jest": {
      "skipBabel": true
    }
  }
}
