var page = require('webpage').create();
var url = 'http://www.w3school.com.cn/';

page.open(url, function(s){
	page.render('w3chool.png');
});
