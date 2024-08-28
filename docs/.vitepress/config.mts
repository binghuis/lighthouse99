import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "💯",
  description: "Lighthouse 性能优化满分手册",
  themeConfig: {
    nav: [{ text: "🌰", link: "/" }],

    sidebar: [
      {
        text: "指标上报 SDK",
        items: [
          {
            text: "开始使用",
            link: "/getting-started",
          },
        ],
      },
      {
        text: "优化指南",
        collapsed: true,
        items: [
          {
            text: "性能优化是一项系统的工程，不是简单的套路",
            link: "/reassessing-fe-performance-ptimization",
          },
          {
            text: "使用 Lighthouse 10 的五个指标评估网站性能",
            link: "/understanding-lighthouse-10-five-key-metrics",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/binghuis/lighthouse99" },
    ],
  },
});
