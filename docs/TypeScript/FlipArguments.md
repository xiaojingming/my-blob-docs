---
title: FlipArguments
author: 萧~
date: '2022-11-21'
---

### FlipArguments

[type-challenge-FlipArguments github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/03196-medium-flip-arguments/README.md)

难度：中等

#### 题目描述

Implement the type version of lodash's _.flip.

Type FlipArguments```<T>``` requires function type T and returns a new function type which has the same return type of T but reversed parameters.

>(实现```FlipArguments<T>```，接收一个函数类型，并返回函数参数颠倒的新函数类型)

For example:

```
type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void> 
// (arg0: boolean, arg1: number, arg2: string) => void
```

我们只需要通过```infer```推断出参数和结果类型，让后调用上一章实现[Reverse](./Reverse.md)颠倒参数并生成新的函数类型即可。

```
type Reverse<T extends any[]> = T extends [...infer Rest, infer Last]
  ? [Last, ...Reverse<Rest>]
  : [];
inferface F {
  (...res: any[]): any,
}
type FlipArguments<T extends F> = T extends ((...params: infer Params) => infer Result)
  ? (...res: Reverse<Params>) => Result
  : never;
```
