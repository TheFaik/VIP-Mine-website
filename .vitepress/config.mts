import { defineConfig } from 'vitepress'
import sidebar from './sidebar.mts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "VIP-MINE",
  link: '/pages/',
  description: "Сеть серверов Minecraft",
  head: [['link', { rel: 'icon', href: '/logo.svg' }]],
  srcDir: './pages',
  appearance: 'force-dark',
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    nav: [
      { text: 'Домик', link: '/' },
      { text: 'О нас', link: '/docs/' },
    ],
    
    sidebar,

    socialLinks: [
      { icon: 'discord', link: 'https://ds.vip-mine.ru' },
      { icon: 'vk', link: 'https://vk.com/vipmineru' },
      { icon: 'github', link: 'https://github.com/TheFaik/VIP-Mine-website' }
    ]
  }
})
