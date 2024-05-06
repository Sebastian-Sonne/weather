import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.REACT_APP_OPEN_WEATHER_API_KEY': JSON.stringify(process.env.REACT_APP_OPEN_WEATHER_API_KEY),
  },
  plugins: [react()],
})
