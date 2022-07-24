/* Requests */
const request = {
	_req: async function(method, url, data="", headers={}) {
		let result;
		
		try {
			result = {
				code: 200,
				content:
					await fetch(url, {
						method: method,
						headers: headers,
						body: data
					}),
			}
		} catch(err) {
			result = {
				code: 400,
				content: err
			}
		}

		return result;
	},

	get: async function(url, data="", headers={}) {
		return await this._req("GET", url, data, headers);
	},

	post: async function(url, data="", headers={}) {
		return await this._req("POST", url, data, headers);
	}

};

