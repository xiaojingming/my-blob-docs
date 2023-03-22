---
title: Reverse
author: 萧~
date: '2022-11-20'
---

### Reverse

[type-challenge-Reverse github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/03192-medium-reverse/README.zh-CN.md)

难度：中等

#### 题目描述

Implement the type version of Array.reverse

>(实现类型的Array.reverse函数)

For example:

```
type a = Reverse<['a', 'b']> // ['b', 'a']
type b = Reverse<['a', 'b', 'c']> // ['c', 'b', 'a']
```

通过递归和扩展运算符即可实现

```
type Reverse<T extends any[]> = T extends [...infer Rest, infer Last] ? [Last, ...Reverse<Rest>] : T;
```