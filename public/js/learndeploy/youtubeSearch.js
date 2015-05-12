/* AutoComplete */
$("#youtube")
		.autocomplete(
				{
					source : function(request, response) {
						/* Google developer ID (not mandatory) */
						var apiKey = 'AIzaSyAnLqIk7Olo7hT1L8GAcM0Icc6sbj1SCqI';
						/* Search terms */
						var query = request.term;
						/* YouTube query */
						$
								.ajax({
									url : "http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q="
											+ query
											+ "&key="
											+ apiKey
											+ "&format=5&alt=json&callback=?",
									dataType : 'jsonp',
									success : function(data, textStatus, request) {
										response($.map(data[1], function(item) {
											return {
												label : item[0],
												value : item[0]
											}
										}));
									}
								});
					},
					/* You could use this to make the selection process until */
					select : function(event, ui) {
						$.youtubeAPI(ui.item.label);
					}
				});

/* Search button */
$('button#submit').click(function() {
	var value = $('input#youtube').val();
	$.youtubeAPI(value);
});

/* YouTube Search Function */
$.youtubeAPI = function(word) {
	var results = $('#results');
	var apiKey = 'AIzaSyAnLqIk7Olo7hT1L8GAcM0Icc6sbj1SCqI';
	results.html('Searching...');
	$
			.ajax({
				type : 'GET',
				url : 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + word
						+ '&maxResults=15&key=' + apiKey,
				dataType : 'jsonp',
				success : function(response) {
					console.log("response: " + JSON.stringify(response.items, null, 4));
					if (response.items) {
						results.empty();
						$
								.each(
										response.items,
										function(i, item) {
											results
													.append('<div class="youtube">\
                        <img src="'
															+ item.snippet.thumbnails.default.url
															+ '" alt="" />\
                        <h3><a href="javascript:void(0)" onclick="$.youtubePlay(\''
															+ item.id.videoId
															+ '\', \''
															+ 'https://www.youtube.com/v/'
															+ item.id.videoId
															+ '?version=3&f=videos&app=youtube_gdata&autoplay=1'
															+ '\')">'
															+ item.snippet.title
															+ '</a></h3>\
                        <p>'
															+ item.snippet.description
															+ '</p>\
                    </div>\
                    <div class="youtubeOynat" id="'
															+ item.id.videoId + '"></div>');
										});
					} else {
						results.html('<div class="hata"><strong>' + word
								+ '</strong> no related videos found!</div>');
					}
				}
			});
}

/* YouTube Video Playback Function */
$.youtubePlay = function(yid, frame) {
	$('.youtubeOynat').slideUp().empty();
	$('#' + yid)
			.slideDown()
			.html(
					'<iframe src="'
							+ frame
							+ '" style="width: 100%; box-sizing: border-box; height: 300px" />');
}
