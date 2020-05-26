# reveal.js-simplemenu
A simple menu for [Reveal.js](https://revealjs.com)

In Powerpoint you can make slides with a nice bottom- or top bar in which the active chapter is highlighted. This menu works in the same way, but automatically.

[Demo with bar on top](https://martinomagnifico.github.io/reveal.js-simplemenu/demo.html)
or
[Demo with bar on bottom](https://martinomagnifico.github.io/reveal.js-simplemenu/bottombar.html)



It's easy to set up, but expects a few things:

Chapters can only be top-level sections (horizontal) with, or without, nested sections (vertical).

There has to be a:

- Element with `class="menu"`. 
- Inside this menu, there have to be anchors with an href. These can point to either an ID of a first nested section, or to an ID of a top-level section when it has no children. 
- The top-level sections need a data attribute: `data-menu-title="chaptername"`.
- Simplemenu checks if the href value of those links correspond to the data-menu-title attribute of the sections. 

Simplemenu does not check if an ID has the same name as the data-attribute. Reveal.js handles clicks on (named) anchors of top-level sections with subsections only horizontally. That means if you have clicked through the slides of chapter 1, are now in chapter 2, and click on an anchor that points to the top-level section of chapter one, it will not 'scroll' to the top, but show the last viewed slide of chapter 1. That's why the ID's need to be on the first slide of their chapter, and that's why there is both an ID and a data-attribute. Another possibility would be to use only ID's and to check if there is a sibling or parent with an ID that is also in the menu, but this current version works well enough.



## Installation

Copy the simplemenu folder to the plugins folder of the reveal.js folder, like this: `plugin/simplemenu`. Now add it to the dependencies of Reveal.js:


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


## Setup

It is easy to set up your HTML structure for Simplemenu: 

```html
<div class="menubar">
	<ul class="menu">
		<!-- Here's the menu -->
		<li><a href="#/firstchapter">First chapter</a></li>
		<li><a href="#/secondchapter">Second chapter</a></li>
		<li><a href="#/thirdchapter">Third chapter</a></li>
	</ul>
</div>
<div class="slides">
	<section>
		<h1>Main title slide</h1>
	</section>
	<!-- Add data-attributes to the top-level sections -->
	<section data-menu-title="firstchapter">
		<!-- And an ID -->
		<section id="firstchapter">
			<h2>This is 1</h2>
		</section>
		<section>
			<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
		</section>
	</section>
	<section id="secondchapter" data-menu-title="secondchapter">
		<h2>This is 2, no child slides</h2>
	</section>
	<section data-menu-title="thirdchapter">
		<section id="thirdchapter">
			<h2>This is 3</h2>
		</section>
		<section>
			<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
		</section>
	</section>
</div>
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

## Like it?
This is my first Github repo... let me know if you like it.


## License
MIT licensed

Copyright (C) 2019 Martijn De Jongh (Martino)
