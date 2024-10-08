# 深入了解 Web Vitals 所有指标

先看一张图，这张图在本文非常重要。它与两个性能 API 有关。

![页面加载过程](./assets/performance-navigation-timing-timestamp-diagram.svg)

- 资源计时 API [`Resource Timing API`](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Resource_timing) 对应指标性能条目 [`PerformanceResourceTiming`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming) 的创建。

  性能条目 `PerformanceResourceTiming` 与网络事件有关，比如 fetch 请求和 SVG、image、script 等资源加载。

  `PerformanceResourceTiming` 是性能条目基类 `PerformanceEntry` 的子类。

- 导航计时 API [`Navigation Timing API`](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Navigation_timing) 对应指标性能条目 [`PerformanceNavigationTiming`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming) 的创建。

  性能条目 `PerformanceNavigationTiming` 与页面导航事件有关，页面的重载（`reload`）、跳转（`navigate`）都属于页面的导航事件，也就是说访问网页即触发页面导航事件。非常典型的一个性能指标 TTFB，它的指标条目就是 `PerformanceNavigationTiming` 类型的。

  `PerformanceNavigationTiming` 是 `PerformanceResourceTiming` 的子类。

**也就是说这张图即表示资源的加载过程也表示网页的导航过程，不过资源加载过程是时间戳`startTime` 到 `responseEnd`，也就是 _Resource Timing_。**

由于页面导航事件更加复杂并且包含资源加载过程，因此下面以页面导航过程为例介绍几个重要时间戳。

**`startTime`：** 页面导航事件开始的时间戳。在浏览器中输入网址并按下回车，或在页面内点击链接触发跳转，都会启动页面导航，_注意纯前端路由跳转并不触发页面导航事件_。

**`responsestart`：** 页面请求开始返回时的时间戳，此时页面开始响应，标志是页面接收到第一个字节。

**`firstInterimResponsestart`：** 图中状态码 `103` 代表 `Early Hints` 「提前提示」响应，服务器在正式通过状态码 `200` 返回页面 HTML 之前，通过 `103` 可以提前告诉浏览器需要哪些资源，浏览器收到 `103` 响应之后可以提前下载这些资源。`firstInterimResponsestart` 记录的是页面请求「提前提示」响应开始时的时间戳。

