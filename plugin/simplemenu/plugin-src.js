const Plugin = () => {

	const selectionArray = function (container, selectors) {
		let selections = container.querySelectorAll(selectors);
		let selectionarray = Array.prototype.slice.call(selections);
		return selectionarray
	};

	function getNodeIndex(node) {
		var index = 0;
		while ( (node = node.previousSibling) ) { if (node.nodeType != 3 || !/^\s*$/.test(node.data)) { index++; }}
		return index;
	}

	const simpleMenu = function (deck, options) {

		let viewport = (deck.getRevealElement()).tagName == "BODY" ? document : deck.getRevealElement();
		let menus = selectionArray(viewport, `.${options.menuclass}`);

		if (options.auto == true ) {
			options.selectby = "name";
		}

		let chapters = selectionArray(viewport, `section[${options.selectby}]`);

		if (options.auto == true ) {
			let listHtml = '';
			chapters.forEach(chapter => {
				let name = chapter.getAttribute('name');
				if (name) {
					let href = name.toLowerCase().replace(/\W/g, '');
					chapter.id = href;
					listHtml += `<li><a href="#/${href}">${name}</a></li>`;
				}
			});
			if (listHtml.length < 1) {
				console.log("There are no named top-level sections")
			} else {
				menus.forEach(menu => {
					menu.innerHTML = listHtml;
				});
			}
		}

		let listItems = selectionArray(viewport, `.${options.menuclass} ${options.activeelement}`);

		listItems.forEach( listItem => {
			listItem.onclick = function (e) {

				let textContent = listItem.textContent || (listItem.querySelector('a').textContent);
				let linkhref = listItem.href || (listItem.querySelector('a')).href;
				let linkID = linkhref.substr(linkhref.lastIndexOf('/') + 1);
				let attributeContent = options.selectby == 'name' ? textContent : linkID;

				let target = selectionArray(viewport, `[${options.selectby}="${attributeContent}"]`)[0];
				let targetIndex = getNodeIndex(target);
				e.preventDefault();
				deck.slide(targetIndex, 0, 0 );
			}
		});


		const checkChapter = function (event) {

			let eventChapter = (event.currentSlide.offsetParent).tagName == "SECTION" ? event.currentSlide.offsetParent : event.currentSlide;

			let eventSelector = eventChapter.getAttribute(options.selectby);

			let arr = Array.prototype.slice.call(listItems);

			arr.filter(function (element) {

				let compareThis = '';

				if (options.selectby == 'name') {
					compareThis = element.textContent || (element.querySelector('a').textContent);
				}
				else if (options.selectby == 'id') {
					let linkhref = element.href || (element.querySelector('a')).href;
					compareThis = linkhref.substr(linkhref.lastIndexOf('/') + 1);
				} else {
					console.log("Simplemenu can only use ID or name.")
				}
				
				if (compareThis === eventSelector) {
					element.classList.add(options.activeclass);
				} else {
					element.classList.remove(options.activeclass);
				}
			});

		};

		if (listItems) {

			deck.configure({
				hash: true
			});

			if ((deck.getConfig()).embedded) {
				deck.configure({
					hash: false
				});
			}

			deck.addEventListener('ready', checkChapter, false);
			deck.addEventListener('slidechanged', checkChapter, false);
		}
	}

	const init = function (deck) {

		let defaultOptions = {
			menuclass: 'menu',
			activeclass: 'active',
			activeelement: 'li',
			selectby: 'id',
			auto: false
		};

		const defaults = function (options, defaultOptions) {
			for (let i in defaultOptions) {
				if (!options.hasOwnProperty(i)) {
					options[i] = defaultOptions[i];
				}
			}
		}

		let options = deck.getConfig().simplemenu || {};

		defaults(options, defaultOptions);

		simpleMenu(deck, options);

	};

	return {
		id: 'simplemenu',
		init: init
	};
};

export default Plugin;