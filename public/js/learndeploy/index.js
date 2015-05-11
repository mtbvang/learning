/* 
NOTE: The Trello client library has been included as a Managed Resource.  To include the client library in your own code, you would include jQuery and then

<script src="https://api.trello.com/1/client.js?key=your_application_key">...

See https://trello.com/docs for a list of available API URLs

The API development board is at https://trello.com/api

The &dummy=.js part of the managed resource URL is required per http://doc.jsfiddle.net/basic/introduction.html#add-resources
 */

var listMemberCards = function() {
	Trello.members.get("me", function(member) {
		$("#fullName").text(member.fullName);

		var $cards = $("<div>").text("Loading Cards...").appendTo("#output");
		var $boards = $("<div>").text("Loading Boards...").appendTo("#output");

		// Output a list of all of the cards that the member
		// is assigned to
		Trello.get("members/me/cards", function(cards) {
			$cards.empty();
			$("<div>").text("Click a card to add a comment to it").appendTo(
					$cards);

			$.each(cards, function(ix, card) {
				$("<a>").addClass("card").text(card.name).appendTo($cards)
						.click(
								function() {
									Trello.post("cards/" + card.id
											+ "/actions/comments", {
										text : "Hello from LearnDeploy"
									})
								})
			});
		});

		// Output all boards belonging to member.
		Trello.get("members/me/boards", function(boards) {
			$boards.empty();

			$("<div>").text("Click a board to import it").appendTo($boards);

			$.each(boards, function(ix, board) {
				console.log("board name: " + board.name)
				$("<a>").addClass("board").text(board.name).appendTo($boards)
						.click(function() {
							console.log("clicked board " + board.name)

						})
			});
		});

	});
}

var getCardCol = function(parentElement) {
	var $cardRow = $("<div class='row voffset2' />").appendTo(parentElement);

	var $cardCol = $("<div class='col-lg-12'></div>").appendTo($cardRow);

	var $cardColDiv = $("<div/>").appendTo($cardCol);

	return $cardColDiv;
};

var displayCards = function(cards) {
	$outputCards = $("#outputCards")// .empty()

	$.each(cards, function(ix, card) {

		var cardNum = ix + 1;
		var $cardSection = $(
				"<section id='cardSection" + ix + "' class='well well-sm' />")
				.appendTo($outputCards);

		var $cardItems = $("<div/>", {
			"id" : "cardItems" + ix
		}).appendTo($cardSection);

		// Add editable icon
		var editIconDiv = getCardCol($cardItems);
		var editIconId = "editable-toggle" + ix
		var $editIcon = $("<a>").attr({
			"id" : editIconId,
			"href" : "javascript:void(0);",
			"class" : "btn btn-default pull-right",
		}).append($("<i>").attr({
			"class" : "glyphicon glyphicon-edit"
		})).appendTo(editIconDiv);

		// enable / disable editing for
		$("#editable-toggle" + ix).click(function() {
			$("#cardSection" + ix + " .editable").editable('toggleDisabled');
		});

		// Add card title
		var cardTitleDiv = getCardCol($cardItems);
		var $cardTitle = $("<a>").attr({
			href : card.url,
			target : "trello"
		}).text("Trello Card " + cardNum + ": " + card.name.toUpperCase())
				.appendTo(cardTitleDiv);
		$cardTitle.editable("disable", true);

		$("<br>").appendTo($cardTitle);

		// Add textarea with card description
		var cardTextAreaDiv = getCardCol($cardItems);
		var $textArea = $("<a/>", {
			"id" : "textarea" + ix
		}).text(card.desc).appendTo(cardTextAreaDiv);
		// $textArea.autosize();

		// make outputcards editable
		$textArea.editable({
			type : "textarea",
			placeholder : "Card description",
			title : "Trello Card Description",
		});
		$textArea.editable("disable", true);

		// Add new media button
		var cardAddMediaButtonDiv = getCardCol($cardSection);
		var $mediaButton = $("<a>").attr({
			"href" : "#addMediaModal",
			"data-toggle" : "modal",
			"data-card-id" : ix
		}).addClass("btn btn-sm btn-primary pull-right").text("Add new media").appendTo(
				cardAddMediaButtonDiv);


		// Add cardId to modal so we an add media back to the correct card.
		$("#addMediaModal").on("show.bs.modal", function(e) {
			var cardId = $(e.relatedTarget).data('card-id');
			console.log("cardId: " + cardId);
			$(e.currentTarget).data("cardId", cardId);
			// console.log("addMediaModal.data: " +
			// $(e.currentTarget).data("cardId"));
		});

	});
};

var displayCardsForBoard = function() {
	var selectedBoard = $("#boards").val();
	var boardName = $("#boards option[value='" + selectedBoard + "']").text();
	// Clear outputCards to only show select board's cards.
	$("#outputCards").empty();
	var $cards = $("<div>").text("List: " + boardName).appendTo("#outputCards");
	var $cards = $("<div>").text("Tasks").appendTo("#outputCards");

	// Output all of the cards for the selected board.
	var resource = "boards/" + selectedBoard + "/cards";
	console.log("resource: " + resource);
	Trello.get(resource, displayCards);
}

// Populates select with boards and sets change event to displayCardsForBoard().
var populateSelectWithBoards = function() {
	Trello.members.get("me", function(member) {
		$("#fullName").text(member.fullName);

		// Set change event to trigger displayCardsForBoard on select.
		var $boards = $("<select>").attr("id", "boards").appendTo("#output")
				.change(displayCardsForBoard);

		// Populate select with users boards.
		Trello.get("members/me/boards", function(boards) {
			$boards.empty();
			$.each(boards, function(ix, board) {
				$("<option>").attr({
					href : board.url,
					target : "trello",
					value : board.id
				}).addClass("board").text(board.name).appendTo($boards);
			});
		});

	});
}

var onAuthorize = function() {
	updateLoggedIn();
	$("#output").empty();

	populateSelectWithBoards();

};

var updateLoggedIn = function() {
	var isLoggedIn = Trello.authorized();
	$("#loggedout").toggle(!isLoggedIn);
	$("#loggedin").toggle(isLoggedIn);
};

var logout = function() {
	Trello.deauthorize();
	updateLoggedIn();
};

Trello.authorize({
	interactive : false,
	success : onAuthorize
});

$("#connectLink").click(function() {
	Trello.authorize({
		type : "popup",
		success : onAuthorize,
		scope : {
			write : true,
			read : true
		},
		name : "LearnDeploy"
	})
});

$("#disconnect").click(logout);

$(document).ready(function() {
	// toggle `popup` / `inline` mode
	$.fn.editable.defaults.mode = 'popup';

});
