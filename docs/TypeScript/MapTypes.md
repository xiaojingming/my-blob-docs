---
title: MapTypes
author: 萧~
date: '2022-12-28'
---

### MapTypes

[type-challenge github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/05821-medium-maptypes/README.md)

Implement MapTypes<T, R> which will transform types in object T to different types defined by type R which has the following structure

```
type StringToNumber = {
  mapFrom: string; // value of key which value is string
  mapTo: number; // will be transformed for number
}
```

>(实现```MapTypes<T, R>```泛型，其中```T```是对象类型并会根据类型```R```转换为指定类型，```R```的类型如上所示)

For example:

```
type StringToNumber = { mapFrom: string; mapTo: number;}
MapTypes<{iWillBeANumberOneDay: string}, StringToNumber>
// gives { iWillBeANumberOneDay: number; }
```

并且```R```可以是联合类型

```
type StringToNumber = { mapFrom: string; mapTo: number;}
type StringToDate = { mapFrom: string; mapTo: Date;}
MapTypes<{iWillBeNumberOrDate: string}, StringToDate | StringToNumber>
// gives { iWillBeNumberOrDate: number | Date; }
```

如果属性在```map```中不存在，则直接返回对应的类型

```
type StringToNumber = { mapFrom: string; mapTo: number;}
MapTypes<{iWillBeANumberOneDay: string, iWillStayTheSame: Function}, StringToNumber>
// gives { iWillBeANumberOneDay: number, iWillStayTheSame: Function }
```

虽然这道题目比较长，但是逻辑不是很复杂

```
type MapTypes<T, R extends { mapFrom: unknown, mapTo: unknown }> = {
  [K in keyof T]: T[K] extends R['mapFrom']
    ? R['mapTo']
    : T[K]
}
```

这样基本能通过所有的测试用例，但是对于```R```为联合类型是无法通过的，我们需要实现一个辅助泛型```Transform```来处理联合类型

```
type Transform<T extends { mapFrom: unknown, mapTo: unknown }, R> = T extends any
  ? T['mapFrom'] extends R
    ? T['mapTo']
    : never
  : never;
```

```
type MapTypes<T, R extends { mapFrom: unknown, mapTo: unknown }> = {
  [K in keyof T]: T[K] extends R['mapFrom']
    ? Transform<R, T[K]>
    : T[K];
}
```

在GitHub上面还看到了一种更加方便地实现方式，并且不需要使用复制函数

```
type MapTypes<T, R extends { mapFrom: unknown, mapTo: unknown }> = {
  [K in keyof T]: T[K] extends R['mapFrom']
    ? Extract<R, { mapFrom: T[K] }>['mapTo']
    : T[K];
}
```

通过```Extract```从联合类型中指定具体类型来实现```MapTypes```😂
