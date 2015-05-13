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
		cardColYouTubeVideo.attr({
			"class" : "auto-resizable-iframe"
		});

		// Add all selected videos to card.
		setNewYouTubeMedia.forEach(function(id, id2, set) {
			// console.log("Inside anonymous function. $cardItems:" +
			// $cardItems.toString());

			var divId = "card" + cardId + "-" + id
			var mediaDiv = $("<div id=" + divId + " />").appendTo(cardColYouTubeVideo);

			// var mediaDiv = $("#" + divId + "")

			mediaDiv.tubeplayer({
				width : '100%', // the width of the player
				height : '300', // the height of the player
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

var closeAddMediaModal = function() {
	// clear all data associated with modal.
	setNewYouTubeMedia.clear();
	$("#searchResults .panel-body").empty();
	console.log("Size of setNewYouTubeMedia: " + setNewYouTubeMedia.size);

	$('#addMediaModal').modal('toggle');
}

var addYouTubeVideo = function(id) {

	if (id) {
		setNewYouTubeMedia.add(id);
		console.log("Adding " + $("#youtubeVideoId").val() + " to setNewYouTubeMedia of size: " + setNewYouTubeMedia.size);
	} else {
		console.log("Empty youtube videoid: " + id);
		console.log("setNewYouTubeMedia size: " + setNewYouTubeMedia.size);
	}

}