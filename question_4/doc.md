* #### Code  
```javascript
const Book = function (title, time, type) {
  this.title = title;
  this.time = time;
  this.type = type;
}

let book = Book('js', '2018', 'code');
```     

* #### Questions

```
 请问book的值是什么？   
 Book()究竟做了什么    
 如何实现对象的安全模式    
```    

* #### Answer 

1. book的值是undefined
2. Book()在此处的作用就是添加了3个全局变量
3. 下面会给出构造函数的安全模式

* #### Why

这是我们在通过原型函数构造对象时容易混淆的问题，如果一开始你就知道了答案，那this对你来说就没有什么秘密的了。第2个问题主要就是对this的理解，而这里的this其实就是window(global),所以当你运行此函数后，你看window（global）是否有了`title`\`time`\`type`这3个属性

如何构建一个安全模式的原型函数呢？（也就是如何防止忘记添加关键字new）

```javascript
const Book = function (title, time, type) {
  if (this instanceof Book) {
    this.title = title;
    this.time = time;
    this.type = type;
  } else {
    return new Book(title, time, type);
  }
}
``` 
你看原型也有安全模式，是不是挺酷的
