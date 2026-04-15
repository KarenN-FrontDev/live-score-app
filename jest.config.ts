import nextJest from 'next/jest';

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  silent: true,
};

module.exports = async () => {
  const jestConfig = await createJestConfig(customJestConfig)();
  return {
    ...jestConfig,
    transformIgnorePatterns: ["node_modules/(?!(@mswjs|msw)/)"],
  };
};
