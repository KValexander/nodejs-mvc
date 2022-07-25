const out = {

	id: function(id, content) {
		document.getElementById(id).innerHTML = content;
	},

	selector: function(selector, content) {
		document.querySelector(selector).innerHTML = content;
	}

};