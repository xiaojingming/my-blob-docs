---
title: Zip
author: 萧~
date: '2022-12-11'
---

### Zip
[type-challenge-Zip github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/04471-medium-zip/README.md)

难度：中等

#### 题目描述

In This Challenge, You should implement a type Zip<T, U>, T and U must be Tuple

>(实现```Zip<T, U>```，```T```和```U```都是元组类型实现类似解构的语法, 返回合并后的新数组)

For example:

```
type exp = Zip<[1, 2], [true, false]> // expected to be [[1, true], [2, false]]
```

这道题目与之前设计到计算的题目类似，我们都需要使用辅助参数用于进行计数，在这里我们还需要一个参数来保存结果，并通过扩展运算符来展开

```
type Zip<
  T extends any[],
  U extends any[],
  S extends 1[] = [],
  R extends any[] = [],
> = S['length'] extends T
  ? R
  : Zip<T, U, [1, ...S], [...R, [T[S['length']], U[S['length']]]]>
```

但是上面的Zip并不能满足测试用例```Zip<[1, 2, 3], ['1', '2']>```，我们需要在执行递归之前进一步判断U是否已经是最后一项，是的话直接返回R

```
type Zip<
  T extends any[],
  U extends any[],
  S extends 1[] = [],
  R extends any[] = [],
> = S['length'] extends T['length']
  ? R
  : S['length'] extends U['length']
    ? R
    : Zip<T, U, [1, ...S], [...R, [T[S['length']], U[S['length']]]]>;
```
这样就可以实现效果
