import * as dotenv from 'dotenv';

// Загрузка .env файла в зависимости от NODE_ENV
const nodeEnv = process.env.NODE_ENV;
let envFilePath = '.env'; // Путь к файлу по умолчанию
console.log('nodeEnv', nodeEnv);
if (nodeEnv === 'development') {
  envFilePath = '.env.development';
} else if (nodeEnv === 'test') {
  envFilePath = '.env.test';
} // и так далее для других сред

dotenv.config({ path: envFilePath });

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
