---
title: TrimRight
author: 萧~
date: '2022-12-15'
---

### TrimRight

[type-challenge-trimRight github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/04803-medium-trim-right/README.zh-CN.md)

难度：中等

#### 题目描述

Implement TrimRight<T> which takes an exact string type and returns a new string with the whitespace ending removed.

>(实现 ```TrimRight<T>``` ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串结尾的空白字符串。)

For example:

```
type Trimed = TrimRight<'  Hello World  '> // 应推导出 '  Hello World'
```

只需要通过模板字符串就可以实现这个功能

```
type TrimRight<S extends string> = S extends `${infer Rest}${' '}`
  ? TrimRight<Rest>
  : S 
```

但是上面的代码在测试用例中存在不能通过的情况

```<TrimRight<'   foo bar  \n\t '>```和
```TrimRight<'\n\t '>```所以需要加上```\n```和```\t```的判断

```
type TrimRight<S extends string> = S extends `${infer Rest}${' ' | '\n' | '\t'}`
  ? TrimRight<Rest>
  : S
```

这样就实现了```TrimRight```的功能。同样的，我们还可以实现```TrimLeft```和```Trim```两个功能。

```
type TrimLeft<T extends string> = T extends `${' ' | '\n' | '\t'}${infer Rest}`
  ? TrimLeft<Rest>
  : T;
```

```
type Trim<S extends string> = TrimRight<TrimLeft<S>>
```