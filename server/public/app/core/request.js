/* Requests */
const request = {

	/* Text */
	text: async function(url, object={}) {
		let result;

		result = await this.get(url);
		result = await result.text();

		return result;
	},

	/* JSON */
	json: async function(url) {
		let result;
		
		result = await this.get(url);
		result = await result.json();

		return result;
	},

	/* Get request */
	get: async function(url, data="", headers={}) {
		let result;
		
		try {
			result =  await fetch(url);
		} catch(err) {
			result = err;
		}

		return result;
	},

	/* Post request */
	post: async function(url, data="", headers={}) {
		let result;
		
		try {
			result = await fetch(url,
			{ 
				method: "POST",
				headers: headers,
				body: data
			});
		} catch(err) {
			result = err;
		}

		return result;
	}

};