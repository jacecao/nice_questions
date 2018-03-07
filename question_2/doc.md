* #### Code  
```javascript
function setName (obj) {
  obj.name = 'Jace';
  obj = new Object();
  obj.name = 'Change';
}

let person = new Object();
setName(person);
```     

* #### Questions

```javascript
// 给出打印值
console.log(person.name);
```    

* #### Answer 

```javascript
person.name > Jace
```     

* #### Why

这里需要考验参数在函数内部执行过程，已经引用类型数据的使用

`setName(person);`在执行过程中需要首先函数内部隐式声明参数变量obj,为什么是说是隐式的呢？因为你没有看到变量声明关键字var\let\const..；   

接着将参数的赋值给obj,这里需要注意的是我们传入的是一个引用类型参数，也就是赋值给obj的是一个保存变量的指针（可以理解为数据索引），对obj的操作将直接改变参数本身，`obj.name = 'Jace';`那么这里person拥有了name属性以及值。    

`obj = new Object();`这里赋值一个新的索引值，也就是说执行这行代码后，obj与参数已经断绝关系，也不再对参数作任何影响。所以后面的赋值将不会改变person


  