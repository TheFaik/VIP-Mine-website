import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "VIP-MINE",
  description: "Сеть серверов Minecraft.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Сервер Discord', link: 'https://ds.vip-mine.ru/' },
      { text: 'VK-Группа', link: 'https://vk.com/vipmineru' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'discord', link: 'https://ds.vip-mine.ru/' },
      { icon: 'github', link: 'https://github.com/TheFaik/VIP-Mine-website' }
    ]
  }
})
