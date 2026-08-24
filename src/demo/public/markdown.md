<!-- .slide: data-state="hide-menubar" -->
# Simplemenu
### for Reveal.js
Using Markdown

---
<!-- .slide: data-state="hide-menubar" -->
### Table of Contents
<ul class="menu"></ul>

---

<!-- .slide: data-name="Regular slide" data-i18n="Regular slide" -->
## Slide 1
A paragraph with some text and a [link](http://hakim.se).

---

<!-- .slide: data-name="Vertical" data-i18n="Verti" -->
## Vertical slide 1

----

## Vertical slide 2

---

<!-- .slide: data-stack-name="Setup"-->
## Setup
Load the Markdown plugin before Simplemenu.

----


Write Markdown with the use of [slide-attributes](https://revealjs.com/markdown/#slide-attributes)
<p class="small">Because of the Reveal magic of generating vertical slides, use <code>data-name</code> on the first vertical slide to set the name of the whole vertical stack.</p>

```md []
# Simplemenu
### for Reveal.js
Using Markdown
---
### Table of Contents
<ul class="menu"></ul>
---
<!-- .slide: data-name="Regular slide" data-state="hide-menubar" -->
## Slide 1
A paragraph with some text and a [link](http://hakim.se).
---
<!-- .slide: data-name="Vertical" -->
## Vertical slide 1
----
## Vertical slide 2
```

----

If you use Quarto, the syntax of the Markdown is a little bit different:

```md []
## Table of Contents
<ul class="menu"></ul>

# Slide 1 {data-name="Regular slide"}
A paragraph with some text and a [link](http://hakim.se).

# Vertical slide 1 {data-name="Vertical"}

## Vertical slide 2

```

----

#### That’s it!