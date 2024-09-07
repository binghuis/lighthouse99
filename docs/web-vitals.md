# 从了解 Google 网页指标（Web Vitals）计划开始

:::tip
本文是本系列第一篇文章，旨在让大家对性能优化的一些指标和 API 做一个大致的了解，重要的部分后续会展开细讲，所以本文大致阅览即可，不必细究。
:::

Web Vitals（网页指标）是 Google 推出的一套用于衡量网页用户体验的标准，旨在帮助开发者优化网站，提供更好的用户体验。

目前网页指标里面最重要且稳定的三个被称为 **核心网络指标**（Core Web Vitals），它们是：

**LCP** 最大内容绘制、**INP** 下次绘制交互以及 **CLS** 累计布局偏移，这三个指标分别衡量了页面的 _加载性能_、*互动性*以及*视觉稳定性*。

核心网页指标还影响着网页在 Google 中的搜索排名，[了解 Google 搜索结果中的网页体验](https://developers.google.com/search/docs/appearance/page-experience?hl=zh-cn#ranking-signal)。

除了核心网络指标，其余的指标也非常重要，它们是：

**TTFB** 首字节到达时间、**FCP** 首次内容绘制和 **TBT** 总阻塞时间。

通过这些指标，你可以更加了解你的网站，哪里做的好，哪里还需要改进。因此持续提升网站的用户体验对于 SEO 和网站的留存都是非常必要的。

## 浏览器性能 API

[Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API) 是一组用于获取网页指标性能条目的 Web API。

性能条目是一个 [PerformanceEntry](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry) 类型的对象，表示一条指标性能数据。

尽管 `PerformanceEntry` 提供了一些通用的属性和方法来获取性能数据，但是不同类型的性能数据（如资源加载、页面导航、用户交互等）具有不同的特性和需求，因此需要更具体的子类来表示这些数据，实际上所有的网页指标都基于 `PerformanceEntry` 基类实现了自己的子类。

举个例子，通过方法 `getEntriesByName` 获取 FCP 的性能条目：

```js
performance.getEntriesByName("first-contentful-paint");
```

这将会得到一组 `PerformancePaintTiming` 类型的 FCP 性能条目。`PerformancePaintTiming` 就是 `PerformanceEntry` 基类的子类。

::: details 展开查看 FCP 性能条目 `PerformancePaintTiming` 的数据结构。

```js
[
  // 尽管 PerformancePaintTiming 扩展自 PerformanceEntry，但它们的结构一致。
  {
    duration: 0;
    entryType: "paint"; // FCP 性能条目的类型是 paint。
    name: "first-contentful-paint";
    startTime: 336.40000000596046;
  }
]
```

:::

除了方法 `getEntriesByName`，`getEntries` 和 `getEntriesByType` 也可以获取一组指标性能条目。

下面获取一组资源加载类型的性能条目，`PerformanceResourceTiming` 是资源加载类型的性能条目子类，同样继承自 `PerformanceEntry`。

**所有的性能条目类型都继承自 `PerformanceEntry` 基类，这一点后续不再重复。**

```js
performance.getEntriesByType("resource");
```

> 了解性能条目都有哪些 [性能条目类型（`entryType`）](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry/entryType)。

`PerformanceResourceTiming` 性能条目的结构相比于 `PerformanceEntry`，扩展了非常多的属性，这些属性后面我们都会再次遇到，结构如下：

::: details 展开查看资源加载的性能条目 `PerformanceResourceTiming` 的数据结构。

```js
[
  // 这是一张本地图片资源加载的性能条目。
  {
    connectEnd: 187.2999999821186;
    connectStart: 187.2999999821186;
    decodedBodySize: 61882;
    deliveryType: "";
    domainLookupEnd: 187.2999999821186;
    domainLookupStart: 187.2999999821186;
    duration: 14.700000017881393;
    encodedBodySize: 61882;
    entryType: "resource"; // 资源加载性能条目的类型是 resource。
    fetchStart: 187.2999999821186;
    firstInterimResponseStart: 0;
    initiatorType: "img";
    name: "http://localhost:5174/sea.png";
    nextHopProtocol: "http/1.1";
    redirectEnd: 0;
    redirectStart: 0;
    renderBlockingStatus: "non-blocking";
    requestStart: 189.59999999403954;
    responseEnd: 202;
    responseStart: 201;
    responseStatus: 200;
    secureConnectionStart: 0;
    serverTiming: [];
    startTime: 187.2999999821186;
    transferSize: 62182;
    workerStart: 0;
  }
]
```

:::

## PerformanceObserver

尽管 `getEntries`、`getEntriesByName` 和 `getEntriesByType` 这三个方法都能获取指标性能条目。但它们有两个问题。

1. 只能获取方法被调用时已生成的性能条目，如果它们被调用时性能条目还没有生成那就无法获取。
2. 无法获取条目类型（`entryType`）是 _element_、_event_、_largest-contentful-paint_、_layout-shift_、_longtask_ 的性能条目。这直接导致了部分核心性能指标数据无法访问，比如 LCP（受 _largest-contentful-paint_ 影响） 和 CLS（受 _layout-shift_ 影响）。

要获取这些指标就需要使用 API [`PerformanceObserver`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)。

用 `PerformanceObserver` 获取 LCP 指标条目的代码如下：

```js
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log("LCP candidate:", entry.startTime, entry);
  }
}).observe({ type: "largest-contentful-paint", buffered: true });
```

## JS 库 web-vitals

现在你已经知道了如何使用不同的 Web API 去获取性能指标数据。

但由于这些 API 计算指标的方式很多时候并不符合真实场景的需求，因此如果你要使用原生性能 API 去开发指标上报 SDK 就需要去抹平这些差异。而且很多时候基于对浏览器的了解和相关经验，这非常困难。

> 指标计算方式具体差异看这里：[指标与 API 之间的区别](https://web.dev/articles/lcp?hl=zh-cn#differences-metric-api)。

好在很多事情 Chrome 团队已经为我们解决了，通过开源包 [web-vitals](https://github.com/GoogleChrome/web-vitals)。

它使用起来非常简单：

```js
import { onLCP, onINP, onCLS } from "web-vitals";

onCLS(console.log);
onINP(console.log);
onLCP(console.log);
```

因此基于 web-vitals 开发指标上报 SDK 是非常好的选择。

但 web-vitals 也不是万能的，它不支持 iframe 的指标获取，同源的也不行。因此如果有 iframe 指标收集的需求就需要我们独立解决了。

## 总结

本文介绍了 Google 的网页指标计划和如何使用原生性能 API 去获取指标性能条目。同时指出了使用原生性能 API 获取指标性能数据的弊端，最后推荐在开发指标上报 SDK 的时候使用 web-vitals JS 库。
