import { defineConfig } from 'vitepress';
import blog from './blog';
import algo from './algo';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'Aouos',
  description: 'My Planet of Knowledge',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
  themeConfig: {
    logo: '/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Blog', link: '/blog/' },
      { text: 'Algorithm', link: '/algo/' },
      { text: 'Works', link: '/works/' },
      { text: 'About', link: '/about/' },
    ],

    outline: {
      label: '本页内容',
    },

    search: {
      provider: 'local',
    },

    sidebar: {
      blog,
      algo,
    },

    footer: {
      message: '❤️',
      copyright: 'Copyright © 2023 - Present AouoCode',
    },

    editLink: {
      pattern: 'https://github.com/aouocode/notes/edit/main/docs/:path',
      text: '在 GitHub 编辑此内容',
    },

    lastUpdatedText: '最后更新于',

    socialLinks: [{ icon: 'github', link: 'https://github.com/aouos' }],
  },

  lastUpdated: true,
});
