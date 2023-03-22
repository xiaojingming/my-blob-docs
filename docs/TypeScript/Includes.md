---
title: Includes
author: 萧~
date: '2023-02-01'
---

### Includes

[type-challenge github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/00898-easy-includes/README.md)

Implement the JavaScript Array.includes function in the type system. A type takes the two arguments. The output should be a boolean true or false.

>(实现 ```JavaScript``` 的 ```Array.includes``` 方法，这个类型接受两个参数，返回的类型要么是 ```true``` 要么是 ```false```。)

For example:

```
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
```

一开始的思路是这样的：
```
type Includes<T extends any[], U> = U extends T[number] ? true : false
```

🤔但是有很多的测试用例无法通过：

```
type Res1 = Includes<[{}], { a: 'A' }>; // false
type Res2 = Includes<[boolean, 2, 3, 5, 6, 7], false>; // false
type Res3 = Includes<[true, 2, 3, 5, 6, 7], boolean>; // false
type Res4 = Includes<[{ a: 'A' }], { readonly a: 'A' }>; // false
type Res5 = Includes<[{ readonly a: 'A' }], { a: 'A' }>; // false
type Res6 = Includes<[1], 1 | 2>; // false
type Res7 = Includes<[1 | 2], 1>; // false
```

我们需要进一步判断两个类型是否相等，而不仅仅是继承

```
type IsEqual<T, U> =
  (<K>() => K extends T ? true : false) extends (<K>() => K extends U) ? true : false;
```

上面是判断两类型是否相等[具体解释😂](https://stackoverflow.com/questions/68961864/how-does-the-equals-work-in-typescript)，接下来我们递归数组进行判断就可以啦

```
type Includes<T extends readonly any[], U> = T extends [infer First, ...infer Rest]
  ? IsEqual<First, U> extends true
    ? true
    : Includes<Rest, U>
  : false;
```