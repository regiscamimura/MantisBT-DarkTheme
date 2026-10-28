// Runs in <head>: applies the saved theme (or the OS preference) before the page paints,
// then adds the sun/moon switch to the navbar once the DOM exists.
(function () {
	var STORAGE_KEY = 'mantis-theme';
	var script = document.currentScript;
	var root = document.documentElement;

	function readSavedTheme() {
		try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
	}

	function saveTheme(theme) {
		try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* private mode: lasts this page only */ }
	}

	var systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	root.dataset.theme = readSavedTheme() || (systemPrefersDark ? 'dark' : 'light');

	document.addEventListener('DOMContentLoaded', function () {
		var navbarItems = document.querySelector('#navbar .navbar-buttons .ace-nav');
		if (!navbarItems) return;

		var item = document.createElement('li');
		item.className = 'grey dark-theme-switch';
		var button = document.createElement('a');
		button.href = '#';
		button.setAttribute('role', 'button');
		var icon = document.createElement('i');
		button.appendChild(icon);
		item.appendChild(button);
		navbarItems.insertBefore(item, navbarItems.firstChild);

		function showSwitchFor(theme) {
			var next = theme == 'dark' ? 'light' : 'dark';
			icon.className = 'fa ' + (next == 'dark' ? 'fa-moon-o' : 'fa-sun-o') + ' ace-icon bigger-120';
			button.title = script.dataset['label' + (next == 'dark' ? 'Dark' : 'Light')];
			button.setAttribute('aria-label', button.title);
		}
		showSwitchFor(root.dataset.theme);

		button.addEventListener('click', function (e) {
			e.preventDefault();
			var theme = root.dataset.theme == 'dark' ? 'light' : 'dark';
			// Fades the colours instead of snapping; only while switching, so page loads stay instant
			root.classList.add('dark-theme-switching');
			setTimeout(function () { root.classList.remove('dark-theme-switching'); }, 300);
			root.dataset.theme = theme;
			saveTheme(theme);
			showSwitchFor(theme);
		});
	});
})();
