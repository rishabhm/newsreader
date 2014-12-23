var mongoose 	= require('mongoose'),
	Users 		= mongoose.model('Users'),
	scrape 		= require('scrape'),
	unirest 	= require('unirest'),
	api_key 	= '126c7eab47e14afab8281791b6da6f77';

exports.home = function (req, res) {
	res.render('home')
}

exports.get_audio = function (req, res) {
	unirest.post('http://api.voicerss.org/')
		   .send({key : api_key, src : "The Governor of Gujarat", hl : 'en-in'})
		   .end(function (response) {
		   		res.send(response)
		   })
}

exports.get_news = function (req, res) {
	var headlines = [];
	scrape.request('http://economictimes.indiatimes.com/headlines.cms', function (err, $) {
	    if (err) return console.error(err);
	    $('ul.headlineData li').each(function (li) {
	    	li.find('a').each(function (a) {
	    		headlines.push({
	    			url : a.attribs.href,
	    			text : a.text
	    		})
	    	})
	    })
		res.send(headlines)
	});
	// unirest.get('http://news.google.com/news?q=india+finance&output=rss', function (data) {
	// 	res.send(data)
	// })
}