# 从系统工程的角度看待问题，而非简单套路

前端社区曾经流行过一套非常有名的性能优化指南，叫 [雅虎 35 条军规](https://developer.yahoo.com/performance/rules.html?guccounter=2&guce_referrer=aHR0cHM6Ly9saW5rLmp1ZWppbi5jbi8&guce_referrer_sig=AQAAABIG-sK7LvhBJGoQpmXlQ3F0k7BGe8SQLSFdnXV2p44uMadU0caOs9JvFbSQW8o5wil1Jt2HmQIMMNxDB3rplIY_q93YXslaLCEKqfaPcCn9_8YwHHWhXDnzRRIRZ8XjVv5u3cyo4ChUPbJjZ6hfRoQWBonSyGDtM3sxI7-E6txI#page-nav)。这份指南列举了非常多的可以提升网站性能的技巧。

你可以一条一条的执行它们，来改善你的网站。

这些年来，这套指南影响了很多人，很多前端开发人员到今天还认为网站的性能优化就是通过这样的套路来达成的。

但事实不是这样，在以 Chrome 为首的现代浏览器占据市场主流的今天，性能优化是一项非常系统的工程，那些套路已经不那么适用了。

目前各种前端框架被广泛使用，很多 “军规” 里面提到的性能优化技巧已经在框架层面解决了，开发者不需要把注意力再放在那些繁琐的，有些甚至已经过时的细节中。

建议开发者们用更高的视角，把性能优化看作一个工程，用一套可行的标准落地，与业务结合，快速解决日常开发中遇到的性能问题。

::: tip
本手册基于 Lighthouse 10，过时的性能指标除非必要，不会提及。
:::
