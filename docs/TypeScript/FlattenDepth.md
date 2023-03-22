---
title: FlattenDepth
author: 萧~
date: '2022-11-22'
---

### FlattenDepth

[type-challenge-FlattenDepth github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/03243-medium-flattendepth/README.md)

难度：中等

#### 题目描述

Recursively flatten array up to depth times.

>(实现```FlattenDepth<T, N>```，根据参数```N```递归扁平数组```T```)

For example:
```
type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>
// [1, 2, 3, 4, [5]]. flattern 2 times
type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]>
// [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
```

😂又是不知道怎么做的一道题，与完全扁平不同，需要根据参数来判断扁平化的次数，首先我们先实现只扁平一次的函数：

```
type FlattenOnce<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends any[]
    ? [...First, ...FlattenOnce<Rest>]
    : [First, ...FlattenOnce<Rest>]
  : T

type A = FlattenOnce<[1, 2, [3, [4]]]> // [1, 2, 3, [4]]
```

接下来我们实现```FlattenDepth```，因为我们需要使用到```number```类型，通过数组```length```来获取，所以我们在```FlattenDepth```传递第三个参数（数组），用于记录当前次数，并通过和第二个参数进行比较，判断是否递归结束；如果当前次数与第二个参数不一致，将扁平化一次的数组作为第一个参数，递归执行```FlattenDepth```。

```
type FlattenDepth<T extends any[], N extends number = 1, Arr extends any[] = []> = Arr['length'] extends N
  ? T
  : FlattenDepth<FlattenOnce<T>, N, [...Arr, '']> // 这里的```''```主要是为了给数组增加一项内容，也可以使用别的进行替换
```

这样已经能实现功能了，不过在测试用例```<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>```会出现嵌套过深导致的无法判断类型，我们需要在每次执行先判断数组是否已经扁平化完成，扁平化完成则直接返回数组。

```
type FlattenDepth<T extends any[], N extends number = 1, Arr extends any[] = []> = FlattenOnce<T> extends T
 ? T
 : Arr['length'] extends N
  ? T
  : FlattenDepth<FlattenOnce<T>, N, [...Arr, '']>
```

大功告成🤣
