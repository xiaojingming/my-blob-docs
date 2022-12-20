---
title: Trunc
author: 萧~
date: '2022-12-20'
---

### Trunc

[type-challenge github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/05140-medium-trunc/README.md)

难度：中等

#### 题目描述

Implement the type version of Math.trunc, which takes string or number and returns the integer part of a number by removing any fractional digits.

>(实现类型的```Math.trunc```函数，接收一个数字或字符串类型的参数)

For example:

```
type A = Trunc<12.34> // 12
```

这道题如果只传递字符串类型的参数，我们则可以使用模板字符串来直接匹配。所以，这道题目的关键在于如何将```number```类型转化为```string```

```
type ToString<T extends number | string> = T extends string ? T : `${T}`; 
```

接下来通过字符串模板即可实现

```
type Trunc<T extends number | string> = ToString<T> extends `${infer L}.${infer R}`
  ? L
  : `${T}`
```
