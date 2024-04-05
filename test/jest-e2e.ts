import * as dotenv from 'dotenv';
import type { Config } from 'jest';
process.env.TZ = 'Etc/UTC';
if (process.env.NODE_ENV) {
  console.log(`JEST: Using .env.${process.env.NODE_ENV} file`);
  dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
  });
} else {
  console.error('JEST: NODE_ENV is not defined, falling back to .env');
  dotenv.config({ path: '.env' });
}

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  rootDir: '..',
  // roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/test/$1',
  },

  testEnvironment: 'node',
  testTimeout: 13000,
  // testRegex: '.case2.ts$',
  // testRegex: '.case3.ts$',
  // testRegex: '(.test2.ts$)',
  testRegex: '(.test.ts$)|(.e2e-spec.ts$)',
  // testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  reporters: [
    // дефолтный в консоли
    'default',
    // репортер из npm
    // [
    //   'jest-html-reporters',
    //   {
    //     // место сохранения отчета
    //     publicPath: '<rootDir>/reports/unit-test',
    //     filename: 'report.html',
    //     openReport: false,
    //     // опция делает так, что в папке оказывается только один html файл
    //     inlineSource: true,
    //   },
    // ],
  ],
  displayName: {
    name: 'CLIENT',
    color: 'green',
  },
};

export default config;
// const jestConfig: JestCon = {}

// export default {};
// module.exports = {
//   moduleFileExtensions: ['js', 'json', 'ts'],
//   rootDir: '..',
//   // roots: ['<rootDir>/src'],
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1',
//     '^test/(.*)$': '<rootDir>/test/$1',
//   },
//   testEnvironment: 'node',
//   // testRegex: '.test.ts$',
//   testRegex: '(.test.ts$)|(.e2e-spec.ts$)',
//   // testRegex: '.e2e-spec.ts$',
//   transform: {
//     '^.+\\.(t|j)s$': 'ts-jest',
//   },
//   reporters: [
//     // дефолтный в консоли
//     'default',
//     // репортер из npm
//     // [
//     //   'jest-html-reporters',
//     //   {
//     //     // место сохранения отчета
//     //     publicPath: '<rootDir>/reports/unit-test',
//     //     filename: 'report.html',
//     //     openReport: false,
//     //     // опция делает так, что в папке оказывается только один html файл
//     //     inlineSource: true,
//     //   },
//     // ],
//   ],
// };
