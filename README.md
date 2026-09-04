# Simplemenu

[![Version](https://img.shields.io/npm/v/reveal.js-simplemenu)](#) [![Downloads](https://img.shields.io/npm/dt/reveal.js-simplemenu)](https://github.com/Martinomagnifico/reveal.js-simplemenu/archive/refs/heads/master.zip)

A simple menu for [Reveal.js](https://revealjs.com)

[![Screenshot](https://martinomagnifico.github.io/reveal.js-simplemenu/screenshot.png)](https://martinomagnifico.github.io/reveal.js-simplemenu/demo/demo.html)

In Powerpoint you can make slides with a nice bottom- or top bar in which ***the active menu item is highlighted***. This menu works in the same way, but automatically. Simplemenu now also supports the Markdown syntax. Combined with the `barhtml` option, you don't have to edit the template in HTML at all.

-   [Demo with bar on top](https://martinomagnifico.github.io/reveal.js-simplemenu/demo/demo.html)
-   [Demo with bar on bottom](https://martinomagnifico.github.io/reveal.js-simplemenu/demo/demo-bottom.html)
-   [Demo with Markdown](https://martinomagnifico.github.io/reveal.js-simplemenu/demo/demo-markdown.html)
-   [Demo, styling with CSS variables](https://martinomagnifico.github.io/reveal.js-simplemenu/demo/demo-styling.html)
-   [Demo, flat chapter navigation](https://martinomagnifico.github.io/reveal.js-simplemenu/demo/demo-flat.html)
-   [Demo, manual, select by id](https://martinomagnifico.github.io/reveal.js-simplemenu/demo/demo-manual-id.html)
-   [Demo, manual, select by data-name](https://martinomagnifico.github.io/reveal.js-simplemenu/demo/demo-manual-dataname.html)

### What it does

-   Make menu items of your vertical stacks (top-level sections).
-   Moving to another vertical stack (by whatever navigation) will automatically update the current menu item.
-   Clicking an item in the menu will open the first section in the corresponding vertical stack.
-   Note: Menu items can only be top-level sections: regular horizontal slides or vertical stacks.

#### Auto mode

Simplemenu can generate the menu, using sections with an attribute of `data-name`. If you add a menubar (manually or through the `barhtml` option) and an empty menu, Simplemenu will automatically populate it for you. You can also add such a menu anywhere else in the presentation, to serve as a Table Of Contents or an Agenda.

#### Manual mode

However, if you write a menu yourself and put list items in it (in a menubar or in a standalone TOC), then Simplemenu goes into "manual" mode. One menu with list items is enough: Simplemenu then fills **none** of them, and also does not add any menubar. The result: every menu on the page has to be written by you. 

You have to take some things into account if you want to make such a menu yourself, to make menu-items actually work and activate with navigation:

-   There has to be an element that will hold the links. By default this selector is the class `menu`. The selector can be changed in the Simplemenu options.
-   Inside this main menu, there have to be anchors with an href. These need to point to an ID of a top-level section. Reveal uses links with hashes to navigate, so the link has to be written like that: `href="#/firstchapter"`.

### Presentation structure

![Setup](https://martinomagnifico.github.io/reveal.js-simplemenu/demo/assets/img/simplemenusetup.png)

Simplemenu uses top-level slides for the menu item names. Nested slides in vertical stacks will then also use the name of the whole stack. This way you get chapters through which the user can navigate.

However, sometimes you'll want to limit your presentation to horizontal slides only. To still use 'chapters' with several slides, you can use the `flat` option. By default, it is set to `false`, but you can set it to `true`. Then, when a data-name is set for a slide, any following slides will keep that menu name. See [Using the flat option](#using-the-flat-option) below.

## Installation

### Regular installation

Copy the simplemenu folder to the plugins folder of the reveal.js folder, like this: `plugin/simplemenu`.

### npm installation

This plugin is published to, and can be installed from, npm.

``` console
npm install reveal.js-simplemenu
```

The Simplemenu plugin folder can then be referenced from `node_modules/reveal.js-simplemenu/plugin/simplemenu`

## Setup

### JavaScript

Simplemenu works in setups with multiple Reveal instances.

There are two JavaScript files for Simplemenu, a regular one, `simplemenu.js`, and a module one, `simplemenu.mjs`. You only need one of them:

#### Regular

If you're not using ES modules, for example, to be able to run your presentation from the filesystem, you can add it like this:

``` html
<script type="text/javascript" src="dist/reveal.js"></script>
<script src="plugin/simplemenu/simplemenu.js"></script>
<script>
    Reveal.initialize({
        // ...
        plugins: [ Simplemenu ]
    });
</script>
```

#### As a module

If you're using ES modules, you can add it like this:

``` html
<script type="module">
    // This will need a server
    import Reveal from './dist/reveal.esm.js';
    import Simplemenu from './plugin/simplemenu/simplemenu.js';
    Reveal.initialize({
        // ...
        plugins: [ Simplemenu ]
    });
</script>
```

### Styling

The styling of Simplemenu is automatically inserted from the included CSS styles, either loaded through NPM or from the plugin folder.

There are two ways to change how it looks. Most things in the menubar/menu is stylable with CSS variables. If you need to go further than the variables allow, then the whole stylesheet can be replaced instead through the `csspath` option, or you can just add menubar styles to the theme you are using.


#### CSS variables

See [Styling with CSS variables](https://martinomagnifico.github.io/reveal.js-simplemenu/demo/demo-styling.html) for a demo that uses CSS variables in the page itself.

```css
:root {
    --simplemenu-bar-background: #004444;
    --simplemenu-item-opacity: 0.5;
    --simplemenu-item-opacity-hover: 0.8;
    --simplemenu-marker-thickness: 3px;
}
```

##### The bar

| Variable | Sets | Default |
| --- | --- | --- |
| `--simplemenu-bar-background` | The menubar background | `transparent` |
| `--simplemenu-bar-padding` | Inset for the menubar contents | `0` |
| `--simplemenu-bar-align` | How the logo, the menu and the slide number align in the menubar | `stretch` |
| `--simplemenu-bar-z` | Stacking order | `2` |
| `--simplemenu-bar-duration` | How long it takes to slide in and out | `0.8s` |
| `--simplemenu-bar-easing` |The easing for the transition | `cubic-bezier(0.26, 0.86, 0.44, 0.985)` |
| `--simplemenu-bar-hidden-transform` | Where the menubar is while hidden | `translateY(-100%)`, or `translateY(100%)` on a bottom menubar |
| `--simplemenu-bar-hidden-opacity` | How visible it is while hidden | `1` |
| `--simplemenu-line-height` | Line height inside the menubar | `1` |
| `--simplemenu-font-min` | Floor of the font-size clamp | `16px` |
| `--simplemenu-font-max` | Ceiling of it | `80px` |

The menubar is transparent by default and has a border along the edge next to the slides.

| Variable | Sets | Default |
| --- | --- | --- |
| `--simplemenu-rule-width` | Thickness of the border | `1px` |
| `--simplemenu-rule-color` | Its colour | `currentColor` |
| `--simplemenu-rule-opacity` | Opacity for the border | `0.3` |

##### Menu items

The `<ul class="menu">` and every item inside it can be generated by Simplemenu, so a variable is the only way to change it.

| Variable | Sets | Default |
| --- | --- | --- |
| `--simplemenu-item-opacity` | An item at rest | `0.33` |
| `--simplemenu-item-opacity-hover` | Hover and keyboard focus | `0.75` |
| `--simplemenu-item-opacity-active` | The current chapter | `1` |
| `--simplemenu-item-color` | An item's colour at rest | `currentColor` |
| `--simplemenu-item-color-hover` | It on hover and keyboard focus | unset, so `--simplemenu-item-color` |
| `--simplemenu-item-color-active` | The current chapter | unset, so `--simplemenu-item-color` |
| `--simplemenu-item-background` | An item's background at rest | `transparent` |
| `--simplemenu-item-background-hover` | It on hover and keyboard focus | unset, so `--simplemenu-item-background` |
| `--simplemenu-item-background-active` | The current chapter | unset, so `--simplemenu-item-background` |
| `--simplemenu-item-radius` | Corner radius of that background | `0` |
| `--simplemenu-item-decoration` | `text-decoration` on a menu link | `none` |
| `--simplemenu-item-decoration-hover` | It on hover | unset, so `--simplemenu-item-decoration` |
| `--simplemenu-item-padding` | Padding on each item | `0.5em 1em` |
| `--simplemenu-item-gap` | Space between items | `0` |
| `--simplemenu-item-duration` | How long a state change takes, opacity, colour and background alike | `0.2s` |
| `--simplemenu-item-easing` | The curve it changes on | `ease-in-out` |

An item that Simplemenu could not link, because its chapter has no id to point at, is a bare `<li>` rather than a link. It takes the same colours, background and padding, so that the two kinds of item in one menu still match.

##### Layout

The menu is a flex row that the bar centres between whatever else it holds. The next 4 vars are about how it is positioned and how much room its items take.

| Variable | Sets | Default |
| --- | --- | --- |
| `--simplemenu-menu-margin` | Where the menu itself sits in the menubar | `0 auto` |
| `--simplemenu-menu-justify` | Where the items are positioned along the menu | `center` |
| `--simplemenu-item-grow` | `0` leaves each item the width of its own label, `1` shares the menu's width out between them equally | `0` |
| `--simplemenu-item-align` | An item’s height in a menubar made taller by a logo | `center` |

If the (optional) marker under the current item does not line up with the edge of the bar, use `--simplemenu-item-align`. If you set it to `stretch`, each item is as high as the bar, so the marker lines up with that line. `flex-start` and `flex-end` put the item against the top or the bottom.

##### Hiding the bar, or hiding the menu

In Reveal, you can use `data-state` with a classname on slides. That classname is then set on the Reveal.js viewport, so that elements outside the slides can use that CSS.

| `data-state` | Does |
| --- | --- |
| `hide-menubar` | Slides the whole bar out of view, logo and slide number with it |
| `hide-menu` | Fades the menu out, and leaves the rest of the bar where it is |


`hide-menubar` uses the bar’s own timing, `--simplemenu-bar-duration` and `--simplemenu-bar-easing` from the table above.

By default the bar slides out of view. You can also fade instead of transform, or you can use both at the same time. Fading:

```css
:root {
    --simplemenu-bar-hidden-transform: none;
    --simplemenu-bar-hidden-opacity: 0;
}
```

The menu has its own timing:

| Variable | Sets | Default |
| --- | --- | --- |
| `--simplemenu-menu-duration` | How long the menu takes to fade out and back in | `0.2s` |
| `--simplemenu-menu-easing` | The curve it fades on | `ease-in-out` |


##### Optional marker ("tab" line under the active item)

By default, Simplemenu shows inactive chapters with opacity and the active chapter being fully opaque. But you can also give it a 'tab' line, a marker, under the active item. There is no marker under it until you give one a size.

| Variable | Sets | Default |
| --- | --- | --- |
| `--simplemenu-marker-thickness` | Thickness/size of the marker, and whether it appears at all | `0` |
| `--simplemenu-marker-color` | Its colour | `currentColor` |
| `--simplemenu-marker-radius` | Its corner radius | `0` |
| `--simplemenu-marker-edge` | Which edge it is on | `auto 0` |
| `--simplemenu-marker-margin-x` | Space on the left and the right of it | `0`, so the whole width |

`--simplemenu-marker-edge` takes two values, the start and the end. `auto 0` puts the marker along the item’s bottom edge, and `0 auto` puts it along the top. Those two are the values you want; it is an `inset-block`, so a keyword such as `top` does not work. A menubar with the `bottom` class flips it to the top edge on its own, so that the marker faces the slides either way, and setting the variable overrides that.


##### The logo

Simplemenu does not add a logo for you. That would not make any sense. If you want one, then put it in your `barhtml` and give it the class `logo`. The Simplemenu CSS styling just makes sure that it is positioned nicely and that it does not get too big.

| Variable | Sets | Default |
| --- | --- | --- |
| `--simplemenu-logo-width` | Width of the box around the logo | `auto` |
| `--simplemenu-logo-padding` | Padding inside that box | `0.4em 0` |
| `--simplemenu-logo-maxheight` | Maximum on the image's height | `1.8em` |
| `--simplemenu-logo-maxwidth` | Maximum on its width | `none` |
| `--simplemenu-logo-margin` | Margin on the image itself | `0` |

A logo is sized by its height by default. If you want to size it by its width instead, then set `--simplemenu-logo-width` **and** `--simplemenu-logo-maxwidth: 100%`.



##### Links, the focus ring and the slide number

If you add a menubar manually or through the options, you can also move the slide number into it. These are the CSS vars to style it:

| Variable | Sets | Default |
| --- | --- | --- |
| `--simplemenu-link-padding` | For any other link in the bar | `0.4em 0` |
| `--simplemenu-focus-width` | Thickness of the keyboard focus ring | `2px` |
| `--simplemenu-focus-color` | Its colour | `currentColor` |
| `--simplemenu-focus-radius` | Its corner radius | `0.2em` |
| `--simplemenu-slidenumber-size` | Size of the slide number | `0.75em` |
| `--simplemenu-slidenumber-minwidth` | Holds its width as the number changes | `4em` |
| `--simplemenu-slidenumber-padding` | Trailing space after it | `0 1em 0 0` |
| `--simplemenu-slidenumber-opacity` | The slide number at rest | unset, so `--simplemenu-item-opacity`, then `0.75` |
| `--simplemenu-slidenumber-opacity-hover` | It on hover | unset, so `--simplemenu-item-opacity-hover`, then `1` |

The two opacities for the slide number are unset, so the number uses the same values as the menu items and matches them without a second edit. If you set them, the number uses your values instead. These only apply to a slide number that you have moved into the bar. A slide number left in its normal place is not styled by Simplemenu at all.


#### Where the stylesheet comes from

Simplemenu finds and loads its own stylesheet, so most decks never set anything here. If it cannot find it, maybe because the plugin is in a bundle, or it is somewhere the plugin cannot work out, then use `csspath`.

```js
simplemenu: {
    csspath: "plugin/simplemenu/simplemenu.css"
}
```

If you import the stylesheet yourself, then set `csspath: false` so that Simplemenu does not load a second copy. A stylesheet of your own can also say so, which is useful when you cannot reach the plugin’s options:

```css
:root {
    --cssimported-simplemenu: true;
}
```

`csspath` loads that file *instead of* Simplemenu’s own. If you do write your own CSS, then make sure to use `simplemenu-bar` and `simplemenu-menu` for the bar and the menu respectively.

### HTML

It is easy to set up your HTML structure for Simplemenu. To keep the Simplemenu on every slide, put it outside of the `.slides`. Simplemenu can automatically do this for you if you use the `barhtml` option, so that you do not need to edit the template.

#### The auto way

Start by giving `data-name`s to your sections:

``` html
<div class="slides">
    <section data-name="Menu item one">
        //...
    </section>
    <section data-name="Menu item two">
        //...
    </section>
    <section data-name="Menu item three">
        //...
    </section>
</div>
```

That is already enough for a menubar: Simplemenu adds a header bar with an empty menu in it, and fills that menu with links to your sections.

If you want a different bar, you can set your own through the options like this (yes, even when you use Markdown, you have to write a small piece of HTML here):

``` javascript
Reveal.initialize({
    // ...
    simplemenu: {
        // ...
        barhtml: {
            header: "<nav class='menubar'><ul class='menu'></ul></nav>",
            footer: ""
        }
    },
    plugins: [ Simplemenu ]
});
```

...or manually in your markup like this:

``` html
<nav class="menubar">
    <ul class="menu"></ul> <!-- Keep this empty -->
</nav>
<div class="slides">
    <section data-name="Menu item one">
        //...
    </section>
    <section data-name="Menu item two">
        //...
    </section>
    <section data-name="Menu item three">
        //...
    </section>
</div>
```

A bar you supply yourself is recognised, and Simplemenu then does not add one of its own. It counts as yours when it has the `menubarclass`, or when there is a menu inside it for Simplemenu to fill. A menu inside the slides counts as a table of contents rather than a bar, so Simplemenu still fills it with section links, and the menubar stays as well.

A bar that Simplemenu generates gets an id: `simplemenu-headerbar` for the header, `simplemenu-footerbar` for the footer. A bar you write yourself keeps the id you gave it, and an id in your own `barhtml` is kept too.

##### Plugin order

A bar from `barhtml` does not exist until Simplemenu has run. If you use the `barhtml` entry, then make sure to load Simplemenu before any other plugin that needs to know about the rendered content of the menubar.

#### The manual way

``` html
<nav class="menubar">
    <ul class="menu">
        <!-- Here's the menu -->
        <li><a href="#/firstchapter">First chapter</a></li>
        <li><a href="#/secondchapter">Second chapter</a></li>
        <li><a href="#/thirdchapter">Third chapter</a></li>
    </ul>
</nav>
<div class="slides">
    ...
</div>
```

The top-level sections (that should be in the menu) need to have an ID:

``` html
<div class="slides">
    <section id="firstchapter">
        <section>
            <h2>This is 1</h2>
        </section>
        <section>
            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
        </section>
    </section>
    <section id="secondchapter">
        <h2>This is 2, no child slides</h2>
    </section>
    <section id="thirdchapter">
        <section>
            <h2>This is 3</h2>
        </section>
        <section>
            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
        </section>
    </section>
</div>
```

This manual way can also use the `data-name` of the sections, which will then link if the link text is exactly the same as the data-name. Set the `selectby: "data-name"` option if you set it up like that.

### Markdown

Simplemenu also supports Markdown, but you need to consider how you add `data-name`s to your sections. Because of the way how Reveal generates vertical stacks, you can't directly add a `data-name` to those. The workaround is to add a `data-stack-name` to the first vertical slide in those stacks:

``` md
# Simplemenu
### for Reveal.js
Using Markdown
---
### Table of Contents
<ul class="menu"><ul>
---
<!-- .slide: data-name="Regular slide" -->
## Slide 1
A paragraph with some text and a [link](http://hakim.se).
---
<!-- .slide: data-stack-name="Vertical" -->
## Vertical slide 1
----
## Vertical slide 2
```

The above example is from an externally loaded Markdown file, with the vertical separator specifically set to `\n----\n`, but any setup will work.

If you use Quarto, the syntax of the Markdown is a little bit different:

``` md
## Table of Contents
<ul class="menu"><ul>

# Slide 1 {data-name="Regular slide"}
A paragraph with some text and a [link](http://hakim.se).

# Vertical slide 1 {data-stack-name="Vertical"}

## Vertical slide 2
```

### Moving the slide number to a menubar

If you add a menubar manually or through the options, you can also move the slide number into it. If a div with the class `slide-number` is found within a menubar, it is removed from the root Reveal element, and used in that menubar. This functionality is similar to the [RelativeNumber](https://martinomagnifico.github.io/reveal.js-relativenumber/demo.html) plugin. You will need to adjust the CSS yourself, like making the elements relative instead of absolute.

``` javascript
Reveal.initialize({
    // ...
    simplemenu: {
        // ...
        barhtml: {
            header: "<nav class='menubar'><ul class='menu'></ul><div class='slide-number'></div></nav>",
            footer: ""
        }
    },
    plugins: [ Simplemenu ]
});
```

### Using the flat option

Sometimes you'll want to limit your presentation to horizontal slides only. To still use 'chapters' with several slides, you can use the `flat` option. By default, it is set to `false`, but you can set it to `true`. Then, when a data-name is set for a slide, any following slides will keep that menu name. Whenever a slide is encountered with `data-sm="false"`, the inheritance will stop.

``` html
<nav class="menubar">
    <ul class="menu"></ul> <!-- Keep this empty -->
</nav>
<div class="slides">
    <section data-name="Chapter 1">
        //... (Chapter 1 will be active)
    </section>
    <section>
        //... (Chapter 1 will be active)
    </section>
    <section data-name="Chapter 2">
        //... (Chapter 2 will be active)
    </section>
    <section>
        //... (Chapter 2 will be active)
    </section>
    <section data-sm="false">
        //... (No menu item will be active)
    </section>
</div>
```

## Configuration

There are a few options that you can change from the Reveal.js options. The values below are default and do not need to be set if they are not changed.

``` javascript
Reveal.initialize({
    // ...
    simplemenu: {
        menubarclass: "menubar",
        menuclass: "menu",
        activeclass: "active",
        activeelement: "li",
        selectby: "id",
        barhtml: {
            header: "<nav class='menubar'><ul class='menu'></ul></nav>",
            footer: ""
        },
        flat: false,
        scale: 0.67,
        cssautoload: true,
        csspath: ""
   },
    plugins: [ Simplemenu ]
});
```

-   **`menubarclass`**: This option sets the classname of menubars. It is also how Simplemenu recognises a bar you supplied yourself. Change it if another plugin already uses that name. Simplemenu still styles the bar, because it writes `simplemenu-bar` onto it as well.
-   **`menuclass`**: This option sets the classname of the menu. Change it if another plugin already uses that name. Simplemenu still styles the menu, because it writes `simplemenu-menu` onto it as well.
-   **`activeclass`**: This option is the class an active menuitem gets.
-   **`activeelement`**: This option sets the element that gets the active class. Change it if you directly want to style the `a`, for example.
-   **`selectby`**: This option is only needed when adding a menu manually. You then need to link sections to the menu items. The selectby option finds the active slide or stack by this. By default, it selects by ID, but it can also be set to `data-name`. In that case, Simplemenu will compare the text content of your links to the data-name of the section. This only will work if you disable the auto-generation of the menu by adding the menu and menu-items manually.
-   **`barhtml`**: If your deck has no menubar, then Simplemenu adds one. The default markup uses your `menubarclass` and `menuclass`. If you set `barhtml` yourself, then Simplemenu uses your markup exactly as it is, so the classes in it have to be the ones you set. If another plugin needs to see what is in that bar, then it has to be loaded after Simplemenu. See [Plugin order](#plugin-order).
    -   **`header`**: Here you can add the HTML for the header. If you include an empty menu in it, that will be populated with actual links. You might also add a logo here, or anything else you like. If you give the logo the class `logo`, then Simplemenu sizes it for you. A header bar is added by default, so if you would rather have no bar at all, you can set this to an empty string. If you give the bar an id, that id is kept.
    -   **`footer`**: Here you can add the HTML for the footer. If you include an empty menu in it, that will be populated with actual links. You might also add a logo here, or anything else you like. There is no footer by default.
-   **`flat`**: This turns the `flat` option on or off. See the description above.
-   **`scale`**: When you have a lot of subjects/chapters in your menubar, they might not all fit in a row. To avoid the need to adjust the CSS for each presentation, you can tweak the scale in the options. It is set to be two-thirds of the main scaling.
-   **`cssautoload`**: Simplemenu loads its own stylesheet when this is on. If you bundle Simplemenu, or import its CSS yourself, it works this out and does not load a second copy, so this normally does not need setting. If you do want it to autoload in a bundled deck, then setting it to `true` yourself turns it back on.
-   **`csspath`**: Where Simplemenu's stylesheet is, for the cases where it cannot find it by itself. You can also set `csspath: false` if the styling is already on the page through some other file. For changing how the menubar looks, use the CSS variables instead.
-   **`rtl`**: Menu items in a menubar are reversed for right-to-left presentations. Reveal's own `rtl` setting is followed, so this only needs setting if you want something else than what Reveal does. A menu inside your slides keeps its document order either way.

## Like it?

If you like it, please star this repo!

And if you want to show off what you made with it, please do :-)

## License

MIT licensed

Copyright (C) 2026 Martijn De Jongh (Martino)
