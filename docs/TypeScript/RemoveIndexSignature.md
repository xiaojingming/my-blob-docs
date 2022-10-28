---
title: RemoveIndexSignature
author: 萧~
date: '2022-10-27'
---

### RemoveIndexSignature
[type-challenge-removeIndexSignature github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/01367-medium-remove-index-signature/README.md)

难度：中等

#### 题目描述

Implement RemoveIndexSignature\<T\> , exclude the index signature from object types.

>(实现一个RemoveIndexSignature类型， 接收一个对象类型，并排除其中的索引签名)

For example:
```

type Foo = {
  [key: string]: any;
  foo(): void;
}

type A = RemoveIndexSignature<Foo>  // expected { foo(): void }

```
这道题的思路在于如何区分索引签名与普通属性签名，对于索引签名来说```keyof T```会得到具体的类型，如```string```，我们可以利用```'a' extends string```为```true```但```string extends 'a'```为```false```来处理。

解决方法一：

```
type RemoveIndexSignature<T> = {
  [K in keyof T as (string extends K
    ? never
    : number extends K
      ? never
      : symbol extends K
        ? never
        : K)
  ]: T[K];
}
```
对象的key值可以为```string、number、symbol```，所以进行了多次判断。

解决方法二：

```
type RemoveIndexSignature<T> = {
  [K in keyof T as (K extends `${infer S}` ? S : never)]: T[K];
}
```
方法二的思路和方法一的思路其实是相通的，只不过方法一是判断索引签名不展示，方法二是判断普通属性展示，本质上是一样的，不过方法二看上去会优雅很多😉。