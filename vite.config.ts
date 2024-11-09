import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@Application': path.resolve(__dirname, 'src/Application'),
      '@Domain': path.resolve(__dirname, 'src/Domain'),
      '@Infrastructure': path.resolve(__dirname, 'src/Infrastructure'),
    },
  },
  build: {
    lib: {
      entry: 'src/main.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: ['express'],
    },
    outDir: 'dist',
  },
  test: {
    globals: true,
    environment: 'node',
  },
})
