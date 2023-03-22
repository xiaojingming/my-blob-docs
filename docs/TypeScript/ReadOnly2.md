---
title: ReadOnly2
author: 萧~
date: '2023-02-06'
---

### ReadOnly2
[type-challenge-ReadOnly2 github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/00008-medium-readonly-2/README.zh-CN.md)

难度：中等

#### 题目描述

Implement a generic ```MyReadonly2<T, K>``` which takes two type argument T and K.

K specify the set of properties of T that should set to Readonly. When K is not provided, it should make all properties readonly just like the normal ```Readonly<T>```.

>(实现```MyReadOnly2<T, K>```泛型，其中```K```指定应该设置为```ReadOnly```的属性集。如果没有提供，所有属性都应该变为只读)

这道题的思路并不复杂，我们只需要将```K```中的属性集先转化为只读对象，再通过交集扩展类型即可。

```
type MyReadOnly2<T, K extends keyof T = keyof T> = {
  readonly[U in K]: T[U]
} & {
  [U in Exclude<keyof T, K>]: T[U]
}
```