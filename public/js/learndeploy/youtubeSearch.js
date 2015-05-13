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
					},
					appendTo: $("#addMediaModal")
				});

/* Search button */
$('button#searchYouTube').click(function() {
	var value = $('input#youtube').val();
	$.youtubeAPI(value);
});

$.displayYoutubeResult = function(item) {
	var result = $('<div/>', {class : 'youtube'})
		.append($('<img>', {src : item.snippet.thumbnails.default.url, alt : ''}))
		.append($('<h3/>')
				.append($('<a/>', 
						{ href : 'javascript:void(0)', 
							onclick : "$.youtubePlay('" + item.id.videoId + "', 'https://www.youtube.com/v/" + item.id.videoId + "?version=3&amp;f=videos&amp;app=youtube_gdata&amp;autoplay=1')"}).html(item.snippet.title)))
		.append($('<p/>').html(item.snippet.description));
	return result;
}


/* YouTube Search Function */
$.youtubeAPI = function(word) {
	var results = $('#searchResults .panel-body');
	var apiKey = 'AIzaSyAnLqIk7Olo7hT1L8GAcM0Icc6sbj1SCqI';
	results.html('Searching...');
	$
			.ajax({
				type : 'GET',
				url : 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + word
						+ '&maxResults=15&key=' + apiKey,
				dataType : 'jsonp',
				success : function(response) {
					// console.log("response: " + JSON.stringify(response.items, null,
					// 4));
					if (response.items) {
						results.empty();						
						$
								.each(
										response.items,
										function(i, item) {
											results
													.append($.displayYoutubeResult(item))
													.append($('<div/>', {id : item.id.videoId}));
											
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
	$('.youtubePlay').slideUp().empty();
	$('#' + yid)
			.slideDown()
			.html(
					'<iframe src="'
							+ frame
							+ '" style="width: 100%; box-sizing: border-box; height: 300px" />');
}
