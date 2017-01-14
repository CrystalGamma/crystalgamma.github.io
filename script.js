(()=>{"use strict";
	const loadScript = window.loadScript = url => new Promise(resolve => {
		const el = document.createElement('script');
		el.src = url;
		const handler = () =>{el.removeEventListener('load', handler);el.parentNode.removeChild(el);resolve()};
		el.addEventListener('load', handler);
		document.body.appendChild(el);
	});
	// shamelessly use URL normalization to get a path relative to this script ☺
	loadScript(document.currentScript.src + '/../jsonml.js').then(() => {
		const head = document.querySelector('head');
		const title = head.querySelector('title').textContent;
		head.appendChild(fromJsonMl(['meta', {name: 'viewport', content:'width=device-width, initial-scale=1'}]));
		const container = fromJsonMl(['main']);
		container.appendChild(fromJsonMl(['h1', title]));
		let node;
		while (node = document.body.firstChild) {
			container.appendChild(node);
		}
		document.body.appendChild(container);
	});
})();
