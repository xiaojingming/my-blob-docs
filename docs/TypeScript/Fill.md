---
title: Fill
author: 萧~
date: '2022-12-14'
---

### Fill
[type-challenge-fill github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/04518-medium-fill/README.md)

难度：中等

#### 题目描述

```Fill```, a common JavaScript function, now let us implement it with types. ```Fill<T, N, Start?, End?>```, as you can see,```Fill``` accepts four types of parameters, of which ```T``` and ```N``` are required parameters, and ```Start``` and ```End``` are optional parameters. The requirements for these parameters are: ```T``` must be a tuple, ```N``` can be any type of value, ```Start``` and ```End``` must be integers greater than or equal to 0.

>(实现```fill```该类型接收四个参数，第一个参数```T```是数组类型，第二个参数```N```可以是任意类型，且第一二个参数是必须的，第三四个参数分别是开始和结束的位置```start```，```end```)

在不考虑```start```和```end```的情况下我们先来实现全部替换的功能

```
type Fill<
  T extends any[],
  N extends any,
  Start extends number = 0,
  End extends number = T['length'],
> = T extends [infer First, ...infer Rest]
  ? [N, ...Fill<Rest, N>]
  : [];
```

当```start```大于或者等于```end```时，直接返回原数组，这里用到了之前的
[GreaterThen](./GreaterThen.md)

```
type Fill<
  T extends any[],
  N extends any,
  Start extends number = 0,
  End extends number = T['length'],
> = T extends [infer First, ...infer Rest]
  ? Start extends End
    ? T
    : GreaterThen<Start, End> extends true
      ? T
      : [N, ...Fill<Rest, N, Start, End, [1, ...S]>] 
  : [];
```

接下来就需要实现```Start```和```End```的功能，我们需要再添加一个参数```S```用于记录当前索引，当```S```与```Start```相等时，才开始进行替换，并且下一次递归时将```start```替换为当前索引

```
type Fill<
  T extends any[],
  N extends any,
  Start extends number = 0,
  End extends number = T['length'],
  S extends 1[] = [],
> = T extends [infer First, ...infer Rest]
  ? Start extends End
    ? T
    : GreaterThen<Start, End> extends true
      ? T
      : S['length'] extends Start
        ? [N, ...Fill<Rest, N, Extract<[1, ...S]['length'], number>, End, [1, ...S]>]
        : [First, ...Fill<Rest, N, Start, End, [1, ...S]>]
  : [];
```

这样就可以实现这个功能啦🤔
