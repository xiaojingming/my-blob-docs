---
title: ReplaceKeys
author: 萧~
date: '2022-10-26'
---

### ReplaceKeys
[type-challenge-replaceKeys github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/01130-medium-replacekeys/README.md)

难度：中等

#### 题目描述

Implement a type ReplaceKeys, that replace keys in union types, if some type has not this key, just skip replacing, A type takes three arguments.

>(实现一个ReplaceKeys类型，该类型接收三个泛型，第一个泛型是待替换的目标联合类型，第二个泛型是替换的key，第三个泛型是替换的内容)

For example:
```
type NodeA = {
  type: 'A'
  name: string
  flag: number
}

type NodeB = {
  type: 'B'
  id: number
  flag: number
}

type NodeC = {
  type: 'C'
  name: string
  flag: number
}

type Nodes = NodeA | NodeB | NodeC
type ReplacedNodes = ReplaceKeys<Nodes, 'name' | 'flag', {name: number, flag: string}>
// type ReplacedNode = { type: 'A', name: number, flag: string }
// | { type: 'B', id: number, flag: string }
// | { type: 'C', name: number, flag: string }

type ReplacedNotExistKeys = ReplaceKeys<Nodes, 'name', {aa: number}>
// { type: 'A', flag: number, name: never }
// | { type: 'B', id: number flag: string }
// | { type: 'C', flag: number, name: never }
```

🤔可能这道题目的难点在于题目的意思不太好理解，整体还是比较简单的：
```
type ReplaceKeys<U, K, V> = {
  [Key in keyof U]: Key extends K ? Key extends keyof V ? V[Key] : never : U[Key];
};
```

如果```key```在```K```中存在，当```key```在```V```中存在时，返回类型```V[Key]```，否则返回```never```，如果```key```不存在于K中，则直接返回原本的类型。