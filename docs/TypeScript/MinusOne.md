---
title: MinusOne
author: 萧~
date: '2022-11-01'
---

### MinusOne
[type-challenge-minusOne github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/02257-medium-minusone/README.zh-CN.md)

难度：中等

#### 题目描述

Given a number (always positive) as a type. Your type should return the number decreased by one.

>(给定一个正整数作为类型的参数，要求返回的类型是该数字减 1。)

For example:
```
type Zero = MinusOne<1> // 0
type FiftyFour = MinusOne<55> // 54
```

🤣一开始看到这个题目的时候，根本不知道从何入手......后面通过查看别人提交的代码，逐渐有了一点思路。首先TS没有运算能力，或者说需要通过```length```来获取数组属性来得到数字类型，所以上面的问题可以转化成下面这样的形式：
```
type CountRest<T extends number> = xxx;
type MinusOne<T extends number> = CountRest<T> extends [1, ...infer Rest]
  ? Rest['length']
  : 0;
```
这样就可以通过获取```Rest['length']```来获取长度了，所以现在只需要理清```CountRest```的逻辑即可。从```CountRest```字面量层面上也可以看出这是一个获取Rest参数的数量的类型（函数），这时候就面临一个问题，如何保存这个数量，**可以通过添加一个泛型参数来保存**，因为在```MinusOne```中是使用```[1, ...infer Rest]```来进行匹配，所以在```CountRest```第二个泛型我们传递的是每一项都为一的数组(```Array<1>```)。
```
type CountRest<T extends number, Sum extends Array<1> = []> = T extends Sum['length']
  ? [...Sum]
  : CountRest<T, [1, ...Sum]>;
```
主要的逻辑就是通过递归去判断保存的数量是否等于传入的```T```，不相等就会递归，并且```Sum```中添加1，最后返回长度等于```T```的数组。

#### 还存在的问题
上面的代码其实还存在一个问题，在[测试用例中](https://www.typescriptlang.org/play?#code/PQKgUABBBM0KwHYIFoIFkCWA7ArgZwHksBTSFZCysgIwE918AXAQwDMB7CAMWYwC8IACgACrZrT6SAtgEoIAYkC0coElvBVOaMAFmTLy9EQBkZgO7cdUQJt+gLO1AAHKAqOUDG1oBdTQA6mgHXlAXHKBvH0DR6oBC3QEPKToAw-4CBkYBCNoAr8YB7aj7egPRmgKfRToDq2oDzihAAjIBADKYQgNHygEGaAFw5AAZljHhkjLQADsQQAFrEAE6cALzo2PhExAA86QB8EMDAEAAMVbX1XBis1VzsOM0QHZi4hCS9cHBDIxBwACxkZSU5Q4AU6hAA4hhaONQQgFBygKfmgNDugFj-moyMNXiFIxUAMaaAB0ACs8CD2M0AObAWCIYB8TTIADCADkwCBgGBcaAIAB9InEknEiCAA3kfIBjuUAgB6E0kMgkQbG46p1TrrHq9AAqEGIAA9GMQsAATPAQXBSagtIYdZhYWi4sD4xkMiCAaVtAKvRgApXXL01VklkYKQ1aGMCBs+oAbwgAFEAI44ZgAGwANHb+XVAeaAL4QVitKQQADkwktyGBLudwphxDwwBwjAwzrwwdZUwggOYeDjKwgAG0yLbPcRvb0HU7nb01t1NoN3WMBgNXUWS2WKy7q10Nn1ts39gcmy2oMWvYxy47OzWe70AMz96BD1tjieVrucutjRvugCcO6XI7b447VenXPS6TG9Yyl8bzbAAF0lcqQPqDUzANByVkAptZvg3MnFQDIIZADAlQBquUpQBjyMAFW9Pm+X5-mAIFQQhKFYXheAEGAeU8AAdxaJEUQxYCIDeGC4J+P4ATwYFwUhaE4QRLC8HYZ1EwwdgsEqKAhkAF7NACxNYwKIQ6jaNQhjCLRTEWTAIA)，有一个例子是无法通过的：
```
MinusOne<1101> // number因为循环过深导致无法推断出类型
```
😂确实不知道要怎么样去弄了，以后有机会找一下相关的答案