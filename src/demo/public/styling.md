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

If you set none of them, your deck looks exactly as it did before.

You can set them on `:root`, on `.reveal`, or on one `.menubar`.

----

There are too many to fit on a slide. 

The full list is in the [readme](https://github.com/martinomagnifico/reveal.js-simplemenu#css-variables).

---

<!-- .slide: data-stack-name="This deck" -->
## This deck

----

These colours are the theme’s, not Simplemenu’s. The bar uses `--r-main-color`.

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

The items look like tabs. `stretch` makes each item as tall as the bar, so the marker meets the line along its edge.

```css []
:root {
	--simplemenu-item-align: stretch;
	--simplemenu-link-padding: 0;
	--simplemenu-item-padding: 0.5em 1em;
	--simplemenu-item-opacity: 0.33;
	--simplemenu-item-opacity-hover: 0.75;
	--simplemenu-item-opacity-active: 1;
	--simplemenu-marker-thickness: 0.2em;
	--simplemenu-marker-color: var(--r-heading-color);
}
```

----

The logo and the slide number are put in the bar with `barhtml`.

```css []
:root {
	--simplemenu-logo-width: 4em;
	--simplemenu-logo-maxwidth: 100%;
	--simplemenu-logo-padding: 0.25em 0.5em;
	--simplemenu-slidenumber-opacity: 0.33;
}
```

A logo is sized by its height, so a width needs `--simplemenu-logo-maxwidth` with it.

---
<!-- .slide: data-state="hide-menu"-->
#### That’s it!
