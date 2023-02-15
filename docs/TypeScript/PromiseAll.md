---
title: PromiseAll
author: 萧~
date: '2023-02-14'
---

### PromiseAll
[type-challenge-PromiseAll github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/00020-medium-promise-all/README.zh-CN.md)

难度：中等

#### 题目描述

Type the function PromiseAll that accepts an array of PromiseLike objects, the returning value should be Promise<T> where T is the resolved result array.

>(声明`PromiseAll`函数，它接受`PromiseLike`数组，返回值应为`Promise<T>`其中`T`为解析的结果)

For example:

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const)

```
declare function PromiseAll<T>(values: T): {
  [K in keyof T]: Awaited<T[K]>
}
```

数组也是可以像数组一样通过`{ [K in keyof T]: T[K] }`进行处理的，其中`Awaited<T>`是内置的用于获取`promise`的返回值的类型。上面的`PromiseAll<T>`类型只能推断出`T`为元组类型的情况，但是测试用例中存在`T`类型为数组的情况并且需要推断出具体的结果类型。

```
PromiseAll([1, 2, Promise.resolve(3)]) // [number, number, number]
```

使用上面的`PromiseAll`只能推断出`number[]`类型，这是因为参数`T`被推断为`number[]`，所以我们需要将参数转化为元组且参数可以传入数组。

```
declare function PromiseAll<T extends unknown[]>(values: readonly[...T]): Promise<{
  [K in keyof T]: Awaited<T[K]>
}>
```

这样就可以实现啦。
