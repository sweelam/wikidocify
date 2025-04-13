module.exports = {
    testEnvironment: 'jsdom',
    collectCoverageFrom: [
      'src/**/*.{js,jsx}',
      '!src/index.js',
      '!src/reportWebVitals.js',
      '!src/setupTests.js',
    ],
    coverageThreshold: {
      global: {
        statements: 70,
        branches: 70,
        functions: 70,
        lines: 70,
      },
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': '<rootDir>/src/tests/__mocks__/styleMock.js',
      '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/tests/__mocks__/fileMock.js',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx}', '<rootDir>/src/**/*.{spec,test}.{js,jsx}'],
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    watchPlugins: [
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname',
    ],
  };
  