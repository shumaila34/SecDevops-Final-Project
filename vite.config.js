import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite' // Import Tailwind Vite Plugin


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss() // Add Tailwind Plugin
  ],
  
})

