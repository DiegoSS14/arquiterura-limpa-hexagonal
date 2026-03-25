import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
const config = {
  testEnvironment: "node",
  setupFiles: ["<rootDir>/test/.env.ts"],
  transform: {
    ...tsJestTransformCfg,
  },
};

export default config;