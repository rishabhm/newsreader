$(document).ready(function () {

	var articles = [],
		count, i =0,
		playing_gap = false ;

	// $.get('/get_news', function (data) {
	// 	console.log(data)
	// 	$(data.body).find('item').each(function () {
	// 		console.log($(this)[0].innerText.split('http')[0])
	// 	})
	// })

	$.get('/get_news', function (data) {
		articles = data.filter(function (e) {
			return e.text.trim().length > 0;
		});
		count = articles.length,
		$('#player').attr('src', contruct_url(articles[i].text))
		$('#player')[0].play()
		i++;
	})

	$('#player').on('ended', function () {
		if (i<count && !playing_gap) {
			i++;
			playing_gap = true;
			$('#player').attr('src', contruct_url("   next headline   "))
			$('#player')[0].play()
		} else {
			$('#player').attr('src', contruct_url(articles[i].text))
			$('#player')[0].play()
			playing_gap = false;
		}
	})
})


function contruct_url(str) {
	return "http://api.voicerss.org?key=126c7eab47e14afab8281791b6da6f77&src="+encodeURI(str)+"&hl=en-in"
}