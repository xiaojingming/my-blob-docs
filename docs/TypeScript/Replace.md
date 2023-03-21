---
title: Replace
author: 萧~
date: '2023-03-21'
---

### Replace
[type-challenge-Replace github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/00116-medium-replace/README.md)

难度：中等

#### 题目描述

Implement `Replace<S, From, To>` which replace the string `From` with `To` once in the given string `S`

>实现 Replace`<S, From, To>` 将字符串 `S` 中的第一个字符串 `From` 替换为 `To`

For example:

```
type replaced = Replace<'types are fun!', 'fun', 'awesome'> // 期望是 'types are awesome!'
```

我们直接使用模板字符串来进行匹配
```
type Replace<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer L}${infer From}${infer R}`
    ? `${L}${To}${R}`
    : S
```
