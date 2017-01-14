;var fromJsonMl = function(){"use strict";
	var regex = new RegExp('^(.*)([#.])([^#\.]+)$');
	var has = {}.hasOwnProperty;
	return function fromJsonMl(jsonml) {
		if (Array.isArray(jsonml)) {
			var tag = jsonml[0];
			if (typeof tag === 'string') {
				var attributes = jsonml[1], start = 1, len = jsonml.length|0, ids = [], classes = [], match;
				attributes = attributes || {};
				var ids = attributes.id ? attributes.id.split(' ') : [];
				var classes = attributes.class ? attributes.class.split(' '): [];
				while (match = regex.exec(tag)) {
					if (match[2] == '.') {
						classes.push(match[3]);
					} else {
						ids.push(match[3]);
					}
					tag = match[1];
				}
				var el = document.createElement(tag);
				if (attributes && typeof attributes === 'object' && !Array.isArray(attributes)) {
					for (var attr in attributes) {if (has.call(attributes, attr)) {
						if (attr != 'id' && attr != 'class') {
							el.setAttribute(attr, attributes[attr]);
						}
					}}
					start = 2;
				}
				if (ids.length) {el.id = ids.join(' ')}
				if (classes.length) {el.className = classes.join(' ')}
				for (; start < len; start += start + 1|0) {
					var x = fromJsonMl(jsonml[start]);
					el.appendChild(x);
				}
				return el;
			} else {
				return jsonml.map(fromJsonMl);
			}
		} else if (typeof jsonml === 'string') {
			return document.createTextNode(jsonml);
		} else {
			return jsonml;
		}
	};
}();
