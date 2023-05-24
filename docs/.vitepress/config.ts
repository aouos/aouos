import { defineConfig } from 'vitepress';
import sidebar from './sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'AouoCode',
  description: 'My Planet of Knowledge',
  themeConfig: {
    logo: '/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Blog', link: '/blog/' },
      { text: 'HTML & CSS', link: '/basic/' },
      { text: 'JavaScript', link: '/javascript/' },
      { text: 'Vue', link: '/vue/' },
      { text: 'React', link: '/react/' },
      { text: 'Algorithm', link: '/algo/' },
    ],

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aouocode/notes' },
    ],
  },
});
