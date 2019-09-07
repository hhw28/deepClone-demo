### 深拷贝：b 是 a 的一份拷贝，b 中没有对 a 中对象的引用

- 数据类型
  - a 对象的类型？
  - 数字
  - 字符串
  - ...
- 数据规模
  - 有多少属性？
  - 有多少层嵌套？
- 性能要求
  - 时间要求
  - 速度要求
  - 空间要求
- 运行环境
  - 浏览器？IE？
  - node
- 其他条件限制？

#### 1、JSON 序列化反序列化

```
let a = {
    B: 1,
    C: [1,2,3]
}
let a2= JSON.parse(JSON.stringify(a))
```

**缺点：**

- 不支持函数
- 不支持引用（环状）
- 不支持 JSON 不支持的对象
  - undefined
  - Date
  - RegExp
  - 等

#### 2、递归克隆

注意点：

- 考虑环
- 爆栈
- 考虑 Date、RegExp、Function  等特殊对象的克隆方式
- 要不要克隆`__proto__`
  - 如果要克隆，就非常浪费内存
  - 如果不克隆，就不是深克隆
  - <u>我认为：</u>只考虑自有属性，原型都克隆没有必要

##### JS 的数据类型

- Number
- String
- Boolean
- undefined
- null
- Symbol
- Object（复杂类型，引用类型）

##### 基本类型直接拷贝，Object 需单独处理

- Object - for in
  - 缺点：会遍历到原型链上
- Array - new Array()
- Function
- Date
- RegExp
