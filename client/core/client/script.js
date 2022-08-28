const script = {
	get: (href) => {
		let route = "/href"+href;
		fetch(route).then(res => res.text()).then(res => {
			document.getElementById("app").innerHTML = res;
			script._events();
		}); window.history.pushState(null,null,href);
	},
	_events: () => {
		let items = document.querySelectorAll("a");
		items.forEach(a => a.addEventListener("click", e => {
			e.preventDefault();
			script.get(e.target.getAttribute("href"));
		}));
	},
}; window.addEventListener("DOMContentLoaded", () => script.get(location.pathname));