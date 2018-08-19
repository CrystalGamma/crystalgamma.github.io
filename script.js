(()=>{"use strict";
	const loadScript = window.loadScript = url => new Promise(resolve => {
		const el = document.createElement('script');
		el.src = url;
		const handler = () =>{el.removeEventListener('load', handler);el.parentNode.removeChild(el);resolve()};
		el.addEventListener('load', handler);
		document.body.appendChild(el);
	});
	const outlineLevel = el => {
		let ancestor = el.parentElement;
		let level = +el.tagName.substring(1);
		do {
			if (ancestor.tagName == "SECTION") {level += 6;}
			ancestor = ancestor.parentElement;
		} while (ancestor != null);
		console.log(level);
		return level;
	};
	const treeMap = (flattenedTree, func, getLevel) => {
		const out = [];
		const hier = [];
		console.log(flattenedTree);
		for (let el of flattenedTree) {
			const level = getLevel(el);
			while (!!hier.length && hier[hier.length-1].level >= level) {
				hier.pop();
			}
			const mapped = func(el, hier.length == 0 ? null : hier[hier.length-1].out);
			if (!hier.length) {out.push(mapped);}
			hier.push({level, out: mapped});
			console.log(hier);
		}
		console.log(out);
		return out;
	}
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
		document.body.appendChild(fromJsonMl(['header', ['h1', "CrystalGamma's Tech Stuff"]]));//, ['', ['img', {src: baseDir + 'feed-icon.svg#main'}], "Feeds coming soon"]]));
		let headerNumbering = 0;
		document.body.appendChild(fromJsonMl(['nav.sidebar', ...treeMap([...container.querySelectorAll("h1,h2,h3,h4,h5,h5")], (el, parent) => {
			headerNumbering += 1;
			if (!el.id) {el.id = "heading" + headerNumbering;}
			const res = ['li', ['a', {href: "#"+el.id}, el.textContent]];
			console.log(parent);
			if (parent) {
				if (parent.length == 2) {parent.push(['ul']);}
				parent[2].push(res);
			}
			return res;
		}, outlineLevel)]));
		document.body.appendChild(fromJsonMl(['.container', container]));
	});
})();
