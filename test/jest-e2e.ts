import * as dotenv from 'dotenv';

if (process.env.NODE_ENV) {
  console.log(`JEST: Using .env.${process.env.NODE_ENV} file`);
  dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
  });
} else {
  console.error('JEST: NODE_ENV is not defined, falling back to .env');
  dotenv.config({ path: '.env' });
}

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  reporters: [
    // дефолтный в консоли
    'default',
    // репортер из npm
    [
      'jest-html-reporters',
      {
        // место сохранения отчета
        publicPath: '<rootDir>/reports/unit-test',
        filename: 'report.html',
        openReport: false,
        // опция делает так, что в папке оказывается только один html файл
        inlineSource: true,
      },
    ],
  ],
};
