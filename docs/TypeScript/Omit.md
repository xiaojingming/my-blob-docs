---
title: Omit
author: 萧~
date: '2023-02-04'
---

### Omit

[type-challenge github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/00003-medium-omit/README.zh-CN.md)

难度：中等

#### 题目描述

Implement the built-in Omit<T, K> generic without using it.

Constructs a type by picking all properties from T and then removing K

>(实现TS内置的```Omit<T, K>```泛型，```Omit```会创建一个省略```K```中的字段的对象)

For example:

```
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}
```

这道题我们只需要在创建对象的时候断言当前的```key```是否继承于```K```即可

```
type Omit<T, K extends keyof T> = {
  [Key in keyof T as Key extends K ? never : Key]: T[Key]
}
```