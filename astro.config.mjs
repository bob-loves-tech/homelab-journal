// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://bob-loves-tech.github.io',
  base: '/homelab-journal',
  vite: {
    plugins: [tailwindcss()]
  }
});
