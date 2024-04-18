import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  outDir: "dist",
  sourcemap: false,
  clean: true,
  dts: true,
  format: ["esm", "cjs"],
  treeshake: true,
  minify: true,
});
