{
	// 函数表达式和变量提升
	let a = 1;
	function b () {
		a = 2;
		function a () {}
		return a;
	}
	let c = b();
	console.log(a);
	console.log(c);
	// 猜猜这里面的代码是如何执行的？
}