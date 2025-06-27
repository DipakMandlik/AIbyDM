import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mochaPlugins } from "@getmocha/vite-plugins";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/AIbyDM/", // ✅ replace 'yourrepo' with your GitHub repository name
  plugins: [...mochaPlugins(process.env), react()],
  server: {
    allowedHosts: true,
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
});
