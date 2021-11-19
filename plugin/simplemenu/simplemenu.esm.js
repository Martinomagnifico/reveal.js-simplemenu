
/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Simplemenu.js for Reveal.js 
 * Version 1.0.7
 * 
 * @license 
 * MIT licensed
 *
 * Thanks to:
 *  - Hakim El Hattab, Reveal.js 
 ******************************************************************/


var Plugin = function Plugin() {
  var selectionArray = function selectionArray(container, selectors) {
    var selections = container.querySelectorAll(selectors);
    var selectionarray = Array.prototype.slice.call(selections);
    return selectionarray;
  };

  var simpleMenu = function simpleMenu(deck, options) {
    var viewport = deck.getRevealElement().tagName == "BODY" ? document : deck.getRevealElement();
    var menus = selectionArray(viewport, ".".concat(options.menuclass));
    var menubars = selectionArray(viewport, ".".concat(options.menubarclass));
    var slides = deck.getSlidesElement();
    var langattribute = deck.getConfig().internation ? deck.getConfig().internation.langattribute : false;

    function isBefore(a, b) {
      var all = document.getElementsByTagName('*');

      for (var i = 0; i < all.length; ++i) {
        if (all[i] === a) return true;else if (all[i] === b) return false;
      }
    }

    if (menubars) {
      menubars.forEach(function (menubar) {
        if (isBefore(menubar, slides)) {
          menubar.classList.add("top");
        } else {
          menubar.classList.add("bottom");
        }
      });
    }

    var chapters = selectionArray(viewport, "section[".concat(options.selectby, "]"));

    if (options.auto == true) {
      if (options.selectby != 'data-name') {
        options.selectby = 'name';
      }

      var listHtml = '';
      chapters = options.selectby == "data-name" ? selectionArray(viewport, "section[data-name]") : selectionArray(viewport, "section[name]");
      chapters.forEach(function (chapter) {
        if (chapter.dataset.visibility != "hidden") {
          var name = options.selectby == "data-name" ? chapter.dataset.name : chapter.getAttribute('name');
          var intlString = chapter.getAttribute(langattribute) ? " ".concat(langattribute, "=\"").concat(chapter.getAttribute(langattribute), "\"") : '';

          if (name) {
            var href = name.toLowerCase().replace(/\W/g, '');
            chapter.id = href;
            listHtml += "<li><a href=\"#/".concat(href, "\"").concat(intlString, ">").concat(name, "</a></li>");
          }
        }
      });

      if (listHtml.length < 1) {
        console.log("There are no named top-level sections");
      } else {
        menus.forEach(function (menu) {
          menu.innerHTML = listHtml;
        });
      }
    }

    var listItems = selectionArray(viewport, ".".concat(options.menuclass, " ").concat(options.activeelement));
    listItems.forEach(function (listItem) {
      listItem.onclick = function (e) {
        var textContent = listItem.textContent || listItem.querySelector('a').textContent;
        var linkhref = listItem.href || listItem.querySelector('a').href;
        var linkID = linkhref.substr(linkhref.lastIndexOf('/') + 1);
        var attributeContent = options.selectby == 'name' || options.selectby == 'data-name' ? textContent : linkID;

        if (langattribute) {
          if (listItem.getAttribute(langattribute) || listItem.querySelector('a').getAttribute(langattribute)) {
            attributeContent = listItem.getAttribute(langattribute) || listItem.querySelector('a').getAttribute(langattribute);
            console.log(attributeContent);
          }
        }

        var target = selectionArray(viewport, "[".concat(options.selectby, "=\"").concat(attributeContent, "\"], [data-name=\"").concat(attributeContent, "\"]"))[0];
        var targetIndices = deck.getIndices(target);
        e.preventDefault();
        deck.slide(targetIndices.h, 0, 0);
      };
    });

    var checkChapter = function checkChapter(event) {
      var compare = function compare(eventSelector, element) {
        var compareThis = '';

        if (options.selectby == 'name') {
          compareThis = element.textContent || element.querySelector('a').textContent;
        } else if (options.selectby == 'data-name') {
          compareThis = element.textContent || element.querySelector('a').textContent;
        } else if (options.selectby == 'id') {
          var linkhref = element.href || element.querySelector('a').href;
          compareThis = linkhref.substr(linkhref.lastIndexOf('/') + 1);
        } else {
          console.log("Simplemenu can only use ID or name.");
        }

        if (compareThis === eventSelector) {
          element.classList.add(options.activeclass);
        } else {
          element.classList.remove(options.activeclass);
        }
      };

      if (event && (event.type == "ready" || event.type == "slidechanged")) {
        var eventChapter = event.currentSlide.offsetParent.tagName == "SECTION" ? event.currentSlide.offsetParent : event.currentSlide;
        var eventSelector = eventChapter.getAttribute(options.selectby);

        if (options.auto == true) {
          eventSelector = eventChapter.dataset.name ? eventChapter.dataset.name : eventChapter.getAttribute('name');
        }

        var arr = Array.prototype.slice.call(listItems);
        arr.filter(function (element) {
          compare(eventSelector, element);
        });
      } else {
        var printlistItems = selectionArray(viewport, ".".concat(options.menuclass, " li"));

        if (printlistItems) {
          printlistItems.forEach(function (printlistItem) {
            return printlistItem.classList.remove(options.activeclass);
          });
        }

        var pdfPages = selectionArray(viewport, '.slides .pdf-page');
        pdfPages.forEach(function (pdfPage) {
          var section = pdfPage.closest('section') || pdfPage.querySelectorAll('section')[0];
          var eventSelector = section.getAttribute(options.selectby);

          if (options.auto == true) {
            eventSelector = section.dataset.name ? section.dataset.name : section.getAttribute('name');
          }

          if (eventSelector) {
            var _arr = Array.prototype.slice.call(listItems);

            _arr.filter(function (element) {
              compare(eventSelector, element);
            });
          }

          if (menubars) {
            menubars.forEach(function (menubar) {
              var bar = menubar.cloneNode(true);
              pdfPage.appendChild(bar);
            });
          }
        });

        if (menubars) {
          menubars.forEach(function (menubar) {
            menubar.parentNode.removeChild(menubar);
          });
        }
      }
    };

    if (listItems) {
      deck.configure({
        hash: true
      });

      if (deck.getConfig().embedded) {
        deck.configure({
          hash: false
        });
      }

      deck.addEventListener('ready', checkChapter, false);
      deck.addEventListener('slidechanged', checkChapter, false);
      deck.addEventListener('pdf-ready', checkChapter, false);
    }
  };

  var init = function init(deck) {
    var defaultOptions = {
      menubarclass: 'menubar',
      menuclass: 'menu',
      activeclass: 'active',
      activeelement: 'li',
      selectby: 'id',
      auto: false
    };

    var defaults = function defaults(options, defaultOptions) {
      for (var i in defaultOptions) {
        if (!options.hasOwnProperty(i)) {
          options[i] = defaultOptions[i];
        }
      }
    };

    var options = deck.getConfig().simplemenu || {};
    defaults(options, defaultOptions);
    simpleMenu(deck, options);
  };

  return {
    id: 'simplemenu',
    init: init
  };
};

export default Plugin;
