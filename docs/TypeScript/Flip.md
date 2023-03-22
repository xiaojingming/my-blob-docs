---
title: Flip
author: 萧~
date: '2022-11-29'
---

### Flip
[type-challenge-Flip github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/04179-medium-flip/README.md)

难度：中等

#### 题目描述

Implement the type of just-flip-object.

>(实现```Flip<T>```，用于反转对象类型```T```的```key```和```value```)

For Example:

```
Flip<{ a: "x", b: "y", c: "z" }>;
// {x: 'a', y: 'b', z: 'c'}
Flip<{ a: 1, b: 2, c: 3 }>;
// {1: 'a', 2: 'b', 3: 'c'}
Flip<{ a: false, b: true }>;
// {false: 'a', true: 'b'}
```

根据题目的含义，我们可以实现这样的代码:

```
type Flip<T> = {
  [K in keyof T as T[K]]: K
};
```
但在上面代码中，```T[K]```的类型会显示错误，我们对对象的值进行限制：
```
type Flip<T extends Record<string, string | number>> = {
  [K in keyof T as T[K]]: K
};
```
这时候```T[K]```的类型就不会判断错误，但是在测试用例中```Flip<{ pi: 3.14; bool: true }```却无法校验通过了，需要将```boolean```类型转化为```string```;
```
type Flip<T extends Record<string, string | number | boolean>> = {
  [K in keyof T as `${T[K]}`]: K
};
```
这样就可以实现反转的效果了
