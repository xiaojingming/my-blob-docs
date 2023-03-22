---
title: StartsWith
author: 萧~
date: '2022-11-07'
---

### StartsWith

[type-challenge-startsWith github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/02688-medium-startswith/README.zh-CN.md)

难度：中等

#### 题目描述

Implement StartsWith<T, U> which takes two exact string types and returns whether T starts with U

>(实现```StartsWith<T, U>```，接收两个类型都是string的参数，判断```T```是否以```U```开头)

For example:
```
type a = StartsWith<'abc', 'ac'> // expected to be false
type b = StartsWith<'abc', 'ab'> // expected to be true
type c = StartsWith<'abc', 'abcd'> // expected to be false
```

这道题的思路是通过模板字面量和递归来解决
```
type StartsWith<T extends string, U extends string> = U extends `${infer Ustart}${infer Uend}`
  ? T extends `${infer Tstart}${infer Tend}`
    ? Tstart extends Ustart
      ? StartsWith<Tend, Uend>
      : false
    : false
  : true;
```
其中，第一个条件类型使用来判断第二个参数是否为```''```，是的话直接返回```true```，否则继续继续第二个条件类型判断；如果第一个参数为```''```则返回```false```，否则继续进行判断；判断两个参数（字符串类型）是否相等，是的话递归继续进行判断，否则返回```false```。

不过我在别人提交的解答中也看到了一种写法🤔：
```
type StartsWith<T extends string, U extends string> = T extends `${U}${string}` ? true : false;
```
额，好像确实是可以这样实现😂

与```StartsWith```很类似的[EndsWith](./EndsWith.md)
