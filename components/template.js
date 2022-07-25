const template = () => {
	return (`
		<h1>{{ this.name }}</h1>
		<h2>{{ this.surname }}</h2>
	`);
}

module.exports = template;