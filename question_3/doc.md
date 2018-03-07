* #### Code  
```javascript
let a = 1;
function b () {
  a = 2;
  function a () {}
  return a;
}
let c = b();
console.log(a);
console.log(c);
```     

* #### Questions

```
// 给出打印值
请给出a,c的值？
```    

* ####Answer 

```javascript
a /> 1
c /> 2
```     

* #### Why

这里涉及函数表达式和变量提升两个知识点 

1. 很明显，如果不执行b函数，那么a为1是没有任何异议的   
2. 那么问题就在函数b中，函数b里面主要涉及一个非常有趣的知识点，那就是函数提升。通过function直接声明函数，该函数变量将会提升至代码执行的优先位置

起始上面的代码实际执行顺序是这样的

```javascript
let a = 1;
function b () {
  let a = function () {};
  a = 2;
  return a;
}
let c = b();
console.log(a);
console.log(c);
``` 
这样就能直观的看出答案了，所以有时候函数变量提升容易成为编程中的陷阱，尤其刚开始接触JS编程


  