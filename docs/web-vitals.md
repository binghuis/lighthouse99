# 从了解 Google 网页指标（Web Vitals）计划开始

:::tip
本文是本系列第一篇文章，旨在让大家对性能优化的一些指标和 API 做一个大致的了解，重要的部分后续会展开细讲，所以本文大致阅览即可，不必细究。
:::

Web Vitals（网页指标）是 Google 推出的一套用于衡量网页用户体验的标准，旨在帮助开发者优化网站，提供更好的用户体验。

目前网页指标里面最重要且稳定的三个被称为 **核心网络指标**（Core Web Vitals），它们是：

**LCP** 最大内容绘制、**INP** 下次绘制交互、**CLS** 累计布局偏移，这三个指标分别衡量了页面的 _加载性能_、_互动性_、_视觉稳定性_。

核心网页指标还影响着网页在 Google 中的搜索排名，[了解 Google 搜索结果中的网页体验](https://developers.google.com/search/docs/appearance/page-experience?hl=zh-cn#ranking-signal)。

除了核心网络指标，其余的指标也非常重要，它们是：

**TTFB** 首字节到达时间、**FCP** 首次内容绘制、**TBT** 总阻塞时间。

通过这些指标，你可以更加了解你的网站，哪里做的好哪里做的还需要改进，持续提升网站的用户体验对于 SEO 和网站的留存都是非常必要的。

## 浏览器性能 API

[Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API) 是一组用于获取网页指标性能条目的 Web APIs。

性能条目是一个 [PerformanceEntry](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry) 类型的对象，表示一条指标性能数据。

尽管 `PerformanceEntry` 提供了一些通用的属性和方法来访问性能数据，但是不同类型的性能数据（如资源加载、页面导航、用户交互等）具有不同的特性和需求，因此需要更具体的子类来表示这些数据，实际上所有的网页指标都基于 `PerformanceEntry` 基类实现了自己的子类。

现在通过方法 `performance.getEntriesByName("first-contentful-paint")` 获取 FCP 的性能条目，打印结果如下：

::: details 展开查看 FCP 性能条目 `PerformancePaintTiming`。

```js
[
  { // FCP 性能条目是一个 PerformancePaintTiming 类型的对象。
    // PerformancePaintTiming 就是 PerformanceEntry 的子类。
    // 尽管 PerformancePaintTiming 扩展自 PerformanceEntry，但它们的结构一致。
    duration: 0;
    entryType: "paint"; // FCP 性能条目的类型是 paint。
    name: "first-contentful-paint";
    startTime: 336.40000000596046;
  }
]
```

:::

除了 `getEntriesByName`，`performance.getEntries` 和 `performance.getEntriesByType` 都可以获取一组指标性能条目。

> 了解性能条目都有哪些 [性能条目类型（`entryType`）](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry/entryType)。

下面通过 `performance.getEntriesByType("resource")` 获取一组资源加载类型的性能条目，`PerformanceResourceTiming` 是资源加载类型的性能条目子类，同样扩展自 `PerformanceEntry` 基类。

**所有的性能条目类型都继承自 `PerformanceEntry` 基类，这一点后续不再重复。**

```js
performance.getEntriesByType("resource");
```

`PerformanceResourceTiming` 性能条目的结构相比于 `PerformanceEntry`，扩展了非常多的属性，这些属性后面我们都会再次遇到，结构如下：

::: details 展开查看资源加载的性能条目 `PerformanceResourceTiming`。

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

尽管 `performance.getEntries`、`getEntriesByName` 和 `performance.getEntriesByType` 这三个方法都能获取指标性能条目。但却有非常大的弊端。

1. 它们只能获取方法被调用时已存在的性能条目。
2.
