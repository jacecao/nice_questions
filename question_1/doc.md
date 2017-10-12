* #### Code  
```javascript
function Foo () {
  getName = function () {
    console.log(1);
  }
  return this;
}

Foo.getName = function () {
  console.log(2);
}

Foo.prototype.getName = function () {
  console.log(3);
};

var getName = function () {
  console.log(4);
}

function getName () {
  console.log(5);
}
```     

* #### Questions
```javascript
# 请依次给出下列运算后的结果
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```    

* ####Answer    
```javascript
Foo.getName(); > 2
getName(); > 4
Foo().getName(); > 1
/* 这里需要注意 Foo().getName()在Node环境中是没法执行的*/
/* 原因就是this的指向问题和全局变量的问题，这里所有的getName都不是一个全局变量 */
/* 这里需要把getName()赋值给global*/
/* code_fix.js 就是修正后的结果*/
getName(); > 1
new Foo.getName(); > 2
new Foo().getName(); > 3
new new Foo().getName(); > 3 
```  

* #### Why
   
   ***1 Foo.getName()***
   > 这里很容易看成是访问原型对象上的getName()方法，其实这里就是访问Foo的静态属性，
   也就是Foo.getName = xxxxx; 这样添加的属性就是添加静态属性，有且只有Foo才能访问
   实例对象是无法访问的 

   ***2 getName()***  
   > 为什么是`4`？而不是`5`,尽管大家都知道这里出现了重新给getName变量赋值的情况，
   这里主要涉及两个非常重要的知识点：1> 变量声明提升 2 > 函数表达式

   ***变量声明提升***

   即所有声明的变量或声明函数都会被提升到当前函数的顶部（或当前作用域的顶部）。
   也就是 var getName; 和 function getName; 声明的同一变量都会被提到当前函数的顶部
   *_那么问题又来啦，_*我们知道这里变量提升了，那根据声明变量的先后顺序，应该是后面getName
   覆盖前面的getName才对呀，也就是这里得到的应该是`5`呀？,为什么是`4`呢？
   好问题！我们马上来解决这个疑问，但需要记住我们这里只是说明了变量声明提升，即表示
   变量一旦声明就会被提升，要解决这个疑问我们需要了解`函数表达式`。

   ***函数表达式***

   `var getName` 与 `function getName` 都是变量声明语句，但这里有个细节很容易被我们忽略掉，那就是当我们在输入`var getName = function () {}`时，其实这就不仅是声明变量了，还包括赋值，这也就是一个函数表达式，这样的声明和赋值的函数表达式在执行过程中与函数声明（function name () {}）执行方式是不一样的，函数表达式会在执行过程中，如果有变量声明的情况，那么就会先执行变量的声明操作，然后在所有声明都执行后再最后执行赋值。看到这里你就明白为什么不是`5`了，实际的执行过程中是这样的：
   ```javascript
    var getName; // 提升声明变量
    function getName () { // 提升函数声明，覆盖var的声明
      console.log(5);
    };
    // 再执行赋值操作，覆盖函数声明
    getName = function () {
      console.log(4);
    }
    // 所以最后的赋值覆盖了函数声明的getName变量
   ```

   ***3 Foo().getName()***   
   
   这里可能你第一个想到的是应该是`3`，倘若真是这样想的，那么说明你被这里的`this`骗啦，以为这里的`this`返回的是`Foo`对象，其实这里就是考验大家对`this`的指向问题是否熟练.`this`指向的是最终直接调用它的对象，理解这个就能很快锁定`this`。
   `Foo()`返回的`this`指向的就是它的调用者window，因为完整的执行方式应该这样写`window.Foo()`,所以最后返回的其实是Window对象，那么window.getName(); 也就是回到上一个问题了，但需要注意的是又有一个坑出现了，那么现在getName函数是怎么样的呢？这里需要涉及作用域的知识点，在`Foo()`执行时，第一时间执行的是`getName = function () {.....}`,那么这里的getName是指哪里的getName?，这里就涉及作用域的问题，其实这里因为并没声明getName（即var\function）,所以先向当前Foo函数作用域内寻找getName变量，没有。再向当前函数作用域上层，即外层作用域内寻找是否含有getName变量，找到了，也就是第二问中的alert(4)函数，将此变量的值赋值为 function(){alert(1)}。 
  