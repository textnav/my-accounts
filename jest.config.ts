import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  clearMocks: true,
  moduleDirectories: ["node_modules", "utils"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/index.tsx",
    "!src/serviceWorker.ts",
    "!src/reportWebVitals.ts",
    "!**/node_modules/**",
    "!src/mock/mock.config.ts",
    "!src/utils/test-utils.ts",
  ],
  coveragePathIgnorePatterns: [
    "./src/*/*.types.{ts,tsx}",
    "./src/index.tsx",
    "./src/serviceWorker.ts",
  ],
  coverageReporters: ["json", "lcov", "text-summary", "clover"],
};
export default config;
