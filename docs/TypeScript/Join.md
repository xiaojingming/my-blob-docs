---
title: Join
author: 萧~
date: '2022-12-21'
---

### Join

[type-challenge github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/05310-medium-join/README.md)

难度：中等

#### 题目描述

Implement the type version of Array.join, Join<T, U> takes an Array T, string or number U and returns the Array T with U stitching up.

>(实现类型```Array.join```函数)

For example:

```
type Res = Join<['a', 'p', 'p', 'l', 'e'], '-'>; // expected to be 'a-p-p-l-e'
type Res1 = Join<['Hello', 'World'], ' '>; // expected to be 'Hello World'
type Res2 = Join<['2', '2', '2'], 1>; // expected to be '21212'
type Res3 = Join<['o'], 'u'>; // expected to be 'o'
```

这道题的思路并不复杂，我们使用第三个参数```S```来记录上一次的结果，并通过递归累加之前的结果，最后一次执行不添加```U```

```
type Join<T extends any[], U extends string | number, S extends string = ''> = T extends [infer First, ...infer Rest]
  ? Join<Rest, U, `${S}${Extract<First, string>}${Rest['length'] extends 0 ? '' : U}`>
  : S
```