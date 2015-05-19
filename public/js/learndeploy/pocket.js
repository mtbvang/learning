/* 
NOTE: The Trello client library has been included as a Managed Resource.  To include the client library in your own code, you would include jQuery and then

<script src="https://api.trello.com/1/client.js?key=your_application_key">...

See https://trello.com/docs for a list of available API URLs

The API development board is at https://trello.com/api

The &dummy=.js part of the managed resource URL is required per http://doc.jsfiddle.net/basic/introduction.html#add-resources
 */
var pocketIsAuthorized = false;
var pocketConsumerKey = "41238-121a338b71441f7506da66ff";
var pocketRequestToken = "3efa7fd8-b02e-c01d-106f-ebb9bc";
var pocketAccessToken = undefined;

var onAuthorizePocket = function() {
	updateLoggedInPocket();
	$("#outputPocket").empty();

};

var updateLoggedInPocket = function() {
	var isLoggedIn = pocketAuthorized();
	$("#loggedout").toggle(!isLoggedIn);
	$("#loggedinTrello").toggle(false);
	$("#loggedinPocket").toggle(isLoggedIn);
};

var logoutPocket = function() {
	pocketDeauthorise();
	updateLoggedInPocket();
};

var pocketAuthorized = function() {
	console.log("Authorization status: " + pocketIsAuthorized);
	return pocketIsAuthorized;
};

var pocketDeauthorise = function() {
	console.log("Deauthorizing Pocket...");
	pocketIsAuthorized = false;
}

var pocketAuthorize = function() {
	console.log("Authorizing Pocket...");
	var url = "https://getpocket.com/auth/authorize";
	jQuery.support.cors = true;

	// https://getpocket.com/auth/authorize?request_token=4248c8e1-3107-33b5-c364-fa963d&redirect_uri=http://learn.cfir.foundersapps.local:3002/static/index.html
	$.ajax({
		url : url,
		data : {
			"request_token" : pocketRequestToken,
			"redirect_uri" : "http://learn.cfir.foundersapps.local:3002/static/index.html",
		},
		type : "POST",
		dataType : "json", // "xml", "json"
		jsonpCallback : function() {
			console.log("authorize response: " );
		},
		// contentType : "application/x-www-form-urlencoded; charset=utf-8",
		crossDomain : true,
		success : function(data) {
			console.log("authorize response: " + data.toString());
			pocketIsAuthorized = true;
			/*
			 * $.ajax({ url : url, data : { "request_token" : pocketRequestToken,
			 * "redirect_uri" :
			 * "http://learn.cfir.foundersapps.local:3002/static/index.html" }, type :
			 * "POST", timeout : 30000, dataType : "text", // "xml", "json" //
			 * crossDomain : true, success : function(data) {
			 * 
			 * $('#outputPocket').html("result: " + data); }, error : function(jqXHR,
			 * textStatus, ex) { alert(textStatus + "," + ex + "," +
			 * jqXHR.responseText); } });
			 */

			$('#outputPocket').html("result: " + data);
		},
		error : function(jqXHR, textStatus, ex) {
			console.log("Authorization failed: " + textStatus + "," + ex + "," + jqXHR.responseText);
		}
	});

	onAuthorizePocket();
};

$("#connectLinkPocket").click(function() {
	pocketAuthorize();
});

$("#disconnectPocket").click(logoutPocket);
