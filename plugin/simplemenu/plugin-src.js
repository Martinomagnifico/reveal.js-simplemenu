const Plugin = () => {

	const selectionArray = function (container, selectors) {
		let selections = container.querySelectorAll(selectors);
		let selectionarray = Array.prototype.slice.call(selections);
		return selectionarray
	};

	const simpleMenu = function (deck, options) {

		let viewport = (deck.getRevealElement()).tagName == "BODY" ? document : deck.getRevealElement();
		let menus = selectionArray(viewport, `.${options.menuclass}`);
		let menubars = selectionArray(viewport, `.${options.menubarclass}`);
		let slides = deck.getSlidesElement();
		let langattribute = deck.getConfig().internation ? deck.getConfig().internation.langattribute : false;

		function isBefore( a, b ) {
			var all = document.getElementsByTagName('*');
		
			for( var i = 0; i < all.length; ++i ) {
				if( all[i] === a )
					return true;  
				else if( all[i] === b )
					return false;
			}
		}

		if (menubars) {
			menubars.forEach( menubar => {
				if ( isBefore(menubar, slides) ) {
					menubar.classList.add("top");
				} else {
					menubar.classList.add("bottom")
				}
			});
		}

		let chapters = selectionArray(viewport, `section[${options.selectby}]`);

		if (options.auto == true) {

			if (options.selectby != 'data-name') {
				options.selectby = 'name'
			}

			let listHtml = '';

			chapters = options.selectby == "data-name" ? selectionArray(viewport, `section[data-name]`) : selectionArray(viewport, `section[name]`);

			chapters.forEach(chapter => {

				if ( chapter.dataset.visibility != "hidden" ) {
					let name = options.selectby == "data-name" ? chapter.dataset.name : chapter.getAttribute('name');
					let intlString = chapter.getAttribute(langattribute) ? ` ${langattribute}="${chapter.getAttribute(langattribute)}"` : '';

					if (name) {
						let href = name.toLowerCase().replace(/\W/g, '');
						chapter.id = href;
						listHtml += `<li><a href="#/${href}"${intlString}>${name}</a></li>`;
					}
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

				let attributeContent = (options.selectby == 'name' || options.selectby == 'data-name' ) ? textContent : linkID;

				if (langattribute) {
					if (listItem.getAttribute(langattribute) || (listItem.querySelector('a')).getAttribute(langattribute)) {
						attributeContent = listItem.getAttribute(langattribute) || (listItem.querySelector('a')).getAttribute(langattribute);
						console.log(attributeContent)
					}
				}

				let target = selectionArray(viewport, `[${options.selectby}="${attributeContent}"], [data-name="${attributeContent}"]`)[0];
				let targetIndices = deck.getIndices(target);

				e.preventDefault();
				deck.slide(targetIndices.h, 0, 0 );
			}
		});


		const checkChapter = function (event) {

			const compare = function (eventSelector, element) {
				let compareThis = '';

				if (options.selectby == 'name') {
					compareThis = element.textContent || (element.querySelector('a').textContent);
				}
				else if (options.selectby == 'data-name') {
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
			}


			if ( event && (event.type == "ready" || event.type == "slidechanged")) {

				let eventChapter = (event.currentSlide.offsetParent).tagName == "SECTION" ? event.currentSlide.offsetParent : event.currentSlide;

				let eventSelector = eventChapter.getAttribute(options.selectby);

				if (options.auto == true ) {
					eventSelector = eventChapter.dataset.name ? eventChapter.dataset.name : eventChapter.getAttribute('name');
				}

				let arr = Array.prototype.slice.call(listItems);

				arr.filter(function (element) {
					compare(eventSelector, element);
				});

			} else {

				let printlistItems = selectionArray(viewport, `.${options.menuclass} li`);

				if (printlistItems) {
					printlistItems.forEach( printlistItem => printlistItem.classList.remove(options.activeclass));
				}

				let pdfPages = selectionArray(viewport, '.slides .pdf-page');

				pdfPages.forEach( pdfPage => {

					let section = pdfPage.closest('section') || pdfPage.querySelectorAll('section')[0];
					let eventSelector = section.getAttribute(options.selectby);

					if (options.auto == true ) {
						eventSelector = section.dataset.name ? section.dataset.name : section.getAttribute('name');
					}

					if (eventSelector) {
						let arr = Array.prototype.slice.call(listItems);
						arr.filter(function (element) {
							compare(eventSelector, element);
						});
					}

					if (menubars) {
						menubars.forEach( menubar => {
							var bar = menubar.cloneNode(true);
							pdfPage.appendChild(bar);
						});
					}
				});

				if (menubars) {
					menubars.forEach( menubar => {
						menubar.parentNode.removeChild(menubar);
					});
				}
			}
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
			deck.addEventListener('pdf-ready', checkChapter, false);

		}
	}

	const init = function (deck) {

		let defaultOptions = {
			menubarclass: 'menubar',
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