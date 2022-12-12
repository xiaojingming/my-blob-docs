---
title: IsTuple
author: 萧~
date: '2022-12-12'
---

### IsTuple

[type-challenge-IsTuple github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/04484-medium-istuple/README.md)

难度：中等

#### 题目描述

Implement a type IsTuple, which takes an input type T and returns whether T is tuple type.

>(实现```IsTuple```，用于判断是否是元组类型)

For example:

```
type case1 = IsTuple<[number]> // true
type case2 = IsTuple<readonly [number]> // true
type case3 = IsTuple<number[]> // false
```

#### **What’s the Difference Between Tuples and Arrays?**

Tuples are similar to arrays but more precise. Tuples have a precise number of elements (disregarding optional params). Tuples can also have a variety of types of elements, i.e. [string, number, string[]].

上面是我在网上找的关于数组和元组的区分，可以理解为元组是拥有精确的成员个数的类型，具体表现如下：

```
type Test<T extends readonly any[]> = number extends T['length'] ? true : false;
type t1 = Test<[number]> // false
type t2 = Test<number[]> // true
```

元组类型的```length```属性的类型是固定的值，而数组的```length```是一个```number```，我们可以通过这个特性来进行判断。

从测试用例中我们发现，输入```never```类型会返回false

```
type IsTuple<T> = [T] extends [never]
  ? false
  : T extends readonly any[]
    ? number extends T['length']
      ? false
      : true
    : false;
```

在上面使用```T extends readonly any[]```因为```{ length: 1 }```不可以通过判断，使用```T['length']```则可以通过判断；且测试实例中存在```IsTuple<readonly [1]>```的判断，无法通过```T extends any[]```来进行判断，所以使用了```T extends readonly any[]```
