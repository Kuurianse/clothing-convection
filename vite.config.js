import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Tambahkan atau ubah baris 'base' ini
  base: '/clothing-convection/', // <-- Sesuaikan dengan nama repo kamu!
  plugins: [
    tailwindcss(),
  ],
})