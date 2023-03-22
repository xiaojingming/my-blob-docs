---
title: PartialByKeys
author: 萧~
date: '2022-11-08'
---

### PartialByKeys

[type-challenge-partialByKeys github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/02757-medium-partialbykeys/README.zh-CN.md)

难度：中等

### 题目描述

Implement a generic ```PartialByKeys<T, K>``` which takes two type argument T and K.

K specify the set of properties of T that should set to be optional. When K is not provided, it should make all properties optional just like the normal ```Partial<T>```

>(实现```PartialByKeys<T, K>```，接收两个类型参数```T```，```K```。```K```指定应设置为可选的```T```的属性集。当没有提供```K```时，它就和普通的```Partial<T>```一样使所有属性都是可选的。)

For example:
```
interface User {
  name: string
  age: number
  address: string
}

type UserPartialName = PartialByKeys<User, 'name'>
// { name?:string; age:number; address:string }
```

根据题意，```K```默认为```T```所有属性
```
type PartialByKeys<T, K = keyof T> = {};
```
我们可以把分别描述可选属性和必选属性的两个类型进行合并，得到我们想要的结果
```
type PartialByKeys<T, K = keyof T> = {
  [L in keyof T as L extends K ? never : L]: T[L]
} & {
  [U in keyof T as U extends K ? U : never]?: T[U]
};
```
我们定义一个合并类型```Merge<T>```
```
type Merge<T> = {
  [K in keyof T]: T[K];
}
type PartialByKeys = Merge<{
  [L in keyof T as L extends K ? never : L]: T[L]
} & {
  [U in keyof T as U extends K ? U : never]?: T[U]
}>
```
这样就可以将两个类型合并成一个类型

在查看解答的时候发现了另一种合并的方法：
```
type PartialByKeys<T, K extends keyof T = keyof T> = {
  [U in keyof T as U extends K ? never : U]: T[U];
} & {
  [L in keyof T as L extends K ? L : never]?: T[L];
} extends infer R 
  ? {
    [K in keyof R]: R[K];
  }
  : never;
```

将一个对象 ```extends infer R``` 再重新展开，这样类型就会合并成一个对象，也可以实现```Merge<T>的效果```。