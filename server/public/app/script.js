/* 	You can write your own client start function and error page
	The client.start() function must contain the client.search(location.pathname, true) function
	client.start = function() {}
	client.error_page = function() {}
*/
client.start = function() {
	out.selector("body", component.get("layout"));
	client.search(location.pathname, true);
};

/*  Start client
	Must be at the bottom to work correctly.
*/
window.addEventListener("DOMContentLoaded", client.start);