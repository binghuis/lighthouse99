import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "💯",
  head: [["link", { rel: "icon", type: "image/png", href: "/favicon.png" }]],
  lang: "zh-Hans",
  description: "Lighthouse 性能优化满分手册",
  themeConfig: {
    nav: [{ text: "🌰", link: "/" }],
    sidebar: [
      {
        text: "监控方案",
        items: [
          {
            text: "指标上报 SDK",
            link: "/guide",
          },
        ],
      },
      {
        text: "优化指南",
        // collapsed: true,
        items: [
          {
            text: "从系统工程的角度看待问题，而非简单套路",
            link: "/reassessing-fe-performance-ptimization",
          },
          {
            text: "深入 Lighthouse 的五大性能指标",
            link: "/understanding-lighthouse-10-five-key-metrics",
          },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/binghuis/lighthouse99" },
    ],
    editLink: {
      pattern: "https://github.com/binghuis/lighthouse99/edit/main/docs/:path",
      text: "在 GitHub 上编辑此页面",
    },
    footer: {
      message: "基于 MIT 许可发布",
      copyright: `版权所有 © 2019-${new Date().getFullYear()} 宋秉徽`,
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    outline: {
      label: "页面导航",
    },
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },
    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },
  lastUpdated: true,
});
