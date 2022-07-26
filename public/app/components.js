/* Layout component */
component.add("layout", function() {
	return (`
		<header>
			<div class="content">
				<h2>{{ this.title }}</h2>
				{{ menu }}
			</div>
		</header>
		<main>
			<div class="content">
				{{ this.content }}
			</div>
		</main>
	`);
});

/* Menu component */
component.add("menu", function() {
	return (`<hr>
		<nav>
			<a id="link" href="/">Home</a> |
			<a id="link" href="/register">Register</a> |
			<a id="link" href="/login">Login</a>
		</nav>
	<br>`);
});