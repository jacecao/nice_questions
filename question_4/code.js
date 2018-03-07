const Book = function (title, time, type) {
	this.title = title;
	this.time = time;
	this.type = type;
}

let book = Book('js', '2018', 'code');
// 请问book的值是什么？
// Book()究竟做了什么
// 如何实现对象的安全模式