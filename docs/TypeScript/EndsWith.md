---
title: EndsWith
author: 萧~
date: '2022-11-07'
---

### EndsWith

[type-challenge-endsWith github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/02693-medium-endswith/README.md)

难度：中等

### 题目描述

Implement EndsWith<T, U> which takes two exact string types and returns whether T ends with U

>(实现```EndsWith<T, U>```，接收两个类型都是string的参数，判断```T```是否以```U```结尾)

For example:
```
type a = EndsWith<'abc', 'bc'> // expected to be true
type b = EndsWith<'abc', 'abc'> // expected to be true
type c = EndsWith<'abc', 'd'> // expected to be false
```
这道题的思路和[startsWith](./StartsWith.md)的思路是一致的，不过在这用一种简单的实现方式。

```
type EndsWith<T extends string, U extends string> = T extends `${string}${U} ? true : false;
```
🤔确实比用递归好多了