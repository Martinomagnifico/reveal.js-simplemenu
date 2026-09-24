<!-- .slide: data-state="hide-menubar" -->
# Simplemenu
### for Reveal.js
Styling with CSS variables

---
<!-- .slide: data-state="hide-menubar" -->
### Table of Contents
<ul class="menu"></ul>

---

<!-- .slide: data-stack-name="Variables" -->
## Variables

----

This page keeps Simplemenu’s own stylesheet and only sets variables.

----

If you set none of them, you get Simplemenu's own look, which is what this deck starts from.

You can set them on `:root`, on `.reveal`, or on one `.menubar`.

----

There are too many to fit on a slide. 

The full list is in the [readme](https://github.com/martinomagnifico/reveal.js-simplemenu#css-variables).

---

<!-- .slide: data-stack-name="This deck" -->
## This deck

----

By default, `barhtml.header` is just a bar with a menu (where Simplemenu fills the empty `ul.menu` for you), like this:

```javascript
barhtml: {
    header: "<nav class='menubar'><ul class='menu'></ul></nav>",
    footer: ""
}
```

In this deck we change it to be able to add some elements:

```javascript
barhtml: {
    header: "<nav class='menubar'><div class='padbox'><a class='logo' href='#'><svg>…</svg></a></div><ul class='menu'></ul><div class='padbox'><div class='slide-number'></div></div></nav>"
}

```

----

The padding of the menu is 0, but it might be that you want other elements in the menubar to have some breathing room. That is what you can use `padbox` for. 

```css []
:root {
	--simplemenu-bar-padbox: 0.25em 0.5em;
}
```

On this deck there is a padbox at both the left side and the right side of the menu.


----

These are Reveal’s own colour variables, not Simplemenu’s. This deck sets them, and everything below builds on them.

```css []
:root {
	--r-background-color: #cddddd;
	--r-main-color: #004444;
	--r-heading-color: #008080;
}
```

----

The bar has no background of its own, so it looks like part of the slide.

```css []
:root {
	--simplemenu-bar-background: transparent;
	--simplemenu-bar-padding: 0;
	--simplemenu-rule-color: currentColor;
	--simplemenu-rule-opacity: 0.3;
}
```

----

The items look like tabs, and `stretch` makes each one as tall as the bar so the marker meets the line.

The marker takes your theme's heading colour. Set `--simplemenu-marker-color` for your own.

```css []
:root {
	--simplemenu-item-align: stretch;
	--simplemenu-link-padding: 0;
	--simplemenu-item-padding: 0.5em 1em;
	--simplemenu-item-opacity: 0.33;
	--simplemenu-item-opacity-hover: 0.75;
	--simplemenu-item-opacity-active: 1;
	--simplemenu-marker-thickness: 0.2em;
}
```

----

Simplemenu provides a few variables for an optional logo and for cases where you moved a slide number to inside the menubar:

```css []
:root {
	--simplemenu-logo-width: 4em;
	--simplemenu-logo-maxwidth: 100%;
	--simplemenu-slidenumber-opacity: 0.33;
	--simplemenu-slidenumber-padding: 0;
}
```

A logo is sized by its height, so a width needs `--simplemenu-logo-maxwidth` with it.

----

The logo up there is an SVG drawn in `currentColor`, so it takes the bar's colour and turns around with it on the next slide. Nothing is set for that, but you can set those two if your logo should have a colour of its own in each case, like this:

```css []
:root {
	--simplemenu-logo-color: darkslategray;
	--simplemenu-logo-color-inverted: darkseagreen;
}
```

----

Those two do nothing for a logo with its colours baked in, such as a multicolour SVG or a PNG. For that, put both versions in the bar and let `c-theme-inverted` choose.

<div class="logoswap">
	<img class="regular" src="assets/img/logo.svg" alt="Acme">
	<img class="inverted" src="assets/img/logowhite.svg" alt="" aria-hidden="true">
</div>

```css []
.logoswap .inverted { display: none; }
.c-theme-inverted .logoswap .regular { display: none; }
.c-theme-inverted .logoswap .inverted { display: block; }
```

Those class names are your own. Keep going to see this pair swap.

----

<!-- .slide: data-background-color="#004444" -->

Same two images, same markup. The background went the other way round, so the other one shows.

<div class="logoswap">
	<img class="regular" src="assets/img/logo.svg" alt="Acme">
	<img class="inverted" src="assets/img/logowhite.svg" alt="" aria-hidden="true">
</div>



----

<!-- .slide: data-background-color="#004444" -->

This slide has its background the other way round, and the bar changes colour with it on its own.

To pick your own (text) colour for inverted slides, set it like this: 

```css []
:root {
	--simplemenu-bar-color-inverted: #cddddd;
}
```
The 'tab' line under the link has `--simplemenu-marker-color-inverted` for the same case.


----

<!-- .slide: data-background-color="#004444" -->

Simplemenu puts `c-theme-inverted` on the deck while a slide like this is showing, and your own CSS can use it. This deck turns its code blocks around with it.

```css []
.reveal.c-theme-inverted code.hljs {
	background: var(--r-background-color);
}

.reveal.c-theme-inverted code.hljs,
.reveal.c-theme-inverted code.hljs * {
	color: var(--r-main-color);
}
```

---
<!-- .slide: data-state="hide-menu"-->
#### That’s it!
