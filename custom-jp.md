<!-- .slide: data-state="hide-menubar" -->
# Simplemenu
### for Reveal.js
Using custom styling

---
<!-- .slide: data-state="hide-menubar" -->
### Table of Contents
<ul class="menu"><ul>

---

<!-- .slide: data-name="1つ目の項目" -->
## Slide 1
A paragraph with some text and a [link](http://hakim.se).

---

<!-- .slide: data-stack-name="設定" -->
## Setup

----

Add a header via the `barhtml` option and include your custom header markup. Change the CSS to your needs and link to it through the `csspath` option.

```js []
Reveal.initialize({
	//...
	simplemenu: {
		barhtml: { 
			header: '<div class="menubar"><a href="#"><img class="logo" src="img/logo.svg"></a><ul class="menu"></ul></div>'
		},
		csspath: 'css/mycustomstyle.css'
	},
	plugins: [ Simplemenu ]
```

----

You can also move the slidenumber into the menubar by just adding a div with the class `slide-number` to it:

```js []
Reveal.initialize({
	//...
	simplemenu: {
		barhtml: { 
			header: '<div class="menubar"><a href="#"><img class="logo" src="img/logo.svg"></a><ul class="menu"></ul><div class="slide-number"></div></div>'
		},
		csspath: 'css/mycustomstyle.css'
	},
	plugins: [ Simplemenu ]
```

---
<!-- .slide: data-state="hide-menu" -->
#### That’s it!
