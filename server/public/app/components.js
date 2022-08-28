component.add({
	layout: () => `
		<div id="#app">
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
		</div>
	`,

	// menu: () => `
	// 	<hr>
	// 		<nav>
	// 			<a id="link" href="/">Home</a> |
	// 			<a id="link" href="/register">Register</a> |
	// 			<a id="link" href="/login">Login</a>
	// 		</nav>
	// 	<br>
	// `,

	register_form: () => `
		<form id="event" data-onsubmit="controllers.register" action="/api/register" method="POST">
			<input type="text" name="name" placeholder="Name" required><p>
			<input type="text" name="surname" placeholder="Surname" required><p>
			<input type="email" name="email" placeholder="E-mail" required><p>
			<input type="text" name="login" placeholder="Login" required><p>
			<input type="password" name="password" placeholder="Password" required><p>
			<button>Submit</button>
		</form>
	`,
});

/* Layout component */
// component.add("layout", function() {
// 	return (`
// 		<div id="#app">
// 			<header>
// 				<div class="content">
// 					<h2>{{ this.title }}</h2>
// 					{{ menu }}
// 				</div>
// 			</header>
// 			<main>
// 				<div class="content">
// 					{{ this.content }}
// 				</div>
// 			</main>
// 		</div>
// 	`);
// });

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

/* Register form */
// component.add("register_form", function() {
// 	return (`
// 		<form id="event" data-onsubmit="controllers.register" action="/api/register" method="POST">
// 			<input type="text" name="name" placeholder="Name" required><p>
// 			<input type="text" name="surname" placeholder="Surname" required><p>
// 			<input type="email" name="email" placeholder="E-mail" required><p>
// 			<input type="text" name="login" placeholder="Login" required><p>
// 			<input type="password" name="password" placeholder="Password" required><p>
// 			<button>Submit</button>
// 		</form>
// 	`);
// });