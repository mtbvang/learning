var gapiKey = 'AIzaSyAnLqIk7Olo7hT1L8GAcM0Icc6sbj1SCqI';

/* AutoComplete */
$("#youtube")
		.autocomplete(
				{
					source : function(request, response) {
						/* Google developer ID (not mandatory) */
						var gapiKey = 'AIzaSyAnLqIk7Olo7hT1L8GAcM0Icc6sbj1SCqI';
						/* Search terms */
						var query = request.term;
						/* YouTube query */
						$
								.ajax({
									url : "http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q="
											+ query
											+ "&key="
											+ gapiKey
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
						$.youtubeAPISearch(ui.item.label);
					},
					appendTo: $("#addMediaModal")
				});

/* Search button */
$('button#searchYoutube').click(function() {
	var q = $('input#youtube').val();
	if(q) {
		// console.log("Searching for videos: " + q);
		var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + q
		+ '&maxResults=3&key=' + gapiKey;
		$.youtubeAPISearch(q, url);
	} else {
		// console.log("Empty youtube search value.");
	}
});

/* Search by id button */
$('button#searchYoutubeVideoId').click(function() {
	var q = $('input#youtubeVideoId').val();
	if(q) {
		// console.log("Searching for video id: " + q);
		var url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + q
		+ '&key=' + gapiKey;
		$.youtubeAPISearch(q, url);
	} else {
		// console.log("Empty youtube search value.");
	}
	
});

$.displayYoutubeResult = function(item) {
	var videoId = item.id.videoId ? item.id.videoId : item.id;
	var result = $('<div/>', {class : 'hightlight youtube'})
		.append($('<img/>', {src : item.snippet.thumbnails.default.url}))
		.append($('<h3/>')
				.append($('<a/>', 
						{ href : 'javascript:void(0)', 
							onclick : "$.youtubePlay('" + videoId + "', 'https://www.youtube.com/v/" + videoId + "?version=3&amp;f=videos&amp;app=youtube_gdata&amp;autoplay=0')"}).html(item.snippet.title)))
		.append($('<p/>').html(item.snippet.description));
	return result;
}


/* YouTube Search by Id */
$.youtubeAPISearch = function(id, searchURL) {
	var results = $('#searchResults .panel-body');
	var gapiKey = 'AIzaSyAnLqIk7Olo7hT1L8GAcM0Icc6sbj1SCqI';
	results.html('Searching...');
	$
			.ajax({
				type : 'GET',
				// https://www.googleapis.com/youtube/v3/videos?part=snippet&id=mh45igK4Esw&key={YOUR_API_KEY}
				url : searchURL,
				dataType : 'jsonp',
				success : function(response) {
					// //console.log("response: " + JSON.stringify(response.items, null,
					// 4));
					if (response.items) {
						results.empty();						
						$
								.each(
										response.items,
										function(i, item) {
											results
													.append($('<div/>', {id : (item.id.videoId ? item.id.videoId : item.id)})
															.append(cornerBtnElement('plus', 'addYoutube-' + (item.id.videoId ? item.id.videoId : item.id)))
															.append($.displayYoutubeResult(item))
															.append($('<div/>', {id : "slidedown-" + (item.id.videoId ? item.id.videoId : item.id)}))
													);
																										
											
										});
					} else {
						results.html('<div><strong>' + id
								+ '</strong> no related videos found!</div>');
					}
				}
			});
}

https:// www.googleapis.com/youtube/v3/videos?part=snippet&id=mh45igK4Esw&key={YOUR_API_KEY}

/* YouTube Video Playback Function */
$.youtubePlay = function(yid, frame) {
	$('.youtubePlay').slideUp().empty();
	var slidedown = $('#slidedown-' + yid)
			.slideToggle();
	
	// Display video in slidedown using jQuery TubePlayer Plugin.
	slidedown.tubeplayer({
		width : '100%', // the width of the player
		height : '300px', // the height of the player
		allowFullScreen : "true", // true by default, allow user to go full
		// screen
		initialVideo : yid, // the video that is loaded into the player
		preferredQuality : "default",// preferred quality: default, small,
		// medium, large, hd720
		onPlay : function(id) {}, // after the play method is called
		onPause : function() {}, // after the pause method is called
		onStop : function() {}, // after the player is stopped
		onSeek : function(time) {}, // after the video has been seeked to a
		// defined
		// point
		onMute : function() {}, // after the player is muted
		onUnMute : function() {} // after the player is unmuted
	});

}
