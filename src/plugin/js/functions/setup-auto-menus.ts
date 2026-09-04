import { textTools } from "reveal.js-plugintoolkit";
import type { Config } from "../config.ts";
import type { Deck, SlideMapItem } from "../types";

export const prepareMenubars = (
	deck: Deck,
	slideMap: Map<number, SlideMapItem>,
	options: Config
): void => {
	const revealEl = deck.getRevealElement();
	const viewport = deck.getViewportElement();
	const langattribute = deck.getConfig().internation?.langattribute || "data-i18n";

	// Auto mode only means the menus are empty, not that there is no bar: an author can supply their own bar for Simplemenu to fill. Injecting the default header on top of that would give them two bars. A bar counts whether it carries the menubar class or simply holds a menu to fill, but anything inside the slides is a table of contents rather than a bar.
	const outsideSlides = (el: Element): boolean => !el.closest(".slides");

	const hasAuthorBar =
		Array.from(viewport.querySelectorAll(`.${options.menubarclass}`)).some(outsideSlides) ||
		Array.from(viewport.querySelectorAll(`.${options.menuclass}`)).some(outsideSlides);

	// Add header menubar if specified, and if the author has not supplied one
	if (options.barhtml.header && !hasAuthorBar) {
		const tempContainer = document.createElement("div");
		tempContainer.innerHTML = options.barhtml.header.trim();

		const firstElement = tempContainer.firstElementChild;
		if (firstElement) {
			// An id in your own barhtml wins, the same way an id on a bar in your markup does. That is also the migration route from 2.0.3, whose ids were `menubartop` and `menubarbottom`: naming the bar yourself keeps an Internation dictionary keyed on the old id working.
			if (!firstElement.id) {
				firstElement.id = "simplemenu-headerbar";
			}
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
			if (!insertedElement.id) {
				insertedElement.id = "simplemenu-footerbar";
			}
			revealEl.appendChild(insertedElement);
		}
	}

	// Fill all empty menus
	const allMenus = viewport.querySelectorAll(`.${options.menuclass}`);
	for (const menu of allMenus) {
		if (!menu.querySelector(":scope > li")) {
			fillMenu(menu as HTMLUListElement, slideMap, options, langattribute);
		}
	}
};

const fillMenu = (
	menu: HTMLUListElement,
	slideMap: Map<number, SlideMapItem>,
	config: Config,
	langattribute: string
): void => {
	const menuItems: HTMLLIElement[] = [];
	const usedNames = new Set<string>();

	for (const [_, slide] of slideMap) {
		if (slide.name && !usedNames.has(slide.name)) {
			// Create the menu item
			const li = document.createElement("li");
			const a = document.createElement("a");

			if (!slide.id) {
				slide.id = textTools.sanitizeText(slide.name);
			}

			if (slide.langattr) {
				a.setAttribute(langattribute, slide.langattr);
			}

			a.href = `#/${slide.id}`;
			a.textContent = slide.name;
			a.setAttribute("data-sm", slide.name);
			li.appendChild(a);
			menuItems.push(li);

			usedNames.add(slide.name);
		}
	}

	// If RTL and menu is in a horizontal menubar, reverse the order
	if (config.rtl && menu.closest(`.${config.menubarclass}`)) {
		menuItems.reverse();
	}

	// Add items to menu
	for (const item of menuItems) {
		menu.appendChild(item);
	}
};
