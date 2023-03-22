---
title: RequiredByKeys
author: 萧~
date: '2022-11-09'
---

### RequiredByKeys

[type-challenge-RequiredByKeys github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/02759-medium-requiredbykeys/README.zh-CN.md)

难度：中等

#### 题目描述

Implement a generic ```RequiredByKeys<T, K>``` which takes two type argument T and K.

K specify the set of properties of T that should set to be required. When K is not provided, it should make all properties required just like the normal ```Required<T>```.

>(实现```RequiredByKeys<T, K>```，接收两个类型参数```T```，```K```。```K```指定应设为必选的```T```的属性集。当没有提供```K```时，它就和普通的```Required<T>```一样使所有的属性成为必选的。)

For example:
```
interface User {
  name?: string
  age?: number
  address?: string
}

type UserRequiredName = RequiredByKeys<User, 'name'> 
// { name: string; age?: number; address?: string }
```

这道题与[PartialByKeys](./PartialByKeys.md)的思路基本一致
```
type RequiredByKeys<T, K extends keyof T = keyof T> = {
  [L in K]-?: T[L]
} & {
  [P in keyof T as P extends K ? never : P]: T[P]
} extends infer R 
  ? {
    [U in keyof R]: R[U]
  }
  : never;
```
将可选对象及非必选对象进行合并即可实现```RequiredByKeys```的功能