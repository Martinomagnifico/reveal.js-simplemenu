// The plugin id, and the prefix on anything this plugin prints to the console.
export const PLUGIN_ID = "simplemenu";

// Simplemenu writes these onto the bar and the menu it finds, whatever the deck
// called them. The stylesheet uses these two names only, so `menubarclass` and
// `menuclass` can be renamed to dodge a collision with another plugin without
// taking the styling with them. They are not options: a name nobody can change
// is the point.
export const BAR_CLASS = "simplemenu-bar";
export const MENU_CLASS = "simplemenu-menu";

// The class on the toolkit anchor each bar is put in.
export const ANCHOR_CLASS = "simplemenu-anchor";

// The class, and the `data-name`, on a bar Simplemenu makes from `barhtml`. Not an
// id: every deck on a page can have one, and an id may only be on a page once.
export const HEADER_BAR_KEY = "simplemenu-headerbar";
export const FOOTER_BAR_KEY = "simplemenu-footerbar";

// The bar Simplemenu adds when the deck has none. Built from the class names, so
// a renamed `menuclass` still produces a menu that Simplemenu goes on to find.
export const defaultBarHeader = (menubarclass: string, menuclass: string): string =>
	`<nav class='${menubarclass}'><ul class='${menuclass}'></ul></nav>`;

export interface Config {
	activeclass: string;
	activeelement: "li" | "a";
	barhtml: {
		header: string;
		footer: string;
	};
	cssautoload: boolean;
	csspath: string;
	debug?: boolean;
	flat: boolean;
	menubarclass: string;
	menuclass: string;
	/** Read from the deck's own config, not from here: the bar takes its direction from Reveal's `rtl` unless a deck sets this one. See `anchor-bars.ts`. */
	rtl?: boolean;
	scale: number;
	selectby: "id" | "data-name" | "name";
}

const defaultConfig: Config = {
	activeclass: "active",
	activeelement: "li",
	barhtml: {
		header: defaultBarHeader("menubar", "menu"),
		footer: "",
	},
	cssautoload: true,
	csspath: "",
	flat: false,
	menubarclass: "menubar",
	menuclass: "menu",
	scale: 0.67,
	selectby: "id",
};

export { defaultConfig };
