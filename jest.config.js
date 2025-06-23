module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: ["/node_modules/"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/src/components/.*\\.test\\.tsx$", // Ignore frontend/Vitest tests
  ],
};
