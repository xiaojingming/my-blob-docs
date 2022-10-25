---
title: IsUnion
author: 萧~
date: '2022-10-25'
---

### IsUnion
[type-challenge-isUnion github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/01097-medium-isunion/README.md)

难度：中等

#### 题目描述

Implement a type IsUnion, which takes an input type T and returns whether T resolves to a union type.

>(判断输入类型是否是联合类型)

For example:

```
type case1 = IsUnion<string>  // false
type case2 = IsUnion<string|number>  // true
type case3 = IsUnion<[string|number]>  // false
type case4 = IsUnion<never> // false
```

TS在处理泛型为联合类型时会进行分发：
```
Extends<'a' | 'b'> == Extends<'a'> | Extends<'b'>
```
所以可以通过是否进行分发来判断是否是联合类型，那么如何判断是否进行分发了呢？
```
A<T> = T extends T
如果泛型T是联合类型string | number，分发的结果是(string extends string | number) | (number extends string | number)
```
但是这样得到的结果都是true，可以使用```[]```来处理这个问题，如上面表达式中的T，第一个T指的是联合类型中的一项，使用```[]```包裹后```[T] extends [T] ? true : false```类型为```false```，必然与原类型不一致，因此在分发的过程中，使用```[]```再进行匹配，如果匹配不上，说明存在联合类型。
```
type A<T> = T extends T ? [T] extends [T] ? true : false : false;
```
上述的代码还是存在问题，因为T已经进行分发，```[T] extends [T]```依然为```true```，我们需要通过一个默认值来保存原始值

最终代码如下(对于传递never的情况时，认为结果为false)：
```
type IsUnion<T, U = T> = IsNever<T> extends false
  ? T extends U
    ? [U] extends T ? false : true
  : false;
```

[IsNever链接](./IsNever.md)