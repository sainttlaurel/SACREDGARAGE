import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'vendor-react': ['react', 'react-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-supabase': ['@supabase/supabase-js'],
          // Feature chunks
          'admin': ['./src/pages/AdminPortal.tsx'],
          'gallery': ['./src/components/GalleryWall.tsx', './src/components/Showreel.tsx'],
        },
      },
    },
    // Minify and optimize
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Report compressed size
    reportCompressedSize: true,
    // Chunk size warnings
    chunkSizeWarningLimit: 500,
  },
})
