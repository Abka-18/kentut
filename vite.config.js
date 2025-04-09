import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/kentut/', // HARUS sesuai dengan nama repo GitHub kamu
})
