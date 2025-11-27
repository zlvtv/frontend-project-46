/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  // Тестовые файлы
  testMatch: ['**/__tests__/**/*.test.js'],
  // Генерация покрытия кода
  collectCoverage: false,
  coverageDirectory: 'coverage', 
  coverageReporters: ['text', 'lcov', 'html'],

  // Какие файлы включать в покрытие
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js', 
  ],
  transform: {},
};