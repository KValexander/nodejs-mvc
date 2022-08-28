const create = {
		
	/* Create html elements */
	html: function(object) {
		let result = "";

		if(Array.isArray(object)) {
			for(let i = 0; i < object.length; i++) {
				result += create.html(object[i]);
			}
		}

		else if("element" in object) {

			result = document.createElement(object.element);
			delete object.element;

			for(let key in object) {

				if(Array.isArray(object[key])) {

					for(let i = 0; i < object[key].length; i++) {
						result.appendChild(create.html(object[key][i]));
					}

				}

				else {
					if(object[key]) {
						result[key] = object[key];
					}
				}

			}

		}

		return result;
	}

};