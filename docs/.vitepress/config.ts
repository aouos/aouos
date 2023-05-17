import { defineConfig } from 'vitepress';
import sidebar from './sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'AouoCode',
  description: 'my personal website',
  themeConfig: {
    logo: '/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Blog', link: '/blog/' },
      { text: 'Front-End', link: '/notes/' },
      { text: 'Algorithm', link: '/algo/' },
    ],

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
});
