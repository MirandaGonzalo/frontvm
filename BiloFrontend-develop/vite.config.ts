import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    allowedHosts: ['bilodamiani.com.ar', 'www.bilodamiani.com.ar'],
    host: '0.0.0.0',
  },
})
