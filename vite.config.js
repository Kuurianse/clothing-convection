import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Tambahkan atau ubah baris 'base' ini
  base: 'https://github.com/Kuurianse/clothing-convection/', // <-- Sesuaikan dengan nama repo kamu!
  plugins: [
    tailwindcss(),
  ],
})