> - [出于兼容性和安全原因，建议仅通过 HTTP/2 或更高版本发送 HTTP 103 Early Hints 响应](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103#browser_compatibility)。
> - [社区关于 103 状态码浏览器支持现状的测试](https://github.com/mdn/browser-compat-data/pull/24001)。

在熟悉了页面导航和资源加载过程之后，下面开始详细的介绍各个网页性能指标。

## 首字节到达时间 TTFB

[首字节到达时间（Time to First Byte）](https://web.dev/articles/ttfb) 衡量的是从页面导航开始到页面响应开始（浏览器接收到第一个字节）所用的时间。

当页面请求支持 103 「提前提示」 响应，TTFB 是 `startTime` - `firstInterimResponsestart`，否则 TTFB 是 `startTime` - `responsestart`。如开篇图所示，这期间涉及到页面重定向、Service Worker 处理、HTTP 缓存处理、DNS 寻址、TCP 连接等多个过程。

TTFB 代表了服务器响应速度和网络连接效率。

> 客户端渲染的 TTFB 通常比服务端渲染的 TTFB 要快。详细介绍看我之前写的 [深入了解 Next.js 中 CSR、SSR、SSG、ISR 四种前端渲染方式](https://binghuis.vercel.app/posts/dive-into-csr-ssr-ssg-isr/)。

## 首次内容绘制 FCP

[首次内容绘制（First Contentful Paint）](https://web.dev/articles/fcp) 衡量的是从页面导航开始到页面有实际内容渲染出来所用的时间。

实际内容指的是文本、图片（包括背景图）、`svg` 及 `canvas` 元素（Google 文档写的是非白色 `canvas`，但是我实际测试，白色、黑色甚至透明的 `canvas` 元素都能被 FCP 统计）。

它标志着用户体验中的一个关键点，即页面不再是空白，用户开始看到页面内容。

> **服务端渲染的 FCP 比客户端渲染的 FCP 快。** 因为 SSR 和 CSR 都要处理数据、构建页面，只不过一个发生在服务器一个发生在浏览器。SSR 在服务器上直接构建页面并返回结构完整的 HTML。但由于 CSR 需要通过 JS 在浏览器构建页面，因此需要从服务器获取大量的 JS chunks，这些 JS 文件的加载需要很多时间，导致 CSR 的第一个内容的渲染晚于 SSR。
>
> 详细介绍看我之前写的 [深入了解 Next.js 中 CSR、SSR、SSG、ISR 四种前端渲染方式](https://binghuis.vercel.app/posts/dive-into-csr-ssr-ssg-isr/)。

## 最大内容绘制 LCP

[最大内容绘制（Largest Contentful Paint）](https://web.dev/articles/lcp) 衡量的是从页面导航开始到到页面最显著的（最大的）内容渲染出来所用的时间。

LCP 是衡量页面加载性能的一个核心网页指标，它关注页面上对用户而言最具视觉重要性的内容何时完成渲染。

现代浏览器的首屏加载速度就是用 LCP 衡量的。

**最大内容** 指的是页面中可见的最大图片、文本块或视频，其必须包含有价值的信息，以确保对用户具有实际意义。

举个例子，占位图等低熵图片通常包含大量相同或相似的像素区域，颜色单一且缺乏细节，无法提供有价值信息，因而不会被计入 LCP 统计。

> 从 2023 年 8 月之后的 Chrome 116 开始，动态图（PNG、GIF）和无封面视频也被纳入 LCP 统计，LCP 时间戳取它们第一帧呈现时间。
> 而带封面的视频，LCP 时间戳则取封面和第一帧呈现时间的较早达到者。详情查看 [官方说明](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/speed/metrics_changelog/2023_08_lcp.md)。

::: tip
**低熵图片：** 指的是那些在视觉上包含信息量较少的图像。

低熵图片不满足 LCP 的候选条件，但满足 FCP 的条件，因为 FCP 统计的是任何可见元素，不管它是否包含有效内容。
:::

### 最大内容的尺寸

### 跨域资源的处理

出于安全考虑，对于要在页面上呈现的跨域资源（比如网络图片），资源响应头 `Timing-Allow-Origin` 必须设置有效源，浏览器才能获取资源的渲染时间戳（`renderTime`），时间戳若无法被获取将被设为 0，所以可能会出现 LCP 比 FCP 还快的诡异现象。web-vitals 的处理方式是直接忽视那些无权访问的跨域资源。

<img src='./assets/local-lcp.png' width='360px' >

### LCP 性能条目的创建时机

在页面渲染过程中，新的元素不断呈现给用户，这会导致最大内容可能会不断变化，初始渲染时确定的最大内容不断被后续渲染的新内容所替代。

每次确定最大内容，浏览器都会创建一个 LCP 性能条目。LCP 性能条目是一个 `entryType` 为 `largest-contentful-paint` 的 [`LargestContentfulPaint`](https://developer.mozilla.org/en-US/docs/Web/API/LargestContentfulPaint) 对象。

只要用户开始与页面进行交互（当鼠标、键盘事件发生），LCP 监测会立即停止，不再创建新的 LCP 条目。

如果页面在后台标签中打开，只有在用户切换到该标签页时，才会创建 LCP 条目。如果在用户切换时页面已完成加载，则整个 LCP 过程都不会被监测。

> 即使从视口或 DOM 中移除最大的内容元素，只要没有呈现更大的元素，它仍然被视为最大的内容元素。这种机制在图片轮播等场景中尤为适用。

::: details 点击查看多个 LCP 条目的创建。

三个色块按照从小到大的顺序依次渲染，在这个过程中页面最大内容不断变化，因此创建了不止一个 LCP 条目。

[点击查看色块页面源代码](https://gist.github.com/binghuis/0142b10a82ff4f199ee4dc8eec9fd186)。

<img src='./assets/lcp-block.png'>

---

<img src='./assets/md-performanceentry.png'>

---

<img src='./assets/lg-performanceentry.png'>
:::

## 下次绘制交互时间 INP

[下次绘制交互时间（Interaction to Next Paint）](https://web.dev/articles/inp) 衡量的是整个页面使用期间用户所有交互中最长的响应延迟。

为减少异常值对统计结果的影响，每 50 次交互中，系统会忽略耗时最长的一次操作。

INP 是衡量页面交互性的一个核心网页指标，它关注的是用户与页面交互的响应速度。

INP 统计的用户交互主要包括：点击事件、轻触事件（移动设备）、按键事件。鼠标悬停、滚轮滚动、触屏滑动、页面缩放等操作不计入 INP 的统计。

一个交互包含多个事件阶段，所有阶段持续时间中的最大值作为该次交互的 INP 值。

下图是一张官方示意图，展示了一个鼠标点击操作包含了多个事件：第一阶段触发了 `mousedown`，第二阶段触发了 `pointerup` 和 `click`。INP 会获取每个阶段从用户输入开始到下一次绘制的时间，并取最大值作为该次交互的 INP 值。

<img src='./assets/a-depiction-more-complex.svg'>

下面测试鼠标点击操作触发的所有事件并验证 INP 的值。

::: details 点击查看验证结果。
一个鼠标点击操作触发了两个阶段：

- 第一阶段的事件是 `pointdown`、`mousedown`，持续时间是 528ms。
- 第二阶段的事件是 `pointup`、`mouseup`、`click`，持续时间是 512ms。

INP 取两个阶段中最大的事件响应延迟，因此 INP 的值是 528。

下面用 web-vitals 的 `onINP` 方法验证：

<img src='./assets/web-vitals-inp.png' width='480px' >

---

鼠标点击交互触发的所有事件：
<img src='./assets/inp.png'>

:::

## 总阻塞时间 TBT

[总阻塞时间（Total Blocking Time）](https://web.dev/articles/tbt) 衡量的是页面从首次内容绘制（FCP）到达到完全可交互（TTI）状态，主线程被阻塞的时间总和。

执行时间超过 50ms 的任务就是长任务，一个长任务执行超出 50ms 的时间部分就是任务阻塞时间，所有长任务的阻塞时间总和就是 TBT。

> TBT 与 INP 一个代表网页加载过程中的可交互性，一个代表网页使用过程中的可交互性。

[TTI（Time to Interactive）可交互时间](https://web.dev/articles/tti) 是一个在 Lighthouse 10 中已经被废弃的指标，它衡量的是页面达到完全可交互状态的所用的时间，代表了页面加载过程中的阻塞情况。

_完全可交互状态_ 指的是，页面已完成 FCP 首次内容绘制，大多数可见页面元素都已注册事件处理脚本并且在 50ms 内可以响应用户交互。

<img src='./assets/a-page-load-timeline-show.svg' width='560px'>

图片表示的是 TTI 的计算过程：

_安静窗口：没有长任务且不超过两个正在进行的 GET 请求。_

1. 从 FCP 开始向前查找至少 5s 的安静窗口。
2. 从安静窗口再向后查找长任务，如果找到了长任务那么长任务的结束时间戳就是 TTI。
3. 如果找不到长任务，那么会一直找到 FCP，FCP 时间戳就是 TTI。

**为什么 TTI 被废弃了？**

这个是对此的官方解释 [How does TBT relate to TTI?](https://web.dev/articles/tbt#how_does_tbt_relate_to_tti)。

这里面提到两个关键点：

1. 统计 TBT 的结束时间点不一定是 TTI，Lighthouse 时间跨度模式下，页面加载完 TBT 仍可以继续统计。
2. TTI 无法真实表示页面加载过程中的阻塞情况，因为 TTI 对长任务非常敏感。

   比如在 10s 内分布 3 个 51ms 的长任务，它的 TTI 和 10s 内只有一个 9.5s 的长任务的 TTI 几乎是一样的。但是我们知道一个 9s 的任务阻塞有多让人绝望。TBT 作为阻塞总时长的指标，可以很好的表示这一点，TBT 3ms 和 900ms 一眼就能看出来页面加载中的阻塞情况。

**TTI 和 TBT 衡量的都是页面加载过程中的阻塞情况，但是 TBT 的计算方式更合 因此 TBT 取代 TTI 作为衡量页面加载过程中阻塞情况的新指标。**

## 累计布局偏移 CLS

[累计布局偏移（Cumulative Layout Shift）](https://web.dev/articles/cls) 用于衡量视觉稳定性，表示用户遇到意外布局偏移的频率。

当视口中的可见元素在两个渲染帧之间更改其起始位置时，就发生了布局偏移，这些元素被称为不稳定元素。

在一个会话窗口内，所有布局偏移分数的总和即为最大突发布局偏移。会话窗口的计算从首次发生布局偏移时开始，且相邻布局偏移之间的时间间隔不超过 1s，整个窗口的最长持续时间为 5s。会话窗口之间的时间间隔为 1s 及以上。以下图为例，图中共有三个绘画窗口，蓝色柱子是布局移位分数。

<img src='./assets/cls.png' width='360px' />

[尽可能减少布局偏移指南](https://developers.google.com/publisher-tag/guides/minimize-layout-shift)

[youtube CLS 的介绍](https://www.youtube.com/watch?v=zIJuY-JCjqw)

## 自定义指标
