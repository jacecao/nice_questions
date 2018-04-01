// 对象继承的实现
// 设置对象原型的主要方法
/*

Object.create(Origin); 生成一个继承了Origin对象的新对象
Object.setPrototypeOf(obj, Origin);  设置对象obj(必须为一个对象才能生效)的原型为Origin,返回的是obj

Object.getPropertypeOf(obj); 获取对象obj的原型

 */

// 如何继承原型函数
let Fun = function () {
	this.name = 'jace';
}

Fun.prototype.age = 17;

class Func {
	constructor () {
		this.name = 'june';
	}
	get age() {
		return 7;
	}
}
// 错误的做法
let obj = Object.create(Fun);
console.log(obj.age);
// 应该这样做
obj = Object.create(new Func());
// 或者这样
obj = Object.setPrototypeOf({}, new Fun());
console.log(obj.age);

/* 
** 新增*super*关键字，super在继承者中代表所继承的原型
** 但是需要注意的是super是不可以对外,只能对内，且不可改变
** 1. 什么意思如下面的getName,如果返回的是super那就会报错
** 只能super只能用于获取原型中的属性值，不可单独对外使用
** 2. 不可通过super改变原型，如下面的setAge
** 在该方法中我们想重设原型中的age，这里既是你执行了不会报错，但你会发现是没有成功的
*/
let origin = {name: 'icey', age: 18};
obj = {
	getName () {
		return super.name;
	},
	setAge(value) {
		super.age = value
	}
};
Object.setPrototypeOf(obj, origin);
console.log(obj.getName());
obj.setAge(20);
console.log(origin.age);

// 通过 Object.getPrototypeOf 返回所继承的原型
console.log(Object.getPrototypeOf(obj));

// obj = Object.create(origin);
// console.dir(obj.name);
// obj.age = 20;
// console.log(origin.age);


