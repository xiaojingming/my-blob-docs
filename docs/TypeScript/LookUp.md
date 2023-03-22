---
title: LookUp
author: 萧~
date: '2023-02-15'
---

### LookUp
[type-challenge-lookUp github地址](https://github.com/type-challenges/type-challenges/blob/main/questions/00062-medium-type-lookup/README.md)

难度：中等

#### 题目描述

In this challenge, we would like to get the corresponding type by searching for the common type field in the union Cat | Dog. In other words, we will expect to get Dog for LookUp`<Dog | Cat, 'dog'>` and Cat for LookUp`<Dog | Cat, 'cat'>` in the following example.

>(在这次的类型挑战中，我们想要在联合类型`Cat`和`Dog`中查找共同的`type`字段来获得正确的类型)

For example:

```
interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type MyDog = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
```

我们直接来实现：

```
type LookUp<T extends { type: string }, U> = T extends { type: U }
  ? T
  : never;
```

因为联合类型的判断是单个判断再合并的，上面的代码就可以实现题目的功能啦
