import { type Config, FOOTER_BAR_KEY, HEADER_BAR_KEY } from "../config.ts";
import type { Deck, SlideMapItem } from "../types";

/**
 * Mark a bar made from `barhtml`: a class to style it by, and a `data-name`, which is
 * the key Internation looks up for anything inside the bar. Not an id, because every
 * deck on a page can have this bar. Internation reads a `data-name` before an id, so a
 * dictionary keyed on the name translates the bar in every deck. A bar that already has
 * an id or a `data-name` of its own keeps it, and is looked up by that.
 */
const markBar = (bar: Element, key: string): void => {
	bar.classList.add(key);
	if (bar instanceof HTMLElement && !bar.id && !bar.dataset.name) bar.dataset.name = key;
};

// Auto mode only means the menus are empty, not that there is no bar: an author can supply their own bar for Simplemenu to fill. Injecting the default header on top of that would give them two bars. A bar counts whether it carries the menubar class or simply holds a menu to fill, but anything inside the slides is a table of contents rather than a bar.
const hasAuthorBar = (viewport: HTMLElement, options: Config): boolean => {
	const outsideSlides = (el: Element): boolean => !el.closest(".slides");
	return (
		Array.from(viewport.querySelectorAll(`.${options.menubarclass}`)).some(outsideSlides) ||
		Array.from(viewport.querySelectorAll(`.${options.menuclass}`)).some(outsideSlides)
	);
};

/** Whether a piece of `barhtml` holds a menu for Simplemenu to fill. Read from the string, so the bar does not have to be on the page yet. */
const holdsMenu = (html: string, options: Config): boolean => {
	if (!html) return false;
	const template = document.createElement("template");
	template.innerHTML = html.trim();
	return !!template.content.querySelector(`.${options.menuclass}`);
};

/**
 * Whether Simplemenu is going to fill a menu, and so needs ids to link to. Worked
 * out before any bar is added, so the ids can be claimed at the very start.
 */
export const willFillMenus = (deck: Deck, options: Config): boolean => {
	const viewport = deck.getViewportElement();
	const emptyMenuNow = Array.from(viewport.querySelectorAll(`.${options.menuclass}`)).some(
		(menu) => !menu.querySelector(":scope > li")
	);
	return (
		emptyMenuNow ||
		(!hasAuthorBar(viewport, options) && holdsMenu(options.barhtml.header, options)) ||
		holdsMenu(options.barhtml.footer, options)
	);
};

export const prepareMenubars = (
	deck: Deck,
	slideMap: Map<number, SlideMapItem>,
	options: Config
): void => {
	const revealEl = deck.getRevealElement();
	const viewport = deck.getViewportElement();
	const langattribute = deck.getConfig().internation?.langattribute || "data-i18n";

	// Add header menubar if specified, and if the author has not supplied one
	if (options.barhtml.header && !hasAuthorBar(viewport, options)) {
		const tempContainer = document.createElement("div");
		tempContainer.innerHTML = options.barhtml.header.trim();

		const firstElement = tempContainer.firstElementChild;
		if (firstElement) {
			markBar(firstElement, HEADER_BAR_KEY);
			revealEl.insertAdjacentElement("afterbegin", firstElement);
		}
	}

	// Add footer menubar if specified
	if (options.barhtml.footer) {
		const wrapper = document.createElement("div");
		wrapper.innerHTML = options.barhtml.footer.trim();
		const insertedElement = wrapper.firstElementChild;

		if (insertedElement) {
			insertedElement.classList.add("bottom");
			markBar(insertedElement, FOOTER_BAR_KEY);
			revealEl.appendChild(insertedElement);
		}
	}

	const emptyMenus = Array.from(viewport.querySelectorAll(`.${options.menuclass}`)).filter(
		(menu) => !menu.querySelector(":scope > li")
	);

	// The ids the links point at were claimed when the plugin started. See `SimpleMenu.claim`.
	for (const menu of emptyMenus) {
		fillMenu(menu as HTMLUListElement, slideMap, langattribute);
	}
};

const fillMenu = (
	menu: HTMLUListElement,
	slideMap: Map<number, SlideMapItem>,
	langattribute: string
): void => {
	const menuItems: HTMLLIElement[] = [];
	const usedNames = new Set<string>();

	for (const [_, slide] of slideMap) {
		if (slide.name && !usedNames.has(slide.name)) {
			// Create the menu item
			const li = document.createElement("li");
			const a = document.createElement("a");

			if (slide.langattr) {
				a.setAttribute(langattribute, slide.langattr);
			}

			a.href = `#/${slide.id ?? ""}`;
			a.textContent = slide.name;
			a.setAttribute("data-sm", slide.name);
			li.appendChild(a);
			menuItems.push(li);

			usedNames.add(slide.name);
		}
	}

	// Add items to menu
	for (const item of menuItems) {
		menu.appendChild(item);
	}
};
