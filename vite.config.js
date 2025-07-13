import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Tambahkan atau ubah baris 'base' ini
  // base: '/clothing-convection/dist/', // <-- Sesuaikan dengan nama repo!
  // base: 'https://github.com/Kuurianse/clothing-convection/dist/', // <-- Sesuaikan dengan nama repo!
  base: 'https://kuurianse.github.io/clothing-convection/dist/', // <-- Sesuaikan dengan nama repo!
  plugins: [
    tailwindcss(),
  ],
})