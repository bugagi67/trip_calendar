module.exports = {

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>src/_mocks_/styleMock.js"
  },
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },
  testEnvironment: 'jsdom'
};
