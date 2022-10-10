
/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Simplemenu.js for Reveal.js 
 * Version 1.1.2
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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var Plugin = function Plugin() {
    var selectionArray = function selectionArray(container, selectors) {
      var selections = container.querySelectorAll(selectors);
      var selectionarray = Array.prototype.slice.call(selections);
      return selectionarray;
    };

    var isBefore = function isBefore(a, b) {
      var all = document.getElementsByTagName('*');

      for (var i = 0; i < all.length; ++i) {
        if (all[i] === a) return true;else if (all[i] === b) return false;
      }
    };

    var isStack = function isStack(section) {
      var isStack = false;

      for (var i = 0; i < section.childNodes.length; i++) {
        if (section.childNodes[i].tagName == "SECTION") {
          isStack = true;
          break;
        }
      }

      return isStack;
    };

    var simpleMenu = function simpleMenu(deck, options) {
      var viewport = deck.getRevealElement().tagName == "BODY" ? document : deck.getRevealElement();
      var menus = selectionArray(viewport, ".".concat(options.menuclass));
      var menubars = selectionArray(viewport, ".".concat(options.menubarclass));
      var slides = deck.getSlidesElement();
      var sections = slides.querySelectorAll("section");
      var langattribute = deck.getConfig().internation ? deck.getConfig().internation.langattribute : false;
      sections.forEach(function (section) {
        if (!isStack(section) && section.parentNode.tagName == "SECTION") {
          var parentAttributes = _toConsumableArray(section.parentNode.attributes);

          parentAttributes.reduce(function (attrs, attribute) {
            if (attribute.name == "data-name") {
              section.setAttribute("data-simplemenuname", attribute.value);
            } else if (attribute.name == "id" || attribute.name == "name") {
              section.setAttribute("data-simplemenu".concat(attribute.name), attribute.value);
            }
          }, {});
        }
      });

      var compare = function compare(eventSelector, element) {
        var compareThis = '';

        if (options.selectby == 'name' || options.selectby == 'data-name') {
          compareThis = element.textContent || element.querySelector('a').textContent;

          if (deck.hasPlugin('internation') && element.hasAttribute(langattribute)) {
            compareThis = element.getAttribute(langattribute);
          }
        } else if (options.selectby == 'id') {
          var linkhref = element.href || element.querySelector('a').href;
          compareThis = linkhref.substr(linkhref.lastIndexOf('/') + 1);
        } else {
          console.log("Simplemenu can only use ID, data-name or name.");
        }

        if (compareThis === eventSelector) {
          element.classList.add(options.activeclass);
        } else {
          element.classList.remove(options.activeclass);
        }
      };

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
        if (options.selectby != 'name') {
          options.selectby = 'data-name';
        }

        var listHtml = '';
        chapters = options.selectby == "name" ? selectionArray(viewport, "section[name]") : selectionArray(viewport, "section[data-name]").filter(function (chapter) {
          return chapter.parentNode.tagName != "SECTION";
        });
        chapters.forEach(function (chapter) {
          if (chapter.dataset.visibility != "hidden") {
            var name = options.selectby == "name" ? chapter.getAttribute('name') : chapter.dataset.name;
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
            }
          }

          var target = selectionArray(viewport, "[".concat(options.selectby, "=\"").concat(attributeContent, "\"], [data-name=\"").concat(attributeContent, "\"]"))[0];
          var targetIndices = deck.getIndices(target);
          e.preventDefault();
          deck.slide(targetIndices.h, 0, 0);
        };
      });

      var checkChapter = function checkChapter(event) {
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
          var pdfPages = selectionArray(viewport, '.slides .pdf-page');
          pdfPages.forEach(function (pdfPage) {
            if (options.selectby == "data-name") {
              options.selectby = "name";
            }

            var theSection = pdfPage.getElementsByTagName('section')[0];
            var eventSelector = theSection.getAttribute("data-simplemenu".concat(options.selectby)) ? theSection.getAttribute("data-simplemenu".concat(options.selectby)) : theSection.getAttribute("id");

            if (options.auto == true) {
              eventSelector = theSection.getAttribute("data-simplemenuname") ? theSection.getAttribute("data-simplemenuname") : theSection.dataset.name ? theSection.dataset.name : theSection.getAttribute('name');
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

  return Plugin;

}));
