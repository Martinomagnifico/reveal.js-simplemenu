# Changelog

## [2.2.0]
### Added
- A `padbox` class for your own things in the menubar, padded by `--simplemenu-bar-padbox`.
- The bar and the marker follow the theme on a slide whose background contrasts it. `--simplemenu-bar-color-inverted` and `--simplemenu-marker-color-inverted` override that.
- `--simplemenu-bar-color-duration`, for how fast the bar changes colour on such a slide.
- `--simplemenu-logo-color` and `--simplemenu-logo-color-inverted`, for a logo drawn in `currentColor`.

### Changed
- A bar made from `barhtml` gets the class `simplemenu-headerbar` or `simplemenu-footerbar`, and the same `data-name`, instead of that id. A rule written for the id needs the class.
- Reveal.js 4.1 is the minimum version. Below 4.1 the bar is sized wrong.
- Simplemenu's rules weigh one class, so your own CSS overrides them more easily.
- A logo in a `padbox` gets no padding of its own.
- A logo is never dimmed and never reacts to the pointer, and it no longer takes the menu's colour. It follows the bar unless you give it a colour.
- The marker takes the theme's heading colour instead of its text colour, so it changes on `moon`, `dracula` and `solarized`.
- With `rtl`, the whole menubar is laid out right to left, not only the order of its items.

### Fixed
- The bar and the marker take the right colours in `print-pdf` on a page whose background contrasts the theme.
- An embedded deck keeps its menubar on the deck, also in scroll view.
- `hide-menubar` and `hide-menu` work in scroll view, also on vertical slides.
- In `print-pdf`, a page in a stack also gets the stack's `data-state`.
- A bar written after `.slides` is styled as a bottom bar.
- Menu links go to the right slides in a deck with hidden slides.
- Two chapters, or two decks, no longer get the same id.
- The plugin files, the stylesheet and `package.json` can be imported by path again.
- A menubar with a slide number in it leaves no gap when Reveal's `slideNumber` is off.
- A slide number in the menubar is hidden in scroll view, like Reveal's own.



## [2.1.1] - 2026-09-04
### Added
- CSS variables for the whole stylesheet, 50-plus of them. The list is in the [readme](https://github.com/martinomagnifico/reveal.js-simplemenu#css-variables).
- An optional marker under the current chapter, shown once you set `--simplemenu-marker-thickness`.
- An optional background on a menu item, for its normal, hover and active states.
- `--simplemenu-item-align`, for when the marker does not line up with the edge of the bar.
- `--simplemenu-bar-hidden-transform` and `--simplemenu-bar-hidden-opacity`, so the bar can fade instead of slide.
- `simplemenu-bar` and `simplemenu-menu` as identifiers, so styling survives a renamed `menubarclass` or `menuclass`.

### Fixed
- The menu has its own `--simplemenu-menu-duration` and `--simplemenu-menu-easing`.
- Now only a slide number in the menubar gets restyled.
- A stack now always gets the resolved `data-name`.
- A renamed `menuclass` or `menubarclass` no longer leaves you with an empty bar.
- The marker on a `.bottom` bar sits on the top edge again.
- The menubar border no longer overlaps the marker in a menu item.
- Fix for menu fade if hide-menu.



## [2.1.0] - 2026-08-25
### Breaking
- Simplemenu ships a default header bar and adds it for you. If you want no bar, then set `barhtml: { header: "" }`.
- Generated menubars get a fixed id, `simplemenu-headerbar` or `simplemenu-footerbar`. A bar you write yourself keeps its own id.
- The module build is `plugin/simplemenu/simplemenu.mjs`, where 2.0.3 had `simplemenu.esm.js`. An `exports` alias keeps the old specifier working, but a `<script src>` to the old path does not.
- `plugin/simplemenu/plugin-src.js` is no longer published. The source is in the repository.

### Added
- Simplemenu adds no bar if your presentation already has one. A bar counts as yours when it has the `menubarclass`, or when there is a menu inside it to fill.
- `rtl` is a Simplemenu option now. Reveal's own setting is still the default.
- An id in your `barhtml` is kept.

### Changed
- `--simplemenu-bar-padding` defaults to `0` again, as in 2.0.3.
- Rebuilt with Vite and Vituum, and updated for Reveal.js 6, which ships its plugins in `dist/plugin`.
- Adopted `reveal.js-plugintoolkit` for setup, config merging, CSS autoloading and debug logging. This adds the `cssautoload` option and fixes the `import.meta` bug in the UMD build.
- Menu links are built as elements, where 2.0.3 wrote the menu as one HTML string.
- Menubar positioning and the `ready` state are handled in CSS instead of from JavaScript.

### Deprecated
- The plain `name` attribute on a section. Use `data-name`. It still works, and now prints a one-time warning. The "select by name" demo page is gone; "select by data-name" covers it.

### Fixed
- A slide number moved into a menubar stays there under Quarto, which loaded a rule of the same weight after Simplemenu's.
- A manual menu with `activeelement: "a"` and `selectby: "id"` navigates through Simplemenu again.
- Right-to-left no longer reverses a menu outside a menubar, so a table of contents keeps its order.
- `build-plugin` pointed at a `.js` config file that is a `.ts` file, so the plugin build did not run.
- The demo build skipped `index.pug` and `packagetest.pug`.



## [2.0.3] - 2025-01-31
### Changed
- Changed regex to allow for Unicode characters in the `data-name` attribute.



## [2.0.2] - 2025-01-29
### Changed
- Removed (version 4) peer dependency on Reveal.js.



## [2.0.1] - 2023-06-10
### Changed
- Simplemenu will now not stop of no menu is present at all (manual or via options)



## [2.0.0] - 2022-12-22
### Added
- Autoload the CSS styling.
- Added a new `csspath` option if the user wants to override the autoloading of the included styles. For example, to customise the styling.
- Added a new `barhtml` option so that the user can easily add a header or footer through the options.
- Added Markdown support for regular Markdown and Quarto.
- Added a `scale` option.
- Added `rtl` behaviour. When set to true in the Reveal.js options, autogenerated menus will also display right-to-left.
- Added possibility to move slide numbers and/or controls into the menubar. The user needs to add a div with the corresponding name into the menubar, the element will then move there.
### Changed
- Automode is removed, Simplemenu will adjust the behaviour on the existence of menu-items in the menus.
- Allow same data-names



## [1.1.2] - 2022-10-09
### Fixed
- Fix visible menu when slidenumber is displayed



## [1.1.1] - 2022-09-04
### Changed
- Rewrite some code



## [1.1.0] - 2022-03-16
### Changed
- Fix check of parentnode of tested slide



## [1.0.9] - 2021-12-23
### Changed
- Fixed omission of ID's for print-pdf



## [1.0.8] - 2021-12-23
### Added
- Started keeping the changelog.

### Changed
- Fixed menu items that should be active for `print-pdf` pages, introduced by Reveal version 4.1.1



## [1.0.7] - 2021-11-19
### Changed
- Bugfix where there was a check for the Internation plugin setting



## [1.0.6] - 2021-11-19
### Added
- Added detection of the Internation plugin to correctly link translated menu-items as well in auto mode.



## [1.0.4] - 2021-10-23
### Added
- Added a possibility to use 'data-name' instead of 'name'.

### Changed
- This fixes the issue where a comment in the .slides div would break the links.



## [1.0.3] - 2020-06-16
### Added
- Added compatibility with the new Reveal.js 4 that changes the way plugins work.



## [1.0.2] - 2020-06-09
### Added
- This version is compatible with Reveal 3.
