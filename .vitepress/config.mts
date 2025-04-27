import { defineConfig } from 'vitepress'
import sidebar from './sidebar.mts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "VIP-MINE – Сеть серверов Minecraft",
  description: "Сеть серверов Minecraft",
  base: "/VIP-Mine-website/",
  head: [['link', { rel: 'icon', href: '/logo.svg' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Домик', link: '/' },
      { text: 'О нас', link: '/pages/' }
    ],
    
    sidebar,

    socialLinks: [
      { icon: 'discord', link: 'https://ds.vip-mine.ru' },
      { icon: 'vk', link: 'https://vk.com/vipmineru' },
      { icon: 'github', link: 'https://github.com/TheFaik/VIP-Mine-website' }
    ]
  }
})
