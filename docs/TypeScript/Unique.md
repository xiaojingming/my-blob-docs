---
title: Unique
author: 萧~
date: '2022-12-27'
---

### Unique

[type-challenge github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/05360-medium-unique/README.md)

难度：中等

#### 题目描述

Implement the type version of Lodash.uniq, Unique takes an Array T, returns the Array T without repeated values.

>(实现类型的```lodash.uniq```函数，接收一个数组并返回去重后的数组)

For example:

```
type Res = Unique<[1, 1, 2, 2, 3, 3]>;
// expected to be [1, 2, 3]
type Res1 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]>;
// expected to be [1, 2, 3, 4, 5, 6, 7]
type Res2 = Unique<[1, "a", 2, "b", 2, "a"]>;
// expected to be [1, "a", 2, "b"]
type Res3 = Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>;
// expected to be [string, number, 1, "a", 2, "b"]
type Res4 = Unique<[unknown, unknown, any, any, never, never]>;
// expected to be [unknown, any, never]
```

这道题目的思路并不复杂，我们定义第二个参数用于存储结果

```
type Unique<T extends any[], S extends any[] = []> = T extends [infer First, ...infer Rest]
  ? Include<S, First> extends true
    ? Unique<Rest, S>
    : Unique<Rest, [...S, First]>
  : S;
```

接下来就是实现这个```Include<T extends any[], U>```，用于判断T中是否包含类型```U```。

```
type Include<T extends any[], U> = T extends [infer First, ...infer Rest]
  ? IsEqual<First, U> extends true
    ? true
    : Include<Rest, U>
  : false
```

通过递归判断即可，其中```IsEqual```是之前实现过的泛型

```
type IsEqual<T, U> =
  (<K>() => K extends T ? true : false) extends (<K>() => K extends U ? true : false)
    ? true
    : false;
```

这样就可以实现这个功能啦。
