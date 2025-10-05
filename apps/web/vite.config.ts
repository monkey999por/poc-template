import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  plugins: [
    reactRouter(),
    tsconfigPaths(),
  ],
});
