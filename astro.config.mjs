// @ts-check
import { env } from 'node:process';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

const site = env.SITE_URL ?? 'https://dipakmandlik.github.io';
const base = env.BASE_PATH ?? '/AIByDM';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [react(), sitemap(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
