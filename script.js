(()=>{"use strict";
	const loadScript = url => new Promise(resolve => {
		const el = document.createElement('script');
		el.src = url;
		const handler = () =>{el.removeEventListener('load', handler);el.parentNode.removeChild(el);resolve()};
		el.addEventListener('load', handler);
		document.body.appendChild(el);
	});
	loadScript('jsonml.js').then(() => {
		const title = document.querySelector("head title").textContent;
		document.body.insertBefore(fromJsonMl(['h1', title]), document.body.firstChild);
	});
})();
