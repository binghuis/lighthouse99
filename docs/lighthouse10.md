# 深入 Lighthouse 10 五大性能指标

[Lighthouse](https://github.com/GoogleChrome/lighthouse) 是谷歌开源的自动化工具，它可以对网页进行全面的审查，并提供关于性能、无障碍功能、最佳做法和 SEO 这四个维度的评分和建议，基于 Lighthouse 的审查结果，开发者们可以对网站进行针对性的优化。

下图是在 Chrome DevTools 中使用 Lighthouse 分析 Google 首页生成的报告。

> Lighthouse 不仅可以在 Chrome DevTools 中使用，还支持 Node 模块和 CI/CD 集成。
> [了解更多用法](https://developer.chrome.com/docs/lighthouse/overview)

::: details 点击查看 Google 首页的 Lighthouse 报告。
<img src='./assets/lighthouse.png' />
:::

通过报告可以直观的看出，Google 首页的性能指标完美，最佳做法和 SEO 良好，而无障碍方面需要改进。

指标分数对应颜色与评价：

| 颜色 | 指标（分数） |     评价 |
| :--: | ------------ | -------: |
| 绿色 | 100          |     完美 |
| 绿色 | [90, 100)    |       好 |
| 橙色 | [50, 89)     | 需要改进 |
| 红色 | [0, 49)      |       差 |

由于当前我们的关注重点是网站性能，因此其余三个维度我们不继续探究。

观察报告里面的性能部分，可以看到有五个指标，它们才是接下来的重点。

**性能指标统计不支持 `iframe`，无论是否同源。**

| 指标 | 绿色 (好) |    橙色 (待改进)    | 红色 (差) |
| ---- | :-------: | :-----------------: | :-------: |
| TTFB |  ≤ 0.8s   | 0.8s < TTFB ≤ 1.8s  |  > 1.8s   |
| FCP  |  ≤ 1.8s   |   1.8s < FCP ≤ 3s   |   > 3s    |
| LCP  |  ≤ 2.5s   |   2.5s < LCP ≤ 4s   |   > 4s    |
| TBT  |  ≤ 200ms  | 200ms < TBT ≤ 600ms |  > 600ms  |
| INP  |  ≤ 200ms  | 200ms < INP ≤ 500ms |  > 500ms  |

SI

| 评价   |    指标（秒）    |
| ------ | :--------------: |
| 好     |      ≤ 3.4       |
| 待改进 | 3.4 < 用时 ≤ 5.8 |
| 差     |      > 5.8       |
