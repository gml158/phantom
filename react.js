var webpage = require('webpage');
var page = webpage.create();

page.open("http://localhost/react/index.html",function(s){
	console.log(s);
	page.render('react/index.png');
	phantom.exit();
})
