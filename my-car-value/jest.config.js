module.exports = {
  testEnvironment: 'node',
  testTimeout: 30000,

  testMatch: ['<rootDir>/test/**/*spec.{ts,js}'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  preset: 'ts-jest',
};
