---
title: LastIndexOf
author: 萧~
date: '2022-12-26'
---

### LastIndexOf

[type-challenge github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/05317-medium-lastindexof/README.md)

难度：中等

#### 题目描述

Implement the type version of Array.lastIndexOf, ```LastIndexOf<T, U>``` takes an Array T, any U and returns the index of the last U in Array 

>(实现类型的Array.lastIndexOf函数)

For example:

```
type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
type Res2 = LastIndexOf<[0, 0, 0], 2> // -1
```

这道题与之前的[indexOf](./IndexOf.md)在逻辑上并没有太大的区别，主要的区别在于获取索引

```
type LastIndexOf<T extends any[], K extends any> = T extends [...infer Rest, infer Last]
  ? IsEqual<Last, K> extends true
    ? Rest['length']
    : LastIndexOf<Rest, K>
  : -1；
```

我们发现，其实```Rest[length]```就是当前倒叙索引，而```IsEqual```则是之前在```IndexOf```中定义过的泛型

```
type IsEqual<T, K> =
  (<U>() => U extends T ? true : false) extends (<U>() => U extends K ? true : false)
    ? true
    : false;
```