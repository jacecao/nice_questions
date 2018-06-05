### 通过函数改变全局变量

* 最近在使用ArduinoIDE编程时，想通过函数改变全局变量，结果一不小心就犯错了

下面为错误源码，这段代码想实现的功能就是控制LED灯颜色的变化

```c++
// 初始LED三色对应针脚
int redPin = 9;
int grePin = 10;
int bluPin = 11;

// 初始LED三色状态
bool redStatus = false;
bool greStatus = false;
bool bluStatus = true;

// 初始三色信号值
int redVal = 255;
int greVal = 10;
int bluVal = 0;

// 初始针脚功能
void setup() {
  // pinMode为内置方法，初始针脚为信息输出针脚
  pinMode(redPin, OUTPUT);
  pinMode(grePin, OUTPUT);
  pinMode(bluPin, OUTPUT);
}

// 检查状态
void changeStatus(int val, bool status) {
  if (val == 0) {
    status = true;
  } else if (val == 255) {
    status = false;
  }
}
// 改变信号值
void changeColorVal(int val, bool status) {
  changeStatus(val, status);
  if (status) {
    val ++;
  } else {
    val --;
  }
}

// 输出信号值到针脚
void setColor(int red, int green, int blue) {
  // analogWrite()内置函数，模拟数字信号
  analogWrite(redPin, red);
  analogWrite(grePin, green);
  analogWrite(bluPin, blue);
}

// 循环执行模块
void loop() {
  changeColorVal(redVal, redStatus);
  changeColorVal(greVal, greStatus);
  changeColorVal(blueVal, bluStatus);

  setColor(redVal, greVal, bluVal);
  delay(50);
}
```

上面是希望实现LED灯三色逐次渐变的一个方法，你猜这个运行结果会怎样呢？
是否按照我们所希望的执行了呢？


从上面的代码可以看出，我把参数变量和全局变量关系搞错了，误以为传入一个全局变量进去后，全局变量会在函数体内得到改变，然而并不是这样，变量非引用类型，所以是无法再函数体内得到改变的，这导致changeColorVal()方法根本没有作用于三色信号值变量中，要实现上面代码中的功能，那么就必须显示的改变全局变量，也就是给函数添加返回值并赋值给全局变量。

```c++
/*前面都一样不作改变*/
// 检查状态
bool changeStatus(int val, bool status) {
  if (val == 0) {
    status = true;
  } else if (val == 255) {
    status = false;
  }
  return status;
}
// 改变信号值
int changeColorVal(int val, bool status) {
  // 这里就不能这样作了，因为在内部检查状态是五意义的，也无法动态改变全局变量
  // 如果这里我们只有一个状态变量，那么我们可以在函数体内写死
  // 但这里明显不可以，因为我们需要灵活改变多个不确定的全局变量
  // 当然也可以在内部实现动态改变全局变量，但显然这使得代码不易维护
  // changeStatus(val, status);
  if (status) {
    val ++;
  } else {
    val --;
  }
  return val;
}

/* 输出信号值到针脚
*  无改变
*/

// 循环执行模块
void loop() {
  // 这里就得单独对变量赋值
  redStatus = changeStatus(redVal, redStatus);
  redVal = changeColorVal(redVal, redStatus);

  greStatus = changeStatus(greVal, greStatus);
  greVal = changeColorVal(greVal, greStatus);

  bluStatus = changeStatus(bluVal, bluStatus);
  bluVal = changeColorVal(bluVal, bluStatus);

  setColor(redVal, greVal, bluVal);
  delay(50);
}
```



