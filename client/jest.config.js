module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.tsx',
    '!src/**/*.spec.tsx',
    '!src/**/*.test.tsx',
    '!src/**/*.story.tsx',
  ],
  coverageReporters: ['lcov', 'json'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '.+\\.(png)$': 'jest-static-stubs/png',
  },
  preset: 'react-native',
  setupFiles: [
    //'./node_modules/react-native-gesture-handler/jestSetup.js',
    './jest.setup.js',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    //'jest-styled-components',
  ],
  testPathIgnorePatterns: ['/android/', '/ios/', '/node_modules/'],
  transformIgnorePatterns: ['node_modules/(?!axios)/'],
}
