var express = require('express');

var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

var app = express();
urls = [];
request('http://www.reddit.com',function(err,resp,body){
	if(!err && resp.statusCode == 200){
		var $ =cheerio.load(body);
		// vs (html)

		$('a.title','#siteTable').each(function(){
			var url = $(this).attr('href');
			if(url.indexOf('i.imgur.com')!=-1){
							urls.push(url);

			}
		});
		console.log(urls);
		for(var i =0; i<urls.length;i++){
			request(urls[i]).pipe(fs.createWriteStream('img/' + i + '.jpg'));
		}
	}
});
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
	res.render('index');
});

var server = app.listen(5787, function() {
	console.log('Express server listening on port ' + server.address().port);
});
