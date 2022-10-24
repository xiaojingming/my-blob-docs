---
title: IsNever
author: 萧~
date: '2022-10-24'
---

### IsNever

[type-challenge-isNever  github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/01042-medium-isnever/README.md)

难度：中等

#### 题目描述

Implement a type IsNever, which takes input type T. If the type of resolves to never, return true, otherwise false.

>(判断输入类型是否是never，是never类型则返回true，否则返回false)

For example:

```
type A = IsNever<never>  // expected to be true
type B = IsNever<undefined> // expected to be false
type C = IsNever<null> // expected to be false
type D = IsNever<[]> // expected to be false
type E = IsNever<number> // expected to be false
```

一开始在看到这个题目的时候，很容易就会想到：
```
type IsNever<T> = T extends never ? true : false
```

然而却不能判断never，类型A会得到never类型的结果，但是为什么是never类型呢？这主要是当**never**在泛型中的特例，并不会触发**extends**的判断，导致返回自身。

[github上有人提出过这个问题](https://github.com/microsoft/TypeScript/issues/31751)

下面是点赞最多的评论：
>This is the expected behavior, ExtendsNever is a distributive conditional type. Conditional types distribute over unions. Basically if T is a union ExtendsNever is applied to each member of the union and the result is the union of all applications (ExtendsNever<'a' | 'b'> == ExtendsNever<'a' > | ExtendsNever<'b'>). never is the empty union (ie a union with no members). This is hinted at by its behavior in a union 'a' | never == 'a'. So when distributing over never, ExtendsNever is never applied, since there are no members in this union and thus the result is never.

>大概的意思是never类型是空的联合类型，在TS处理泛型为联合类型时会进行分发，但是不会对never进行分发，所以返回never。

正确的方法：

```
type IsNever<T> = [T] extends [never] ? true : false;
```
