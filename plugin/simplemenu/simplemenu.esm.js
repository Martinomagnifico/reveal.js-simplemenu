
/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Simplemenu.js for Reveal.js 
 * Version 1.0.3
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

  function getNodeIndex(node) {
    var index = 0;

    while (node = node.previousSibling) {
      if (node.nodeType != 3 || !/^\s*$/.test(node.data)) {
        index++;
      }
    }

    return index;
  }

  var simpleMenu = function simpleMenu(deck, options) {
    var viewport = deck.getRevealElement().tagName == "BODY" ? document : deck.getRevealElement();
    var menus = selectionArray(viewport, ".".concat(options.menuclass));

    if (options.auto == true) {
      options.selectby = "name";
    }

    var chapters = selectionArray(viewport, "section[".concat(options.selectby, "]"));

    if (options.auto == true) {
      var listHtml = '';
      chapters.forEach(function (chapter) {
        var name = chapter.getAttribute('name');

        if (name) {
          var href = name.toLowerCase().replace(/\W/g, '');
          chapter.id = href;
          listHtml += "<li><a href=\"#/".concat(href, "\">").concat(name, "</a></li>");
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
        var attributeContent = options.selectby == 'name' ? textContent : linkID;
        var target = selectionArray(viewport, "[".concat(options.selectby, "=\"").concat(attributeContent, "\"]"))[0];
        var targetIndex = getNodeIndex(target);
        e.preventDefault();
        deck.slide(targetIndex, 0, 0);
      };
    });

    var checkChapter = function checkChapter(event) {
      var eventChapter = event.currentSlide.offsetParent.tagName == "SECTION" ? event.currentSlide.offsetParent : event.currentSlide;
      var eventSelector = eventChapter.getAttribute(options.selectby);
      var arr = Array.prototype.slice.call(listItems);
      arr.filter(function (element) {
        var compareThis = '';

        if (options.selectby == 'name') {
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
      });
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
    }
  };

  var init = function init(deck) {
    var defaultOptions = {
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
