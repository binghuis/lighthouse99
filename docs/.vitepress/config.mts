import { defineConfig } from "vitepress";
import { SIDEBAR } from "./sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "💯",
  head: [["link", { rel: "icon", type: "image/png", href: "/favicon.png" }]],
  lang: "zh-Hans",
  description: "Lighthouse 性能优化满分手册",
  themeConfig: {
    nav: [{ text: "🌰", link: "/" }],
    sidebar: SIDEBAR,
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
  markdown: {
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  lastUpdated: true,
});
