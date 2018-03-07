// 理解参数的传递和引用类型的值
function setName (obj) {
	obj.name = 'Jace';
	obj = new Object();
	obj.name = 'Change';
}

let person = new Object();
setName(person);
console.log(person.name);
// 请给出打印值