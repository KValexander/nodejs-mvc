const layout = () => {
	return (`
		<header>
			<div class="content">
				{{ header }}
			</div>
		</header>
		<main>
			<div class="content">
				{{ this.content }}
			</div>
		</main>
		<footer>
			<div class="content">
				{{ footer }}
			</div>
		</footer>
	`);
}

module.exports = layout;