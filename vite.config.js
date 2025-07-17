import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
 base: "/astra",
  plugins: [
    tailwindcss(),
  ],
  server: {
    historyApiFallback: true,
  }
})