---
title: ChainableOptions
author: 萧~
date: '2023-02-10'
---

### ChainableOptions
[type-challenge-ChainableOptions github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/00012-medium-chainable-options/README.md)

难度：中等

#### 题目描述

Chainable options are commonly used in Javascript. But when we switch to TypeScript, can you properly type it?

In this challenge, you need to type an object or a class - whatever you like - to provide two function option(key, value) and get(). In option, you can extend the current config type by the given key and value. We should about to access the final result via get.

>(在JS中我们经常会使用链式调用。接下来，在TS中实现类型的链式调用，需要提供```option(key, value)```和```get()```两个函数。```option```函数用于提供```key```和```value```扩展对象，```get```函数用于获取扩展后的对象)

For example:

```
declare const config: Chainable

const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get()

// 期望 result 的类型是：
interface Result {
  foo: number
  name: string
  bar: {
    value: string
  }
}
```

首先我们来实现基本结构：

```
type Chainable = {
  option: (key: string, v: any) => Chainable
  get: () => {}
}
```

```option```方法能进行递归操作，我们需要使用一个泛型来存储结果，并在```get```方法调用的使用返回：

```
type Chainable<Result extends Object = {}> = {
  option: (key: string, v: any) => Chainable
  get: () => Result
}
```

在```options```返回值中，我们需要将上一次的结果和扩展的对象进行合并，我们还需要将```key```和```value```的类型用泛型进行表示，用于后续的合并

```
type Chainable<Result extends Object = {}> = {
  option: <K extends string, V>(key: K, v: V) => Chainable<T & {
    [U in K]: V
  }>
  get: () => Result
}
```

上面已经基本实现了链式调用的功能，但在测试用例中，对于相同的```key```无法通过校验

```
type Chainable<Result extends Object = {}> = {
  option: <K extends string, V>(Key: K extends keyof Result ? never : K, v: V) => Chainable<{
    [U in keyof Result]: U extends K ? V : Result[U]
  } & {
    [P in K]: V
  }>
  get: () => Result
}
```

这样就实现了链式调用啦😁
