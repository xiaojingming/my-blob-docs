---
title: Without
author: 萧~
date: '2022-12-19'
---

### Without

[type-challenge github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/05117-medium-without/README.zh-CN.md)

难度：中等

#### 题目描述

Implement the type version of Lodash.without, ```Without<T, U>``` takes an Array T, number or array U and returns an Array without the elements of U.

>(实现一个像 Lodash.without 函数一样的泛型 Without<T, U>，它接收数组类型的 T 和数字或数组类型的 U 为参数，会返回一个去除 U 中元素的数组 T。)

For example:

```
type Res = Without<[1, 2], 1>; // expected to be [2]
type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []
```

这道题需要通过递归来实现，一开始在做这道题的时候，先去判断第二个参数是不是数组，然后进行了比较长的判断（最后还没实现😥），然后在查找答案的时候发现了一种解题思路，当第二个参数是```number```时，不需要进行特殊处理，而当第二个参数时```number[]```时，我们将其转化成为联合类型，通过联合类型进行判断就会简单很多。首先我们实现获取联合类型的泛型

```
type GetUnion<T> = T extends any[] ? T[number] : T;
```

接着我们来实现这个```Without```泛型，依次对```T```的每一项进行判断，判断联合类型是否包含这一项

```
type Without<T extends number[], K extends number | number[]> = T extends [infer F, ...infer Rest]
  ? F extends GetUnion<K>
    ? Without<Rest, K>
    : [F, ...Without<Rest, K>]
  : [];
```

这样就可以实现啦。
