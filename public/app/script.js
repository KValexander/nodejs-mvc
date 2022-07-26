/* 	You can write your own client start function and error page
	The client.start() function must contain the client.search() function
	client.start = function() {}
	client.error_page = function() {}
*/
client.start = function() {
	out.selector("body", component.get("layout"));
	client.search();
};

/*  Start client
	Must be at the bottom to work correctly.
*/
window.addEventListener("DOMContentLoaded", client.start);