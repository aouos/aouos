import { defineConfig } from 'vitepress';
import sidebar from './sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'AouoCode',
  description: 'My Planet of Knowledge',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
  themeConfig: {
    logo: '/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Blog', link: '/blog/' },
      { text: 'HTML & CSS', link: '/basic/' },
      { text: 'JavaScript', link: '/javascript/' },
      { text: 'Vue', link: '/vue/' },
      { text: 'React', link: '/react/' },
      { text: 'Algorithm', link: '/algo/' },
    ],

    outline: {
      label: '本页内容',
    },

    search: {
      provider: 'local',
    },

    sidebar,

    footer: {
      message: '❤️',
      copyright: 'Copyright © 2023-Present AouoCode',
    },

    editLink: {
      pattern: 'https://github.com/aouocode/notes/edit/main/docs/:path',
      text: 'GitHub 编辑此内容',
    },

    lastUpdatedText: '最后更新于',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aouocode/notes' },
    ],
  },

  lastUpdated: true,
});
