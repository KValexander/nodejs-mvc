/* Connect */
let connect = {

	/* Basis */
	core: function() {
		connect.script([
			"/public/app/core/component.js",
			"/public/app/core/request.js",
			"/public/app/core/route.js",
			"/public/app/core/out.js",
			"/public/app/routes.js",
			"/public/app/core/client.js"
		]);
	},
	
	/* Script */
	script: function(src) {
		if(!src) {
			return;	
		}

		if(Array.isArray(src)) {
			for(let i = 0; i < src.length; i++) {
				connect._create(src[i], "script");
			}
		}

		else {
			connect._create(src, "script")
		}
	},

	/* Create element */
	_create: function(path, type) {
		let element;
		
		element = document.createElement(type);

		switch(type) {
			case "script":
				element.type = "text/javascript";
				element.src = path;
			break;
		}
		console.log(element);
		document.querySelector("head").appendChild(element);
	},

};
