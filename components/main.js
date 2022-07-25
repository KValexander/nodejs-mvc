const main = () => {
	return (`
		{{ header }}
		<h1>Main page</h1>
		{{ menu }}
		{{ this.content }}
		{{ this.code.first }}
	`);
}

module.exports = main;