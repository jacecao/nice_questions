// 针对code.js做一个修复
/*
** node 环境中运行该代码
 */
// 当然这里结果也会出现
// 能分析出为什么吗？
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

global.getName = function () {
	console.log(4);
}

function getName () {
	console.log(5);
}

Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();