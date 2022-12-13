---
title: Chunk
author: 萧~
date: '2022-12-13'
---

### Chunk
[type-challenge-Chunk github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/04499-medium-chunk/README.md)

难度：中等

#### 题目描述

Do you know lodash? Chunk is a very useful function in it, now let's implement it. Chunk<T, N> accepts two required type parameters, the T must be a tuple, and the N must be an integer >=1

>(实现```lodash```的```Chunk```函数)

For example:

```
type exp1 = Chunk<[1, 2, 3], 2> // expected to be [[1, 2], [3]]
type exp2 = Chunk<[1, 2, 3], 4> // expected to be [[1, 2, 3]]
type exp3 = Chunk<[1, 2, 3], 1> // expected to be [[1], [2], [3]]
```

```
type Chunk<
  T extends any[],
  K extends number,
  R extends any[] = [],
> = T extends [infer First, ...infer Others]
  ? xxx
  : [R];
```

在```Chunk```中加入了第三个参数```T```用于保每一次执行的结果，```T```每次循环都会减少第一项，当```T```为空的时候，即代表顺换结束，返回```[R]```，接下来就是如何实现这样的一个循环。
接下来我们通过```R['length']```来判断是否截取完毕，如果没有截取完毕，递归执行```Chunk```，将```Others```作为```Chunk```第一个参数传递，其中```R```需要将上一次的```R```和```First```第一项加入

```
type Chunk<
  T extends any[],
  K extends number,
  R extends any[] = [],
> = T extends [infer First, ...infer Others]
  ? R['length'] extends K
    ? xxx
    : Chunk<Others, K, [...R, First]>
  : [R];
```

然后就是处理截取完毕的情况，将截取完成的```R```返回，并继续递归剩余的部分，最后通过扩展运算符展开即可

```
type Chunk<
  T extends any[],
  K extends number,
  R extends any[] = [],
> = T extends [infer First, ...infer Others]
  ? R['length'] extends K
    ? [R, ...Chunk<T, K>]
    : Chunk<Others, K, [...R, First]>
  : [R];
```

😥感觉还是不太好理解的
