var addMediaToCard = function() {
	$outputCards = $("#outputCards")

	// Get card id in modal
	var cardId = $("#addMediaModal").data("cardId");
	// console.log("handleAddMedia called with cardId: " + cardId);

	// Embed youtube video after trello card textarea.
	var $cardItems = $("#cardItems" + cardId)

	if (setNewYouTubeMedia.size > 0) {
		console.log("Adding video to card. setNewYouTubeMedia.size: " + setNewYouTubeMedia.size);
		var cardColYouTubeVideo = getCardCol($cardItems);

		// Add all selected videos to card.
		setNewYouTubeMedia.forEach(function(id, id2, set) {
			// console.log("Inside anonymous function. $cardItems:" +
			// $cardItems.toString());

			var divId = "card" + cardId + "-" + id
			var mediaDiv = $("<div id=" + divId + " />").appendTo(cardColYouTubeVideo);

			// var mediaDiv = $("#" + divId + "")

			mediaDiv.tubeplayer({
				width : '50%', // the width of the player
				height : '50%', // the height of the player
				allowFullScreen : "true", // true by default, allow user to go full
				// screen
				initialVideo : id, // the video that is loaded into the player
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

		});
	}

	if ($("#modalDescriptionTextArea").val()) {
		// Add youtube video description
		var $textArea = $("<a/>", {
			"id" : "textarea" + cardId,
		}).text($("#modalDescriptionTextArea").val()).appendTo(cardColYouTubeVideo);
		$textArea.autosize();

		// $("#modalDescriptionTextArea").autosize();

		// make outputcards editable
		$textArea.editable({
			type : "textarea",
			placeholder : "Youtube video description",
			title : "Youtube video description",
		});
		$textArea.editable("disable", true);
	}

	closeAddMediaModal();

	$('#addMediaModal').modal('toggle');

}

var addMediaToCard2 = function() {
	$outputCards = $("#outputCards")

	// Get card id in modal
	var cardId = $("#addMediaModal").data("cardId");
	// console.log("handleAddMedia called with cardId: " + cardId);

	// Embed youtube video after trello card textarea.
	var $cardItems = $("#cardItems" + cardId)

	if (setNewYouTubeMedia.size > 0) {
		console.log("Adding video to card. setNewYouTubeMedia.size: " + setNewYouTubeMedia.size);
		var cardColYouTubeVideo = getCardCol($cardItems);

		// Add all selected videos to card.
		setNewYouTubeMedia.forEach(function(videoDiv, videoDiv2, set) {
			// console.log("Inside anonymous function. $cardItems:" +
			// $cardItems.toString());

			videoDiv.appendTo(cardColYouTubeVideo);
		});

	}

	if ($("#modalDescriptionTextArea").val()) {
		// Add youtube video description
		var $textArea = $("<a/>", {
			"id" : "textarea" + cardId,
		}).text($("#modalDescriptionTextArea").val()).appendTo(cardColYouTubeVideo);
		$textArea.autosize();

		// $("#modalDescriptionTextArea").autosize();

		// make outputcards editable
		$textArea.editable({
			type : "textarea",
			placeholder : "Youtube video description",
			title : "Youtube video description",
		});
		$textArea.editable("disable", true);
	}

	closeAddMediaModal();

	$('#addMediaModal').modal('toggle');

}

var closeAddMediaModal = function() {
	// clear all data associated with modal.
	setNewYouTubeMedia.clear();
	$("#searchResults .panel-body").empty();
	console.log("Size of setNewYouTubeMedia: " + setNewYouTubeMedia.size);

	$('#addMediaModal').modal('toggle');
}

var removeYoutubeVideoFromCard = function(id) {
	console.log("removeYoutubeVideoFromCard entered. id: " + id);
	$("#" + id).remove();
}

var addYouTubeVideo = function(id) {

	if (id) {
		var video = $("#searchResults .panel-body #" + id);
		// change corner button to remove glyphicon

		// <span class="btn corner-btn" onclick="return
		// addYouTubeVideo('TK9oS7HS3Ng');">
		// <a id="addYoutube-TK9oS7HS3Ng" href="javascript:void(0);"><i
		// class="glyphicon glyphicon-plus"></i></a></span>
		video.find("span").attr("onclick", "return removeYoutubeVideoFromCard('" + id + "');");
		video.find("i").attr("class", "glyphicon glyphicon-minus");
		setNewYouTubeMedia.add(video);
		console.log("Adding " + $("#youtubeVideoId").val() + " to setNewYouTubeMedia of size: " + setNewYouTubeMedia.size);
	} else {
		console.log("Empty youtube videoid: " + id);
		console.log("setNewYouTubeMedia size: " + setNewYouTubeMedia.size);
	}

}