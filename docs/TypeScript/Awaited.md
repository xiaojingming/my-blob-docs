---
title: Awaited
author: 萧~
date: '2023-1-31'
---

### Awaited

[type-challenge github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/00189-easy-awaited/README.zh-CN.md)

If we have a type which is wrapped type like Promise. How we can get a type which is inside the wrapped type?

For example: if we have Promise```<ExampleType>``` how to get ExampleType?

>(实现类型Awaited，用于获取```Promise<ExampleType>```中的```ExampleType```类型)

For example:

```
type ExampleType = Promise<string>

type Result = MyAwaited<ExampleType> // string
```

这道题目看上去只需判断```T```是否继承```Promise<any>```即可，但是题目中的测试用例还对实现了```thenable```接口的类型进行了判断且能够推断出类型：

```
type T = { then: (onfulfilled: (arg: number) => any) => any }
type Res5 = MyAwaited<T> // number
```

😂一开始我的想法是实现```then```的类型，后面发现内置了```PromiseLike<T>```的类型，有了```PromiseLike```就可以很方便地实现了

```
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer Type>
  ? Type extends PromiseLike<any>
    ? MyAwaited<Type>
    : Type
  : never;
```

在第一次判断出```T```是```PromiseLike```类型时，递归执行这个类型函数，主要是处理```Promise```嵌套```Promise```的情况。