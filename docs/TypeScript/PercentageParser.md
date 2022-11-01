---
title: PercentageParser
author: 萧~
date: '2022-10-31'
---

### PercentageParser
[type-challenge-PercentageParser github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/01978-medium-percentage-parser/README.zh-CN.md)

难度：中等

#### 题目描述

Implement PercentageParser. According to the ```/^(\+|\-)?(\d*)?(\%)?$/``` regularity to match T and get three matches.

The structure should be: [plus or minus, number, unit] If it is not captured, the default is an empty string.

>实现类型 PercentageParser。根据规则 ```/^(\+|\-)?(\d*)?(\%)?$/``` 匹配类型 T。
>匹配的结果由三部分组成，分别是：[正负号, 数字, 单位]，如果没有匹配，则默认是空字符串。

For example:
```
type PString1 = ''
type PString2 = '+85%'
type PString3 = '-85%'
type PString4 = '85%'
type PString5 = '85'

type R1 = PercentageParser<PString1> // expected ['', '', '']
type R2 = PercentageParser<PString2> // expected ["+", "85", "%"]
type R3 = PercentageParser<PString3> // expected ["-", "85", "%"]
type R4 = PercentageParser<PString4> // expected ["", "85", "%"]
type R5 = PercentageParser<PString5> // expected ["", "85", ""]
```

TS无法直接实现正则的功能，因此需要通过```infer```枚举各种情况，解决方法如下

```
type Signal = '+' | '-';
type Percentage = '%';
type GetNumsOrPercentage<T extends string> = T extends `${infer Others}${Percentage}`
  ? [Others, Percentage]
  : [T, '']
type PercentageParser<T extends string> = T extends `${infer First}${infer Others}`
  ? [First, ...GetNumsOrPercentage<Others>]
  : ['', ...GetNumsOrPercentage<T>]
: ['', '', ''];
```
首先定义了Signal和Percentage两个字面量类型，判断是否以```+ | -```开头，当泛型T以符号开头时，将剩余的部分传入第二个类型别名```GetNumsOrPercentage```；```GetNumsOrPercentage```会判断是否以```%```结尾，并生成对应的数组类型，并且通过扩展运算符展开；最后加上题目中要求的**如果没有匹配，返回```['', '', '']```。**