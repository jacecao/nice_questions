### 对象继承的实现

* 我们发现一个非常有意思的地方

当我们用一个对象和一个数字或字符串类型的数字做比较式，JS会自动调用对象内置的toString方法对对象进行转化，这个是非常有意思的地方，从中也能看出JS在做一般比较时的运行机制，通常会将对象转化为一个最基本类型的值来做比较。

下面的代码虽然在实际运用中没有什么意义，同时也不鼓励大家这样随意改造对象继承来的初始方法。

```javascript

// 对象内置方法
let test = {a: 1, toString () {console.log(this.a++)}}

if (test == 1 || test == 2) {
  console.log(3)
}

console.log(test.a);

```

* 继承对象中的关键字`super`

首先看下面的代码，你觉得执行结果会是什么样的？

```javascript
  let origin = {name: 'icey', age: 18};
  obj = {
    getName () {
      return super;
      //return super.age;
    },
    setAge(value) {
      super.age = value
    }
  };
  Object.setPrototypeOf(obj, origin);
  console.log(obj.getName());
  obj.setAge(20);
  console.log(origin.age);
```

super在继承者中代表所继承的原型但是需要注意的是super是不可以对外,只能对内，且不可改变,
什么意思如上面的getName,如果返回的是super那就会报错，`super`只能用于获取原型中的属性值，不可单独对外使用。

不可通过super改变原型，如上面的setAge在该方法中我们想重设原型中的age，这里既是你执行了不会报错，但你会发现是没有成功的。