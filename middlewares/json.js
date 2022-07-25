/* json middleware */
const json = (request, response) => {
	response.setHeader("Content-Type", "application/json");
	return true;
};

/* Export */
module.exports = json;