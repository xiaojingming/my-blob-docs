---
title: 声明方式
author: 萧~
date: '2022-03-20'
---

### let声明方式

在es5及之前是使用var（variable）声明变量

```
var a = 1 // 当前作用域声明变量
b = 2  // 变量的赋值（window.b的赋值）
```

#### 总结

使用let声明变量：

-   不属于顶层对象window
-   不允许重复声明
-   不存在变量提升
-   暂时性死区
-   块级作用域
