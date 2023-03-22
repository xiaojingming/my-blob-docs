---
title: IndexOf
author: 萧~
date: '2022-12-20'
---

### IndexOf

[type-challenge github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/05153-medium-indexof/README.md)

难度：中等

#### 题目描述

Implement the type version of Array.indexOf, ```indexOf<T, U>``` takes an Array T, any U and returns the index of the first U in Array T.

>(实现类型的```Array.indexOf```函数)

For example:

```
type Res = IndexOf<[1, 2, 3], 2>; // expected to be 1
type Res1 = IndexOf<[2,6, 3,8,4,1,7, 3,9], 3>; // expected to be 2
type Res2 = IndexOf<[0, 0, 0], 2>; // expected to be -1
```

我们使用第三个参数```S```来记录当前索引

```
type IndexOf<T extends any[], K, S extends 0[] = []> = T extends [infer F, ...infer R]
  ? F extends K
    ? S['length']
    : IndexOf<R, K, [...S, 0]>
  : -1
```

但是```<IndexOf<[string, 1, number, 'a'], number>```无法通过，我们需要进一步判断两个类型是否相等，我们定义```IsEqual<T, K>```。

```
type IsEqual<T, K> = (<U>() => U extends T ? 1 : 0) extends (<U>() => U extends K ? 1 : 0) ? true : false;
```

[这个是对应的github链接🤣](https://github.com/microsoft/TypeScript/issues/27024)，写不出这个```IsEqual```泛型😫

通过```IsEqual```我们可以对```IndexOf```进行优化

```
type IndexOf<T extends any[], K, S extends 0[] = []> = T extends [infer F, ...infer Rest]
  ? IsEqual<F, K> extends true
    ? S['length']
    : IndexOf<Rest, K, [...S, 0]>
  : -1;
```
