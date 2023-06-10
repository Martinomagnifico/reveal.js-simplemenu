
/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Simplemenu.js for Reveal.js 
 * Version 2.0.1
 * 
 * @license 
 * MIT licensed
 *
 * Thanks to:
 *  - Hakim El Hattab, Reveal.js 
 ******************************************************************/



(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Simplemenu = factory());
})(this, (function () { 'use strict';

	const Plugin = () => {
	  let options = {};
	  const vars = {};
	  const sections = {};
	  const mainArray = [];
	  let autoListItems = [];
	  let manualListItems = [];

	  const debugLog = text => {
	    if (options.debug) console.log(text);
	  };

	  const isObject = item => {
	    return item && typeof item === 'object' && !Array.isArray(item);
	  };

	  const mergeDeep = function (target) {
	    for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      sources[_key - 1] = arguments[_key];
	    }

	    if (!sources.length) return target;
	    const source = sources.shift();

	    if (isObject(target) && isObject(source)) {
	      for (const key in source) {
	        if (isObject(source[key])) {
	          if (!target[key]) Object.assign(target, {
	            [key]: {}
	          });
	          mergeDeep(target[key], source[key]);
	        } else {
	          Object.assign(target, {
	            [key]: source[key]
	          });
	        }
	      }
	    }

	    return mergeDeep(target, ...sources);
	  };

	  const selectionArray = (container, selectors) => {
	    let selections = container.querySelectorAll(selectors);
	    let selectionarray = Array.prototype.slice.call(selections);
	    return selectionarray;
	  };

	  const pluginPath = filename => {
	    let path;
	    let pluginScript = document.querySelector(`script[src$="${filename}"]`);

	    if (pluginScript) {
	      path = pluginScript.getAttribute("src").slice(0, -1 * filename.length);
	    } else {
	      path = (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('simplemenu.js', document.baseURI).href)).slice(0, (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('simplemenu.js', document.baseURI).href)).lastIndexOf('/') + 1);
	    }

	    return path;
	  };

	  const isBefore = (a, b) => {
	    var all = document.getElementsByTagName('*');

	    for (var i = 0; i < all.length; ++i) {
	      if (all[i] === a) return true;else if (all[i] === b) return false;
	    }
	  };

	  const isStack = section => {
	    let isStack = false;

	    for (let i = 0; i < section.childNodes.length; i++) {
	      if (section.childNodes[i].tagName == "SECTION") {
	        isStack = true;
	        break;
	      }
	    }

	    return isStack;
	  };

	  const createNode = thehtml => {
	    const fragment = document.createRange().createContextualFragment(thehtml);
	    return fragment.firstElementChild;
	  };

	  const loadStyle = (url, type, callback) => {
	    let head = document.querySelector('head');
	    let style = document.createElement('link');
	    style.rel = 'stylesheet';
	    style.href = url;

	    let finish = () => {
	      if (typeof callback === 'function') {
	        callback.call();
	        callback = null;
	      }
	    };

	    style.onload = finish;

	    style.onreadystatechange = function () {
	      if (this.readyState === 'loaded') {
	        finish();
	      }
	    };

	    head.appendChild(style);
	  };

	  const checkOccurrence = (array, element) => {
	    let counter = 0;

	    for (let i = 0; i <= array.length; i++) {
	      if (array[i] == element) {
	        counter++;
	      }
	    }

	    return counter;
	  };

	  const menuArray = () => {
	    const matchString = vars.matchString;
	    let menulist = selectionArray(vars.viewport, `.${options.menuclass}`) ? selectionArray(vars.viewport, `.${options.menuclass}`) : [];
	    let automenus = [];
	    let manualmenus = [];

	    if (menulist.length) {
	      menulist.forEach(menu => {
	        if (menu.getElementsByTagName('li').length < 1) {
	          menu.setAttribute('data-simplemenu-auto', '');
	          automenus.push(menu);
	        } else {
	          if (options.selectby == "data-name" || options.selectby == "name") {
	            let existingListItems = selectionArray(menu, `.${options.menuclass} ${options.activeelement}`);
	            existingListItems.forEach(listItem => {
	              if (!listItem.dataset[matchString]) {
	                let content = listItem.textContent || listItem.querySelector('a').textContent;
	                listItem.setAttribute(`data-${matchString}`, content);
	              }
	            });
	          }

	          manualmenus.push(menu);
	        }
	      });
	      return {
	        automenus: automenus,
	        manualmenus: manualmenus
	      };
	    } else {
	      return false;
	    }
	  };

	  const setScale = revealScale => {
	    let totalScale = revealScale * vars.userScale;
	    vars.viewport.style.setProperty('--simplemenu-scale', totalScale.toFixed(3));
	  };

	  const moveRevealUI = (curUiEl, newUiEl) => {
	    let newUiElClassList = newUiEl.classList;
	    newUiEl.parentNode.replaceChild(curUiEl, newUiEl);
	    curUiEl.classList = newUiElClassList;
	  };

	  const getRevealUI = () => {
	    let revealUIs = ['controls', 'slide-number'];
	    revealUIs.forEach(uielement => {
	      let curUiEl = vars.deck.getRevealElement().querySelector(`.reveal > .${uielement}`);
	      let newUiEl = vars.deck.getRevealElement().querySelector(`.reveal > * .${uielement}`);

	      if (curUiEl && newUiEl) {
	        moveRevealUI(curUiEl, newUiEl);
	      }
	    });
	  };

	  function copyDataAttributes(source, target) {
	    [...source.attributes].filter(attr => attr.nodeName.indexOf('data') > -1).forEach(attr => {
	      target.setAttribute(attr.nodeName, attr.nodeValue);
	    });
	  }

	  const prepareSlides = () => {
	    debugLog("Preparing slides");
	    sections.all = selectionArray(vars.viewport, "section");
	    sections.all.forEach(section => {
	      // In Markdown environments, setting a data-name of a stack is not directly possible. 
	      // Satting a data-stack-name on the first child solves this.
	      if (!section.parentNode.dataset.name && section.dataset && section.dataset.stackName) {
	        section.parentNode.dataset.name = section.dataset.stackName;
	      } // If a section has a data-sm='none', it will also remove the data-name.


	      if (section.dataset && section.dataset[vars.matchString] && section.dataset[vars.matchString] == "false" && section.dataset.name) {
	        delete section.dataset.name;
	      }
	    }); // Get all of the kinds of sections

	    sections.top = sections.all.filter(section => section.parentNode.classList.contains('slides') && !(section.dataset[vars.matchString] && section.dataset[vars.matchString] == "false"));
	    sections.named = sections.top.filter(section => section.dataset.name || section.getAttribute('name'));
	    sections.namedvisible = sections.named.filter(section => section.dataset.visibility != "hidden"); // Go through all the named sections

	    let namedsectionMatches = [];
	    sections.named.forEach(namedsection => {
	      // The 'name' attribute is also allowed. 
	      let matchName = namedsection.dataset.name || namedsection.getAttribute('name'); // Named sections can have the same name, but should then be differentiated.

	      namedsectionMatches.push(matchName);
	      let dupsBefore = matchName && checkOccurrence(namedsectionMatches, matchName) > 1 ? `-${checkOccurrence(namedsectionMatches, matchName)}` : null;
	      let match = dupsBefore ? matchName + dupsBefore : matchName; // We set the name of the match as a data-attribute

	      namedsection.setAttribute(`data-${vars.matchString}`, match); // If the (named) section is not a stack and does not have an ID, we need to give it one.

	      if (!isStack(namedsection) && !namedsection.id) {
	        // Note: Quarto will already have assigned an ID, but it may also have been done manually.
	        namedsection.id = match.toLowerCase().replace(/\W/g, '');
	      } else if (isStack(namedsection)) {
	        // Find the first (visible) section inside a stack.
	        let allsects = selectionArray(namedsection, `section`);
	        let allVisibleSects = allsects.filter(section => section.dataset.visibility != "hidden");
	        let firstChildSection = allVisibleSects[0];

	        if (firstChildSection && !firstChildSection.id) {
	          firstChildSection.id = match.toLowerCase().replace(/\W/g, '');

	          if (namedsection.id == firstChildSection.id) {
	            namedsection.removeAttribute('id');
	          }
	        }
	      }
	    });
	    let currentMatch = null;
	    let currentid = null; // Get all the sections that are actually slides

	    sections.regular = sections.all.filter(section => !isStack(section) && section.dataset.visibility != "hidden"); // Go through all the sections

	    sections.regular.forEach((section, i) => {
	      // Filling an array with the needed comparison information
	      let isChildSection = isStack(section.parentNode) && section.parentNode.tagName == "SECTION";
	      let theSection = isChildSection ? section.parentNode : section;
	      let dataname = theSection.dataset.name;
	      let name = theSection.getAttribute(`name`);
	      let dataintl = theSection.getAttribute(vars.langattribute) ? theSection.getAttribute(vars.langattribute) : null;
	      let parentid = section.parentNode.id ? section.parentNode.id : null;
	      let id = section.id ? section.id : isChildSection ? parentid : null;
	      let match = theSection.dataset[vars.matchString];

	      if (match) {
	        currentMatch = match;
	      }

	      if (id || match == "false") {
	        currentid = i;
	      }

	      if (options.flat) {
	        if (match != "false") {
	          match = currentMatch;
	        }
	      }

	      if (match == "false") {
	        match = null;
	      }

	      if (dataname == "false") {
	        dataname = null;
	      }

	      let sectionObject = {
	        index: i,
	        ...(section && {
	          section
	        }),
	        ...(dataname && {
	          dataname
	        }),
	        ...(name && {
	          name
	        }),
	        ...(id && {
	          id
	        }),
	        ...(match && {
	          match
	        }),
	        ...(currentid && {
	          currentid
	        }),
	        ...(dataintl && {
	          dataintl
	        })
	      };
	      mainArray.push(sectionObject);
	    });
	  };

	  const prepareMenubars = () => {
	    debugLog("Preparing menubars");
	    let menubars = selectionArray(vars.viewport, `.${options.menubarclass}`) ? selectionArray(vars.viewport, `.${options.menubarclass}`) : [];

	    if (options.barhtml.header) {
	      // Generate header menubar
	      let bar = createNode(options.barhtml.header);
	      menubars.push(bar);
	      vars.slides.before(bar);
	    }

	    if (options.barhtml.footer) {
	      // Generate footer menubar
	      let bar = createNode(options.barhtml.footer);
	      menubars.push(bar);
	      vars.slides.after(bar);
	    }

	    if (menubars.length) {
	      // If menubar (pre-existing or just added):
	      setScale(vars.deck.getScale());
	      menubars.forEach((menubar, i) => {
	        let barLocation = isBefore(menubar, vars.slides) ? "top" : "bottom";
	        menubar.classList.add(barLocation);

	        if (!menubar.id) {
	          menubar.id = `${options.menubarclass}${barLocation}`;
	        }

	        menubar.classList.add("ready");
	      });
	      vars.menubars = menubars;
	    } else {
	      console.log("There are no menubars. You can still use Simplemenu to populate empty menus like in an Agenda or Table Of Contents.");
	    }
	  };

	  const prepareMenus = () => {
	    debugLog("Preparing menus");
	    let menus = menuArray();

	    if (!menus || menus && !menus.automenus) {
	      console.log("There are no menus. Please add one or more menus manually or through the 'barhtml' option.");
	      return;
	    }

	    if (menus.automenus.length >= 1 && sections.namedvisible.length >= 1) {
	      // There are empty menus. Autofill them.
	      let idArray = [];
	      const autoMenuLinks = sections.namedvisible.map(section => {
	        let match = section.dataset[vars.matchString];
	        let name = section.dataset.name || section.getAttribute(`name`) || section.id;
	        let id = section.id || name.toLowerCase().replace(/\W/g, '');
	        idArray.push(id);

	        if (vars.quarto) {
	          id = mainArray.find(item => item.match === match).id;
	        }

	        let duplicatesBefore = checkOccurrence(idArray, id) > 1 ? `-${checkOccurrence(idArray, id)}` : '';
	        let href = vars.quarto ? id : id + duplicatesBefore;
	        let smmatchString = ` data-${vars.matchString}="${match}"`;
	        let nameString = section.getAttribute(`name`) ? ` name="${section.getAttribute(`name`)}"` : '';
	        let intlString = section.getAttribute(vars.langattribute) ? ` ${vars.langattribute}="${section.getAttribute(vars.langattribute)}"` : '';
	        return `<li><a href="#/${href}"${intlString}${nameString}${smmatchString}>${name}</a></li>`;
	      }).reduce((combinedHTML, itemHTML) => {
	        let orderedHTML = vars.rtl ? itemHTML + combinedHTML : combinedHTML + itemHTML;
	        return orderedHTML;
	      });
	      menus.automenus.forEach(automenu => {
	        automenu.innerHTML = autoMenuLinks;
	      });
	      autoListItems = menus.automenus.map(menu => Array.from(menu.querySelectorAll(options.activeelement))).flat();
	    }

	    if (menus.manualmenus.length >= 1) {
	      // There are pre-existing menus. Fix link to ID if needed.
	      // Only get the listitems
	      manualListItems = menus.manualmenus.map(menu => Array.from(menu.querySelectorAll(options.activeelement))).flat();
	      manualListItems.forEach(listItem => {
	        // Get the anchorlinks
	        let linker = listItem.tagName == "a" ? listItem : listItem.querySelector('a');
	        let linkhref = linker.getAttribute('href');

	        if (linkhref === "#") {
	          let newLink = listItem.dataset[vars.matchString].toLowerCase().replace(/\W/g, '');
	          linker.href = `#/${newLink}`;
	        }
	      });
	    }
	  };

	  const preparePrint = () => {
	    const urlParams = new URLSearchParams(window.location.search);
	    const hasPrintParam = urlParams.has('print-pdf');

	    if (hasPrintParam) {
	      mainArray.forEach(item => {
	        let printSection = item.section;
	        let datainfo = document.createElement("div");
	        datainfo.classList.add("datainfo");
	        copyDataAttributes(printSection, datainfo);
	        let moreData = ['match', 'name', 'dataname', 'currentid', 'id', 'dataintl'];
	        moreData.forEach(moreDataItem => {
	          if (item[moreDataItem]) {
	            datainfo.dataset[moreDataItem] = item[moreDataItem];
	          }
	        });
	        printSection.appendChild(datainfo);
	      });
	    }
	  };

	  const prepare = resolve => {
	    prepareSlides();
	    prepareMenubars();
	    prepareMenus();
	    preparePrint();
	    return setTimeout(resolve, 0);
	  };

	  const compare = (listItem, section) => {
	    let menukind = listItem.parentNode.hasAttribute('data-simplemenu-auto') ? "auto" : "manual";
	    let sectionmatch = section.match ? section.match : null;

	    if (menukind == "manual") {
	      if (options.selectby == "id") {
	        sectionmatch = section.id ? section.id : section.currentid ? mainArray[section.currentid].id : null;
	      } else if (options.selectby == "name") {
	        sectionmatch = section.name;
	      } else {
	        sectionmatch = section.dataname;
	      }
	    }

	    if (sectionmatch) {
	      let menumatch = listItem.dataset[vars.matchString] || listItem.querySelector('a').dataset[vars.matchString];

	      if (options.selectby == "id" && menukind == "manual") {
	        let href = listItem.href || listItem.querySelector('a').href;
	        let lastHref = href ? href.substring(href.lastIndexOf("/") + 1) : '';
	        menumatch = lastHref;
	      }

	      if (options.selectby == "data-name" && menukind == "manual") {
	        sectionmatch = section.dataname ? section.dataname : null;
	      }

	      if (menumatch && menumatch == sectionmatch) {
	        listItem.classList.add(options.activeclass);
	      } else {
	        listItem.classList.remove(options.activeclass);
	      }
	    } else {
	      listItem.classList.remove(options.activeclass);
	    }
	  };

	  const checkSlidesNormal = event => {
	    const index = sections.regular.indexOf(event.currentSlide);
	    let section = mainArray[index];
	    autoListItems.filter(listItem => {
	      compare(listItem, section);
	    });
	    manualListItems.filter(listItem => {
	      compare(listItem, section);
	    });
	  };

	  const checkSlidesPDF = event => {
	    let pdfPages = selectionArray(vars.viewport, '.slides .pdf-page'); // Check if any menubar has a slide number

	    let anyMenubarHasSlidenumber = false;

	    if (vars.menubars) {
	      vars.menubars.forEach(menubar => {
	        anyMenubarHasSlidenumber = !!menubar.getElementsByClassName("slide-number");
	      });
	    }

	    pdfPages.forEach(pdfPage => {
	      // The original section has gone, so we rebuild it with the saved data-attributes
	      let datainfo = pdfPage.getElementsByClassName("datainfo")[0];
	      let section = {};
	      section.name = datainfo.dataset.name;
	      section.dataname = datainfo.dataset.dataname;
	      section.currentid = datainfo.dataset.currentid;
	      section.match = datainfo.dataset.match;
	      section.id = datainfo.dataset.id;

	      if (datainfo.dataset.state) {
	        let newClasses = datainfo.dataset.state.split(" ");
	        newClasses.forEach(newClass => {
	          pdfPage.classList.add(newClass);
	          let vp = vars.deck.getRevealElement().closest(".reveal-viewport");
	          vp.classList.remove(newClass);
	        });
	      } // If any menubar has a slide number, turn the original one on this slide off


	      if (anyMenubarHasSlidenumber && pdfPage.getElementsByClassName("slide-number").length > 0) {
	        pdfPage.getElementsByClassName("slide-number")[0].style.display = "none";
	      }

	      if (vars.menubars) {
	        vars.menubars.forEach(menubar => {
	          let bar = menubar.cloneNode(true);
	          pdfPage.appendChild(bar);
	          let listItems = selectionArray(bar, `.${options.menuclass} ${options.activeelement}`);
	          listItems.forEach(listItem => {
	            compare(listItem, section);
	          }); // If there is a slidenumber in the menu,

	          let newSN = pdfPage.querySelector(`.${options.menubarclass} .slide-number`);
	          let oldSN = pdfPage.querySelector(`:scope > .slide-number`);

	          if (newSN && oldSN) {
	            // ...then fill it with the current (total) slidenumber.
	            newSN.textContent = oldSN.textContent;
	          }
	        });
	      }
	    });

	    if (vars.menubars) {
	      vars.menubars.forEach(menubar => {
	        menubar.parentNode.removeChild(menubar);
	      });
	    }
	  };

	  const chapterize = event => {
	    if (event && event.type == "ready") {
	      debugLog(mainArray);
	      getRevealUI();
	    }

	    if (event && (event.type == "ready" || event.type == "slidechanged")) {
	      checkSlidesNormal(event);
	    }

	    if (event && event.type == "pdf-ready") {
	      checkSlidesPDF();
	    }
	  };

	  const simpleMenu = (deck, options, es5Filename) => {
	    deck.configure({
	      hash: true
	    });
	    vars.deck = deck;
	    vars.viewport = deck.getRevealElement().tagName == "BODY" ? document : deck.getRevealElement();
	    vars.slides = deck.getSlidesElement();
	    vars.langattribute = deck.getConfig().internation ? deck.getConfig().internation.langattribute ? deck.getConfig().internation.langattribute : "data-i18n" : false;
	    vars.rtl = deck.getConfig().rtl;
	    vars.quarto = document.querySelector('[name=generator]') && document.querySelector('[name=generator]').content.includes("quarto") ? true : false;
	    vars.matchString = "sm";
	    vars.userScale = options.scale;
	    deck.addEventListener('ready', chapterize, false);
	    deck.addEventListener('slidechanged', chapterize, false);
	    deck.addEventListener('pdf-ready', chapterize, false);
	    deck.addEventListener('resize', _ref => {
	      let {
	        scale
	      } = _ref;
	      return setScale(scale);
	    }, false);
	    const SimplemenuStylePath = options.csspath ? options.csspath : `${pluginPath(es5Filename)}simplemenu.css` || 'plugin/simplemenu/simplemenu.css';
	    return new Promise(resolve => {
	      if (options.csspath === false) {
	        return prepare(resolve);
	      } else {
	        loadStyle(SimplemenuStylePath, 'stylesheet', async () => prepare(resolve));
	      }
	    });
	  };

	  const init = deck => {
	    let defaultOptions = {
	      menubarclass: 'menubar',
	      menuclass: 'menu',
	      activeclass: 'active',
	      activeelement: 'li',
	      selectby: 'id',
	      barhtml: {
	        header: '',
	        footer: ''
	      },
	      flat: false,
	      scale: 0.67,
	      csspath: ''
	    };
	    options = deck.getConfig().simplemenu || {};
	    options = mergeDeep(defaultOptions, options);
	    let wronginputs = false;
	    let warning = '';

	    if (options.selectby !== "id" && options.selectby !== "data-name" && options.selectby !== "name") {
	      wronginputs = true;
	      warning = 'The selectby option can be only "id",  "data-name" or "name".';
	    }

	    if (wronginputs) {
	      console.log('Simplemenu did not load:');
	      console.log(warning);
	      return false;
	    }

	    return simpleMenu(deck, options, "simplemenu.js");
	  };

	  return {
	    id: 'simplemenu',
	    init: init
	  };
	};

	return Plugin;

}));
