module.exports = {
  testEnvironment: "node",
  clearMocks: true,
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
};
