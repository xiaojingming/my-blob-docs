---
title: Shift
author: 萧~
date: '2022-11-16'
---

### Shift

[type-challenge-shift github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/03062-medium-shift/README.md)

难度：中等

#### 题目描述

Implement the type version of ```Array.shift```

>(实现类型的Array.shift函数)

For example:

```
type Result = Shift<[3, 2, 1]> // [2, 1]
```

这道题只需要通过扩展运算符配合infer将数组类型区分出一个类型即可

```
type Shift<T extends any[]> = T extends [infer First, ...infer Rest] ? Rest : []
```