# Changelog

## [Unreleased]
### Breaking
- The default `barhtml.header` is no longer empty. Simplemenu now ships a default header bar (`<nav class='menubar'><ul class='menu'></ul></nav>`) and creates it for you, where 2.0.3 made no bar at all unless you set `barhtml.header` yourself. Presentations that supply their own bar are detected and left alone (see below), but to restore the old behaviour explicitly, set:

  ```js
  simplemenu: { barhtml: { header: "" } }
  ```

- Generated menubars now get a fixed id: `simplemenu-headerbar` for the header and `simplemenu-footerbar` for the footer. 2.0.3 derived the id from `menubarclass` and the bar's position (`menubartop` / `menubarbottom`), and only when the bar had no id of its own. Bars you write yourself keep their own id and are never renamed.

  ```js
  simplemenu: {
    barhtml: { header: "<nav id='menubartop' class='menubar'><ul class='menu'></ul></nav>" }
  }
  ```

### Added
- Simplemenu no longer adds a header bar when the presentation already provides one. A bar counts as yours when it carries the `menubarclass`, or when it holds a menu for Simplemenu to fill. A menu inside the slides is treated as a table of contents rather than a bar, so it still gets its section links filled without suppressing the menubar.
- `rtl` is a Simplemenu option now. Reveal's own `rtl` is still the default, but if you set `simplemenu.rtl`, that wins.
- An id in your `barhtml` is kept. 2.0.3 only named a bar that had no id, and that behaviour is back, so a bar you name yourself is left as you wrote it.

### Changed
- `--simplemenu-bar-padding` now defaults to `0`, as in 2.0.3. It briefly defaulted to `min(0.3em, 14px) 2vmin`, which stopped a menu item's border meeting the bar's own edge — the tab look most menubars use. Set the variable if you want the bar's contents inset.

- Rebuilt with Vite and Vituum, matching the other plugins, and updated for Reveal.js 6, which ships its plugins in `dist/plugin` rather than a top-level `plugin` folder. Dependencies updated along with it (Vite, Vituum, TypeScript, Biome, sass).
- Adopted `reveal.js-plugintoolkit` for plugin setup, config merging, CSS autoloading and debug logging. This replaces the hand-rolled equivalents and adds the `cssautoload` option, and it fixes the bug where `Function("return import.meta")()` does not work: `import.meta` is now referenced directly so each output format can handle it, with `document.currentScript` standing in for the UMD build. The stylesheet sets `--cssimported-simplemenu`, which the toolkit reads so that it does not autoload a second copy of CSS you have already imported.
- Menu links are built as elements and appended, where 2.0.3 wrote the whole menu as one HTML string into `innerHTML`.
- The Internation `langattribute` falls back to `data-i18n` whether or not Internation is configured. In 2.0.3 it was only read when an `internation` config block was present, so a deck that used `data-i18n` without one got no translation attributes on its menu links.
- Menubar positioning and the `ready` state are handled in CSS (`.slides ~ .menubar`, `.reveal.ready &`) rather than by assigning classes and inline styles per bar from JavaScript.

### Deprecated
- The plain `name` attribute on a section is no longer documented or demoed — use `data-name`. It still works, and `selectby: "name"` is still honoured, but a deck using either now prints a one-time `console.warn` naming `data-name` as the replacement. `name` is not a valid attribute on `<section>`, and support for it can go in a future version. The "manual setup, select by name" demo page has been removed; the "select by data-name" demo covers the same ground.

### Fixed
- A slide number moved into a menubar stays in the bar under Quarto. Quarto's `quarto-support/footer.css` positions `.reveal .slide-number` absolutely and matches at the same two-class weight as Simplemenu's own rule, but loads after it, so it won the tie and pulled the number out of the bar. The rule now carries a third class.

- A manual menu with `activeelement: "a"` and `selectby: "id"` now navigates through Simplemenu itself. The anchor was looked up with `menuItem.querySelector('a')`, but with `activeelement: "a"` the item already *is* the anchor, so no slide matched, `preventDefault()` never ran and the click fell through to the browser. Reveal's own hash routing covered that up for links written as `href="#/some-id"`, but Simplemenu's scroll-view handling was skipped and a menu written with `href="#"` cleared the hash. This is the last of the case-sensitivity bugs from 2.0.3, where the guard read `listItem.tagName == "a"` — `tagName` is uppercase, so it never matched and `activeelement: "a"` threw on a null anchor.
- Right-to-left no longer reverses a menu outside a menubar, so a table of contents in your slides keeps its document order. 2.0.3 reversed every generated menu.
- `build-plugin` referred to `vite.lib.config.js` while the file on disk is `vite.lib.config.ts`, so the plugin build did not run.
- The demo build only picked up `demo*.pug`, so `index.pug` and `packagetest.pug` were never built.
