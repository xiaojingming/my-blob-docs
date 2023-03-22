---
title: Nginx Location基本配置
author: 萧~
date: '2022-10-28'
---

### 基本语法

- ```=```精准匹配
```
location = /a.html {
  return 200 'success';
}
```
> 当访问a.html时，页面会正常显示```success```


- ```~*```不区分大小写匹配
```
location ~* ^/a.html {
  return 200 'success';
}
```
> 访问如```a.html、A.html、a.HTML```等页面都会显示```success```

- ```~```区分大小写匹配
```
location ~ ^(?-i)/a.html {
  return 200 'success';
}
```
>只有访问```a.html```页面才会显示```success```

> 在具有不区分大小写的文件系统（如Mac OS和Windows）的操作系统中，location ~匹配仍然不区分大小写。要强制使用不区分大小写的模式，你需要用(?-i)把它包含在regex本身中

- ```/```通用匹配
```
location /a {
  return 200 'success';
}
```

### 匹配优先级

> A location can either be defined by a prefix string, or by a regular expression.

location根据定义分为**prefix string(前缀字符串)**和**regular expression(正则表达式)**

通过几个例子来展示匹配的优先级：

```
location /te {
  return 200 'te success';
}

location /tes {
  return 200 'tes success';
}
```
> 请求```/test```时，得到的结果是```tes success```，因此可以得到结论：前缀字符串的匹配优先级由前缀字符串的长度决定。

```
location ~ ^(?-i)/te {
  return 200 'te success';
}

location ~ ^(?-i)/tes {
  return 200 'tes success';
}
```
> 请求```/test```时，得到的结果是```te success```，因此可以得到结论：正则表达式的匹配优先级由正则表达式的定义顺序决定。

```
location ^~ /te {
  return 200 'te success';
}

location ~ ^/tes {
  return 200 'tes success';
}
```
> 请求```/test```时，得到的结果是```te success```，因此可以得到结论：```^~```的优先级高于正则表达式

```
location /test {
  return 200 'test success';
}

location ~ ^/tes {
  return 200 'tes success';
}
```
> 请求```/test```时，得到的结果是```tes success```，因此可以得到的结论：正则的优先级高于前缀表达式

```
location = /test {
  return 200 'test success';
}

location ^~ /test {
  return 200 'tes success';
}
```
> 请求```/test```时，得到的结果是```test success```，因此可以得到的结论：```=```的优先级高于```^~```

#### 结论

在优先级上，```=``` ```>``` ```^~``` ```>``` 正则表达式 ```>``` 前缀表达式

### root和alias的区别

我们先定义这样的匹配规则，并在```html```文件夹下创建了```index.html```和```index1.html```两个文件

```
location /test/ {
  root html/test;
}
```

> 当我们访问```/test/index.html```时，页面会报404的错误，在错误日志中看到如下的内容：
```/html/test/test/index.html" failed```

> 我们可以看到访问的是```html/test/test/index.html```，我们修改配置：

```
location /test/ {
  alias html/test;
}
```
> 访问的就是正确的内容，因此我们得出结论：**root 是拼接 root + location 而 alias 是用 alias 替换 location**，所以在上面的配置中，更适合使用```alias```，或者修改为```root html;```即可
