---
title: DropChar
author: 萧~
date: '2022-11-01'
---

### DropChar
[type-challenge-DropChar github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/02070-medium-drop-char/README.md)

难度：中等

#### 题目描述

Drop a specified char from a string.

>从字符串中去除指定字符

For example:
```
type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
```
🤔这道题的思路并不复杂，通过递归拼接即可

```
type DropChar<S, C> = S extends `${infer First}${infer Rest}`
  ? First extends C
    ? `${DropChar<Rest, C>}`
    : `${First}${DropChar<Rest, C>}`
  : '';

// 上面的代码可以简化成下面的形式
type DropChar<S, C> = S extends `${infer First}${infer Rest}`
  ? `${First extends C ? '' : First}${DropChar<Rest, C>}`
  : '';
```