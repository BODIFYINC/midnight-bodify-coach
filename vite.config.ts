import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const backendUrl = env.VITE_SUPABASE_URL || "https://huaxlbsgpgkydxqhgqbd.supabase.co";
  const backendPublishableKey = env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YXhsYnNncGdreWR4cWhncWJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4Nzg2MjQsImV4cCI6MjA5MDQ1NDYyNH0.G66MNre90sPfk4Pb2pJq0jcES4L-nci03wxDHiqCWoY";
  const backendProjectId = env.VITE_SUPABASE_PROJECT_ID || "huaxlbsgpgkydxqhgqbd";

  return {
    server: {
      host: "::",
      port: 8080,
    },
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(backendUrl),
      'import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY': JSON.stringify(backendPublishableKey),
      'import.meta.env.VITE_SUPABASE_PROJECT_ID': JSON.stringify(backendProjectId),
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
