// @ts-check
import { env } from 'node:process';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

const site = env.SITE_URL ?? 'https://dipakmandlik.github.io';
const base = env.BASE_PATH ?? '/AIByDM';
const vitePlugins = /** @type {any} */ ([tailwindcss()]);

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [react(), sitemap(), mdx()],
  vite: {
    // Keep config type-checking stable across npm/pnpm installs where Vite can resolve from different trees.
    plugins: vitePlugins,
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
