---
title: ObjectEntries
author: 萧~
date: '2022-11-15'
---

### ObjectEntries

[type-challenge-ObjectEntries github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/02946-medium-objectentries/README.md)

难度：中等

#### 题目描述

Implement the type version of Object.entries

>(实现类型的Object.entries函数😂)

For example:

```
interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type modelEntries = ObjectEntries<Model>
// ['name', string] | ['age', number] | ['locations', string[] | null];
```

😂这道题一开始也是没有思路，在看了一些别人实现的方法后，逐渐有了一点思路，这道题第一个问题是**如何将对象类型转化为数组类型**🤔。我们可以通过索引来解决这个问题:
```
type A = [1, 2, 3][number] // 1 | 2 | 3

const obj = { name: 'xiao', age: 25 };

type B = (typeof A)[keyof typeof A] // string | number
```
这样的话，可以实现第一版的功能
```
type ObjectEntries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T];
```
但是```Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>```测试用例的校验无法通过，可以看到这里将可选属性转化为必选属性，可以得到第二个版本的代码
```
type ObjectEntries<T> = {
  [K in keyof T]-?: [K, T[K]]
}[keyof T]
```
🤣```Equal<ObjectEntries<Partial<Model>>, ModelEntries>```这个测试用例也无法通过，其中```ModelEntries```类型为```type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]```,```Partial```是内置的类型函数，将所有属性转化为可选，对应属性的类型就是原类型与undefined的联合类型，我们通过```extends```进行判断，如果原类型本来就是undefined，直接返回undefined，否则排除undefined类型
```
type ObjectEntries<T> = {
  [K in keyof T]: [K, [T[K]] extends [undefined] ? T[K] : Exclude<T[K], undefined> ]
}[keyof T]
```
这道题不算特别难，不过不清楚思路确实不知道从哪里下手（🤣我就是这样）
