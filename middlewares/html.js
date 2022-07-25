/* html middleware */
const html = (request, response) => {
	response.setHeader("Content-Type", "text/html");
	return true;
};

/* Export */
module.exports = html;