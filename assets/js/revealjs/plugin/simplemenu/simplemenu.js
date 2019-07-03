"use strict";

/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Simplemenu.js for Reveal.js 1.0.2
 *
 * @license 
 * MIT licensed
 *
 * Credits:
 *  - Hakim El Hattab for Reveal.js
 ******************************************************************/

const Simplemenu = window.Simplemenu || (function () {

	let options = Reveal.getConfig().simplemenu || {};

	let defaultOptions = {
		menuselector: '.menu li',
		activeclass: 'active'
	}

	const defaults = function (options, defaultOptions) {
		for (let i in defaultOptions) {
			if (!options.hasOwnProperty(i)) {
				options[i] = defaultOptions[i];
			}
		}
	}

	const checkChapter = function (event) {
		let listItems = document.querySelectorAll(options.menuselector);
		let thisname = event.currentSlide.dataset.menuTitle;
		let parentname = event.currentSlide.parentNode.dataset.menuTitle;
		let arr = Array.prototype.slice.call(listItems);

		arr.filter(function (element) {
			let linkhref = element.href || (element.querySelector('a')).href;
			let linkname = linkhref.substr(linkhref.lastIndexOf('/') + 1);

			if (linkname === thisname || linkname === parentname) {
				return element.classList.add(options.activeclass);
			} else {
				return element.classList.remove(options.activeclass);
			}
		});
	};

	const init = function () {
		defaults(options, defaultOptions);
		Reveal.addEventListener('ready', checkChapter, false);
		Reveal.addEventListener('slidechanged', checkChapter, false);
	};

	return {
		init: init
	};

})();

Reveal.registerPlugin('simplemenu', Simplemenu);
/* global Reveal */