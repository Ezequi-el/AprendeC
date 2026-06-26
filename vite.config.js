import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
    rollupOptions: {
      external: ['browsercc', '@bjorn3/browser_wasi_shim', '@supabase/supabase-js'],
    },
  },
});
