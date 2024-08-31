import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      "@Controllers": path.resolve(__dirname, "src/Application/Controllers"),
      "@Usecases": path.resolve(__dirname, "src/Application/Usecases"),
      "@Entities": path.resolve(__dirname, "src/Domain/Entities"),
      "@Repositories": path.resolve(__dirname, "src/Domain/Repositories"),
      "@Databases": path.resolve(__dirname, "src/Infrastructure/Databases"),
      "@Routers": path.resolve(__dirname, "src/Infrastructure/Routers")
    }
  },
  build: {
    lib: {
      entry: 'src/main.ts',
      formats: ['cjs']
    },
    rollupOptions: {
      external: ['express']
    },
    outDir: 'dist'
  }
})