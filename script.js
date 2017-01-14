(()=>{"use strict";
	const loadScript = window.loadScript = url => new Promise(resolve => {
		const el = document.createElement('script');
		el.src = url;
		const handler = () =>{el.removeEventListener('load', handler);el.parentNode.removeChild(el);resolve()};
		el.addEventListener('load', handler);
		document.body.appendChild(el);
	});
	// shamelessly use URL normalization to get a path relative to this script ☺
	const baseDir = window.baseDir = document.currentScript.src + '/../';
	loadScript(baseDir + 'jsonml.js').then(() => {
		const head = document.querySelector('head');
		const title = head.querySelector('title').textContent;
		head.appendChild(fromJsonMl(['meta', {name: 'viewport', content:'width=device-width, initial-scale=1'}]));
		const container = fromJsonMl(['main']);
		container.appendChild(fromJsonMl(['h1', title]));
		let node;
		while (node = document.body.firstChild) {
			container.appendChild(node);
		}
		document.body.classList.add('enhanced');
		fromJsonMl.nameSpaces['svg'] = 'http://www.w3.org/2000/svg';
		fromJsonMl.nameSpaces['xlink'] = 'http://www.w3.org/1999/xlink';
		document.body.appendChild(fromJsonMl(['header', ['h1', "CrystalGamma's Tech Blog"], ['', ['img', {src: baseDir + 'feed-icon.svg#main'}], "Feeds coming soon"]]));
		document.body.appendChild(fromJsonMl(['nav.sidebar', "Outline goes here"]));
		document.body.appendChild(fromJsonMl(['.container', container]));
	});
})();
