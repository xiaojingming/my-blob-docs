---
title: PickByType
author: 萧~
date: '2022-11-02'
---

### PickByType
[type-challenge-pickByType github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/02595-medium-pickbytype/README.md)

难度：中等

#### 题目描述

From T, pick a set of properties whose type are assignable to U.

>(从泛型```T```中获取类型为```U```的属性)

For example:
```
type OnlyBoolean = PickByType<{
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}, boolean> // { isReadonly: boolean; isEnable: boolean; }
```
这道题的思路并不复杂，通过映射类型和断言```as```即可实现
```
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: U;
}
```