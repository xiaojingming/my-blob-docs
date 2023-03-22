---
title: TrimLeft
author: 萧~
date: '2023-2-17'
---

### TrimLeft

[type-challenge github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/00106-medium-trimleft/README.zh-CN.md)

Implement TrimLeft`<T>` which takes an exact string type and returns a new string with the whitespace beginning removed.

>(实现`TrimLeft<T>`，它接收一个字符串类型，并且返回删除了开头的空格的字符串)

For example:

```
type trimed = TrimLeft<'  Hello World  '> // 应推导出 'Hello World  '
```

我们可以先定义用于表示空格的类型（空格、制表符、换行符），然后通过递归就可以实现这样的功能

```
type NullType = ' ' | '\n' | '\t';
type TrimLeft<T extends string> = T extends `${NullType}${infer Rest}` ? TrimLeft<Rest> : T;
```