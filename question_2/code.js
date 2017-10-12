// 理解参数的传递和引用类型的值
function setName (obj) {
	obj.name = 'Jace';
	obj = new Object();
	obj.name = 'Change';
}

let persion = new Object();
setName(persion);
console.log(persion.name);
// 请给出打印值