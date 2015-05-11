var handleAddYouTubeVideo = function() {
	
	$outputCards = $("#outputCards")
	
	
	// Get card id in modal
	var cardId = $("#addMediaModal").data("cardId");
	console.log("handleAddMedia called with cardId: " + cardId);
	console.log("youTubeId: " + $("#youTubeId").val());
	
	// Embed youtube video after card textarea.
	var $cardItems = $("#cardItems"+cardId) 
	
	var cardColYouTubeVideo = getCardCol($cardItems);
	
	var youTubeId = $("#youTubeId").val();
	var divId = "card" + cardId + "-" + youTubeId
	$("<div id="+divId+" />").appendTo(cardColYouTubeVideo);
	
	var mediaDiv = $("#"+divId+"")
	
	mediaDiv.tubeplayer({
	    width: "100%", // the width of the player
	    //height: 450, // the height of the player
	    allowFullScreen: "true", // true by default, allow user to go full screen
	    initialVideo: youTubeId, // the video that is loaded into the player
	    preferredQuality: "default",// preferred quality: default, small, medium, large, hd720
	    onPlay: function(id){}, // after the play method is called
	    onPause: function(){}, // after the pause method is called
	    onStop: function(){}, // after the player is stopped
	    onSeek: function(time){}, // after the video has been seeked to a defined point
	    onMute: function(){}, // after the player is muted
	    onUnMute: function(){} // after the player is unmuted
	});
	
	// Add youtube video description
	var $textArea = $("<textarea/>", {
		"class" : "form-control input-xlarge",
		"id" : "textarea" + youTubeId,
		"rows" : "1"
	}).text($("#modalDescriptionTextArea").val()).appendTo(cardColYouTubeVideo);
	$textArea.autosize();
	
	$('#addMediaModal').modal('toggle');
	
}