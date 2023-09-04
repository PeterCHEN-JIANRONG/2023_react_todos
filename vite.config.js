import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production'? '/2023_react_todos/': '/', // 線上才改變 baseUrl
  plugins: [react()],
})
