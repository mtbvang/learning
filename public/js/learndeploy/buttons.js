var cornerBtnElement = function(glyphiconType, id) {

	//console.log("id: " + id);
	videoId = id.substring(id.length - 11);
	//console.log("videoId: " + videoId);
	var el = $('<div/>', {
		class : 'zero-corner-btn'
	}).append($('<span/>', {
		class : 'btn corner-btn',
		onclick : "return addYouTubeVideo('" + videoId + "');"
	}).append($('<a/>', {
		//class : 'btn',
		id : id,
		href : 'javascript:void(0);'		
	}).append($('<i/>', {
		class : 'glyphicon glyphicon-' + glyphiconType
	}))));

	return el
}