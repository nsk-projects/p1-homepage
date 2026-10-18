// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // 실제 사이트 주소. OG·canonical·sitemap·RSS의 절대 주소에 쓰인다.
  site: 'https://www.nsklog.dev',
  integrations: [sitemap()],
});
