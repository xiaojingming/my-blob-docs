---
title: Trim
author: 萧~
date: '2023-2-20'
---

### Trim

[type-challenge github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/00108-medium-trim/README.zh-CN.md)

Implement Trim`<T>` which takes an exact string type and returns a new string with the whitespace from both ends removed.

>(实现`Trim<T>`，它接收一个字符串类型，平且返回删除了开头和结尾空格的字符串)

For example:

```
type trimed = Trim<'  Hello World  '> // expected to be 'Hello World'
```

`Trim<T>`的实现可以先判断是否以空格开头，以空格开头则递归执行`Trim`，否则判断是否以空格结尾，再递归剩余部分。

```
type NullType = ' ' | '\n' | '\t';
type Trim<T> = T extends `${NullType}${infer Right}`
  ? Trim<Right>
  : T extends `${infer Left}${NullType}`
    ? Trim<Left>
    : T
```

我们也可以直接使用联合类型来简化上面的代码

```
type Trim<T> = T extends `${NullType}${infer Rest}` | `${infer Rest}${NullType}` ? Trim<Rest> : T
```
