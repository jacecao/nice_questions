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

let getName = function () {
	console.log(4);
}

function getName () {
	console.log(5);
}

Foo.getName();
getName();
Foo().getName(); // ? 为什么这里会出错呢？ 烧脑时间来啦
getName();
new Foo.getName();
new Foo().getName(); 
new new Foo().getName();