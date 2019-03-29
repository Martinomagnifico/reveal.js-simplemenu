/*****************************************************************
 * Author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Simplemenu.js for Reveal.js 1.0.0
 *
 * @license 
 * MIT licensed
 *
 * Credits:
 *  - Hakim El Hattab for Reveal.js
******************************************************************/

(function () {

	const defaultoptions = {
		menuselector: '.menu li',
		activeclass: 'active'
	} 

	let config = Reveal.getConfig();
	let useroptions = config.simplemenu || {};
	let menuselector = useroptions.menuselector || defaultoptions.menuselector;
	let activeclass = useroptions.activeclass || defaultoptions.activeclass;
	let listItems = document.querySelectorAll(menuselector); 



	const checkChapter = function (event) {
		let thisname = event.currentSlide.dataset.menuTitle;
		let parentname = event.currentSlide.parentNode.dataset.menuTitle;
		let arr = Array.prototype.slice.call(listItems);

		arr.filter(element => {
			let linkhref = element.href || (element.querySelector('a')).href ;
			let linkname = linkhref.substr(linkhref.lastIndexOf('/') + 1);

			if (linkname === thisname || linkname === parentname) {
				return element.classList.add(activeclass)
			} else {
				return element.classList.remove(activeclass)
			}
		});
	};

	Reveal.addEventListener('ready', checkChapter, false);
	Reveal.addEventListener('slidechanged', checkChapter, false);

})();