console.log("Start...");

var     webPage = require("webpage"),
	args = require('system').args,
	page = webPage.create(),
	fs = require('fs');

var settings = {
	operation:"GET",
	encodeing:"utf8",
	headers:{
		"Content-Type":"text/html"
	},
	data:JSON.stringify({
		some:"data",
		another:["custom","data"]
	
	})
	
};

phantom.addCookie({
	'name':'jsessionid',
	'value':'30f6044293bb961ae78e7c9f4b9cf8ea',
	'domain':'192.168.224.213',
	'path':'/',
	'httponly':true,
	'secure':false,
	'expires':(new Date()).getTime() + (1000 * 60 * 60)
});


var pageWidth = parseInt(args[1]) || 1300, pageHeight = parseInt(args[2]) || 676;
page.paperSize = {
	width: pageWidth + 'px',
	height:pageHeight + 'px'
};
page.settings.userAgent = 'WebKit/534.46 Mobile/9A405 Safari/7534.48.3';

page.settings.viewportSize = {
	width: pageWidth,
	height: pageHeight
};
//page.clipRect = {top:0, left:0, width:page.viewportSize.width, height:page.viewportSize.height};
console.log(args);
var dirname = 'test/' + pageWidth + '-' + pageHeight;
console.log(dirname);

fs.exists(dirname + '/', function(exists) {
	console.log('是否存在' + exists);
	if(!exists) {
		console.log('创建文件夹');
		fs.mkdirSync(dirname + '/');
	}
})
	

page.open("http://192.168.224.213/index.html#category&type=images", settings, function(s) {
	console.log("loading finish");
	console.log(s);

	console.log("Start JS script..." + new Date().getTime());
	var title = page.evaluate(function(){
		return document.title;
	});
	console.log("page title is    " + title);
	console.log(new Date().getTime());

	var cookies = page.cookies;
	console.log('Listing cookies:');

	for(var i in cookies) {
		console.log(cookies[i].name + '=' + cookies[i].value);
	
	}

	console.log('pagesWindowName:' + page.pagesWindowName);
	var content = page.evaluate(function() {
		var ele = document.querySelector('.filedesc a');
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent(
			'click',
			true,
			true,
			window,
			1,
			1,1,1,1,
			false,
			false,
			false,
			false,
			0,
			ele
		);
		ele.dispatchEvent(evt);
		// return ele;
	});
	console.log(content);
		
	
	setTimeout(function(){
		console.log('come in settimeout');
		page.render(dirname + '/' + (new Date()).getTime() +'.png');

		
		

	phantom.exit();
	}, 2000);
})


