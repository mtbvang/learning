var handleAddYouTubeVideo = function() {

	$outputCards = $("#outputCards")

	// Get card id in modal
	var cardId = $("#addMediaModal").data("cardId");
	console.log("handleAddMedia called with cardId: " + cardId);
	console.log("youTubeId: " + $("#youTubeId").val());

	// Embed youtube video after card textarea.
	var $cardItems = $("#cardItems" + cardId)

	var cardColYouTubeVideo = getCardCol($cardItems);
	cardColYouTubeVideo.attr({
		"class" : "auto-resizable-iframe"
	});

	var youTubeId = $("#youTubeId").val();
	var divId = "card" + cardId + "-" + youTubeId
	$("<div id=" + divId + " />").appendTo(cardColYouTubeVideo);

	var mediaDiv = $("#" + divId + "")

	mediaDiv.tubeplayer({
		width : '100%', // the width of the player
		height : '100%', // the height of the player
		allowFullScreen : "true", // true by default, allow user to go full
		// screen
		initialVideo : youTubeId, // the video that is loaded into the player
		preferredQuality : "default",// preferred quality: default, small,
		// medium, large, hd720
		onPlay : function(id) {
		}, // after the play method is called
		onPause : function() {
		}, // after the pause method is called
		onStop : function() {
		}, // after the player is stopped
		onSeek : function(time) {
		}, // after the video has been seeked to a defined point
		onMute : function() {
		}, // after the player is muted
		onUnMute : function() {
		} // after the player is unmuted
	});

	// Add youtube video description
	var $textArea = $("<a/>", { 
		"id" : "textarea" + youTubeId,
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

	$('#addMediaModal').modal('toggle');

}