---
title: BEMStyleClass
author: 萧~
date: '2022-11-28'
---

### BEMStyleClass
[type-challenge-BEMStyleClass github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/03326-medium-bem-style-string/README.md)

难度：中等

#### 题目描述

The Block, Element, Modifier methodology (BEM) is a popular naming convention for classes in CSS.

For example, the block component would be represented as btn, element that depends upon the block would be represented as btn__price, modifier that changes the style of the block would be represented as btn--big or btn__price--warning.

Implement ```BEM<B, E, M>``` which generate string union from these three parameters. Where B is a string literal, E and M are string arrays (can be empty).

>(实现覆盖css类名的BEM函数。函数接收三个参数，其中第一个参数是字符串，第二三个参数是可以为空的字符串数组)

For example:

```
type A = BEM<'btn', ['price'], []> // btn__price
type B = BEM<'btn', ['price'], ['warning', 'success']> // 'btn__price--warning' | 'btn__price--success'
type C = BEM<'btn', [], ['small', 'medium', 'large']> // 'btn--small' | 'btn--medium' | 'btn--large'
```

这道题只需要依次判断```E```，```M```是否为空，并通过模板字符串进行拼接即可

```
type BEM<B extends string, E extends string[], M extends string[]> = E['length'] extends 0
  ? M['length'] extends 0
    ? B
    : `${B}--${M[number]}`
  : M['length'] extends 0
    ? `${B}__${E[number]}`
    : `${B}__${E[number]}--${M[number]}`
```

上面的代码还能够进行优化，通过观察我们可以发现，上面的结果可以写成```${B}${IsSafe<`__${E[number]}`>}${IsSafe<`--${M[number]}`>}```，问题就转换为如何实现这个类型```IsSafe<T extends string>```，其实只需要判断```T```是否是```never```类型

```
type IsSafe<T> = [T] extends [never] ? '' : T
type BEM<B extends string, E extends string[], M extends string[]> = `${B}${IsSafe<`__${E[number]}`>}${IsSafe<`--${M[number]}`>}`
```

这样代码就简化了很多啦
