/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("next").NextConfig} */
const config = {
  output: "standalone",
  webpack: (config, { isServer }) => {
    // Add alias for assets folder - check multiple possible locations
    const assetsPath =
      process.env.NODE_ENV === "production"
        ? path.resolve(__dirname, "./assets") // In Docker container
        : path.resolve(__dirname, "../assets"); // In development

    config.resolve.alias = {
      ...config.resolve.alias,
      "@assets": assetsPath,
    };
    return config;
  },
};

export default config;
