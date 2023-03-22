---
title: OmitByType
author: 萧~
date: '2022-11-10'
---

### OmitByType

[type-challenge-OmitByType github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/02852-medium-omitbytype/README.md)

难度：中等

#### 题目描述

From T, pick a set of properties whose type are not assignable to U.

>(实现```OmitByType<T, K>```，从泛型```T```中获取类型不属于```U```的属性)

For example:
```
type OmitBoolean = OmitByType<{
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}, boolean> // { name: string; count: number }
```

这道题比较简单，通过```in```拓展并断言判断类型是否属于```U```即可🤔
```
type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K]
}
```