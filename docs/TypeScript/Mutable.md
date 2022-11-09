---
title: Mutable
author: 萧~
date: '2022-11-09'
---

### Mutable

[type-challenge-Mutable github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/02793-medium-mutable/README.zh-CN.md)

难度：中等

#### 题目描述

Implement the generic ```Mutable<T>``` which makes all properties in T mutable (not readonly).

>(实现类型```Mutable<T>```，能够让泛型```T```中的所有属性变为非只读)

for Example:
```
interface Todo {
  readonly title: string
  readonly description: string
  readonly completed: boolean
}

type MutableTodo = Mutable<Todo>
// { title: string; description: string; completed: boolean; }
```
这道题只要知道一个技巧就会变得十分容易😁
```
type A<T> = {
  -readonly[K in keyof T]: T[K]
}
```
使用```-readonly```后，泛型T中所有只读属性都会变为非只读，类似的还有```-?```可以将可选变为必选，所以，这道题的答案如下：
```
type Mutable<T extends object> = {
  -readonly[K in keyof T]: T[K]
}
```
其中```T extends object```主要是处理测试用例中的参数类型，```object```类型表示非原始类型（```undefined```, ```null```, ```boolean```, ```number```, ```bigint```, ```string```, ```symbol```除外）。
