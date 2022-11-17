---
title: TupleToNestedObject
author: 萧~
date: '2022-11-17'
---

### TupleToNestedObject

[type-challenge-TupleNestedObject github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/03188-medium-tuple-to-nested-object/README.md)

难度：中等

#### 题目描述

Given a tuple type T that only contains string type, and a type U, build an object recursively.

>(实现```TupleToNestedObject<T, U>```，其中```T```只能接收字符串类型数组，并且生成一个递归的对象)

For example:
```
type a = TupleToNestedObject<['a'], string> // {a: string}
type b = TupleToNestedObject<['a', 'b'], number>
// {a: {b: number}}
type c = TupleToNestedObject<[], boolean>
// boolean. if the tuple is empty, just return the U type
```

根据题意，当```T```为空数组时，直接返回类型```U```，先实现这个功能
```
type TupleToNestedObject<T extends string[], U> = T extends [infer First, ...infer Rest]
  ? <Others>
  : U;
```
我们需要循环```Rest```来递归生成对象
```
type TupleToNestedObject<T extends string[], U> = T extends [infer First, ...infer Rest]
  ? {
    [K in First & string]: TupleToNestedObject<Rest extends string[] ? Rest : [], U>
  }
  : U;
```
这样就可以实现上面的功能啦。