title: GreaterThan
author: 萧~
date: '2022-12-10'
---

### GreaterThan
[type-challenge-GreaterThan github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/04425-medium-greater-than/README.md)

难度：中等

#### 题目描述

In This Challenge, You should implement a type GreaterThan```<T, U>``` like ```T > U```

>(实现```GreaterThan类型```，该类型接收```T```，```U```两个参数，最后返回```T > U```的结果)

For example:

```
GreaterThan<2, 1> //should be true
GreaterThan<1, 1> //should be false
GreaterThan<10, 100> //should be false
GreaterThan<111, 11> //should be true
```

在这道题目中，由于涉及到了计算，我们很容易想到通过数组```length```来实现。我们定义第三个参数Sum，用于进行累加，在与```T```，```U```进行比较，当与```T```相等时表示```T```的值小于或等于```U```，输出```false```，反之输出```true```。

```
type GreaterThan<T extends number, U extends number, Sum extends 1[] = []> = Sum['length'] extends T
  ? false
  : Sum['length'] extends U
    ? true
    : GreaterThan<T, U, [1, ...Sum]>;
```
