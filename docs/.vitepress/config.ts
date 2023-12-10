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
      { text: 'Blog', link: '/blog/' },
      { text: 'Notes', link: '/notes/' },
      { text: 'Algorithm', link: '/algo/' },
      { text: 'Works', link: '/works/' },
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
