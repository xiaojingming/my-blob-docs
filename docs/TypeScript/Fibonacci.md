---
title: Fibonacci
author: 萧~
date: '2022-12-02'
---

### Fibonacci
[type-challenge-Fibonacci github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/04182-medium-fibonacci-sequence/README.zh-CN.md)

难度：中等

#### 题目描述

Implement a generic Fibonacci<T> takes an number T and returns it's corresponding Fibonacci number.

The sequence starts: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

>(实现类型的斐波那契数列，数列为：1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...)

首先我们先用```ts```实现斐波那契数列：

```
function fibonacci(n: number): number {
  if (n < 2) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

```n > 2```的情况下等于前两项相加的和。

接着我们通过类型来实现，因为设计到数字计算，需要通过```length```来实现。首先我们定义一个函数，定义第一个参数```N```用于表示要计算到第几项的合，第二个参数```S```用于累加次数，当次数达到```N```时退出循环。

```
type Fibonacci<N extends number, S extends 1[] = [1]> = S['length'] extends N
  ? xxxx
  : Fibonacci<N, [...S, 1]>;
```
这样我们就可以实现累加及退出循环的功能，同样我们使用第三个参数```Cur```用于存储下个数的结果，第四个参数```Prev```用于存储结果

```
type Fibonacci<
  N extends number,
  S extends 1[] = [1],
  Cur extends 1[] = [1],
  Prev extends 1[] = [1],
> = S['length'] extends N
  ? Prev['length']
  : Fibonacci<N, [...S, 1], [...Cur, ...Prev], Cur>;
```

这样就可以实现类型的斐波那契数列啦。
