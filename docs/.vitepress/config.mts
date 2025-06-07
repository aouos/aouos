import { defineConfig } from 'vitepress';
import blog from './blog';
import collection from './collection';

export default defineConfig({
  lang: 'zh-CN',
  title: 'AOUOS',
  description: 'My Planet of Knowledge',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/image.svg' }]],
  themeConfig: {
    nav: [
      { text: '博客', link: '/blog/' },
      { text: '收藏夹', link: '/collection/' },
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
      collection,
    },

    editLink: {
      pattern: 'https://github.com/aouos/aouos/edit/main/docs/:path',
      text: '在 GitHub 编辑此页',
    },

    lastUpdatedText: '最后更新于',

    socialLinks: [{ icon: 'github', link: 'https://github.com/aouos' }],
  },

  lastUpdated: true,
});
