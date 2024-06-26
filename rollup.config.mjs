//@ts-check
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import filesize from "rollup-plugin-filesize";

const pkg = JSON.parse(
  fs
    .readFileSync(
      path.join(path.dirname(fileURLToPath(import.meta.url)), "package.json")
    )
    .toString()
);

const banner = `/*!
  ${pkg.name} v${pkg.version}
  ${pkg.homepage}
  Released under the ${pkg.license} License.
*/`;

const globals = {
  react: "React",
  "react-window": "reactWindow",
  "react-virtualized-auto-sizer": "AutoSizer",
};

// NOTE:https://rollupjs.org/migration/#changed-defaults
/** @type {import('rollup').OutputOptions} */
const migrateRollup2to3OutputOptions = {
  interop: "compat",
};

/** @type {import('rollup').RollupOptions} */
const config = {
  input: "src/index.ts",
  output: [
    {
      file: pkg.browser,
      format: "umd",
      name: "Calendar",
      globals,
      banner,
      ...migrateRollup2to3OutputOptions,
      plugins: [terser()],
    },
    {
      file: pkg.browser.replace(".min.js", ".js"),
      format: "umd",
      sourcemap: "inline",
      name: "Calendar",
      globals,
      banner,
      ...migrateRollup2to3OutputOptions,
    },
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: "inline",
      name: "Calendar",
      banner,
      ...migrateRollup2to3OutputOptions,
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: "inline",
      banner,
      ...migrateRollup2to3OutputOptions,
    },
  ],
  plugins: [
    resolve({
      mainFields: ["module"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    babel(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist",
    }),
    filesize(),
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
};

export default config;
