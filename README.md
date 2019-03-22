# reveal.js-simplemenu
A simple menu for Reveal.js

In Powerpoint you can make slides with a nice bottom- or top bar in which the active chapter is highlighted. This menu works in the same way. It's easy to set up, but expects a few things:

There has to be a:

- .menu
- Inside this menu, there have to be links with an href. These can point to either an anchor of a first nested section, or to an anchor of a top-level section when it has no children. 
- The top-level sections need a data attribute: `data-menu-title="chaptername"`.
- Simplemenu checks if the href value of those links correspond to the data-menu-title attribute of the sections. 

Simplemenu does not check if an anchor has the same name as the data-attribute. Reveal.js handles clicks to (named) anchors of top-level sections with subsections only horizontally. That means if you have clicked through the slides of chapter 1, are now in chapter 2, and click on an anchor that points to the top-level section of chapter one, it will not 'scroll' to the top, but show the last view slide of chapter 1. That's why the anchors need to be on the first slides of a chapter, and that's why there is both an anchor and a data-attribute. Another possibility would be to use only anchors and to check if there is a sibling or parent with an anchor that is also in the menu, but this current version works well enough.



## Installation

Copy the simple menu.js file to the plugins folder of the reveal.js folder, like this: `plugins/simplemenu`. Now add it to the dependencies of Reveal.js:


```javascript
Reveal.initialize({
	// ...
	dependencies: [
		// ... 
		{ src: 'plugin/simplemenu/simplemenu.js' },
		// ... 
	]
});
```



## Configuration

There are a few options that you can change from the Reveal.js options. The values below are default and do not need to be set if they are not changed.

```javascript
Reveal.initialize({
	// ...
  simplemenu: {
    	// Use menuselector to assign the menu items to be used. You might want to point 
    	// it to '.menu li a' for example. In that case the class of the a's will toggle, 
    	// not the class of the li's.
  		menuselector: '.menu li',
    
    	// Use a specific class for the active state.
			activeclass: 'active'
	},
	dependencies: [
		// ... 
	]
});
```





## License

Beer license

Copyright (C) 2019 Martino
