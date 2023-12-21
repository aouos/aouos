import { defineConfig } from 'vitepress';
import blog from './blog';
import notes from './notes';
import algo from './algo';

export default defineConfig({
  lang: 'zh-CN',
  title: 'Aouos',
  description: 'My Planet of Knowledge',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '博客', link: '/blog/' },
      { text: '笔记', link: '/notes/' },
      { text: '算法', link: '/algo/' },
      { text: '作品集', link: '/works/' },
    ],

    outline: {
      label: '本页内容',
    },

    search: {
      provider: 'local',
    },

    sidebar: {
      blog,
      notes,
      algo,
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
