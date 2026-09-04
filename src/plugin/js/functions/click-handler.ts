import { pluginDebug as debug } from "reveal.js-plugintoolkit";
import type { Config } from "../config";
import type { Deck, SlideMapItem } from "../types";

export const findMenuItemConnection = (
	menuItem: HTMLElement,
	slideMap: Map<number, SlideMapItem>,
	isAuto: boolean,
	selectby: "id" | "data-name" | "name"
): number | null => {
	if (!isAuto && selectby === "id") {
		// With activeelement "a" the item is the anchor itself, so looking
		// inside it would search an anchor for an anchor and find nothing.
		// The click would then match no slide, and Simplemenu would hand it
		// back to the browser instead of navigating the deck itself.
		const anchor =
			menuItem instanceof HTMLAnchorElement ? menuItem : menuItem.querySelector("a");
		if (anchor?.href) {
			const href = anchor.href.split("#").pop() || "";
			const targetId = href.startsWith("/") ? href.substring(1) : href;

			for (const [index, item] of slideMap) {
				if (item.id === targetId) return index;
			}
		}
	} else {
		const menuText = menuItem.textContent?.trim();
		if (menuText) {
			for (const [index, item] of slideMap) {
				if (item.name === menuText) return index;
			}
		}
	}
	return null;
};

export const handleClick = (
	event: MouseEvent,
	deck: Deck,
	options: Config,
	slideMap: Map<number, SlideMapItem>,
	auto: boolean,
	viewport: HTMLElement
): void => {
	const menuItem = (event.target as HTMLElement).closest(options.activeelement);
	if (!menuItem) return;

	const menuItemAnchor = menuItem.tagName === "A" ? menuItem : menuItem.querySelector("a");
	if (!menuItemAnchor) return;

	const href = menuItemAnchor.getAttribute("href");
	if (!href) return;

	const connection = findMenuItemConnection(
		menuItem as HTMLElement,
		slideMap,
		auto,
		options.selectby
	);

	if (connection === null) return;

	const targetSlide = slideMap.get(connection);
	if (!targetSlide) return;

	// The click matched a slide, so Simplemenu is handling it from here. Without
	// this the browser also follows the href, and a manual menu written with
	// href="#" would clear the hash and send the deck back to the first slide,
	// racing whatever navigation happens below.
	event.preventDefault();

	// If we're already on the target slide, do nothing further
	const currentIndices = deck.getIndices();
	if (currentIndices.h === connection && currentIndices.v === 0) return;

	const isScrollView = viewport.classList.contains("reveal-scroll");
	const isInternalLink = href.includes("#/");

	if (isScrollView) {
		// Scroll into view in scroll mode
		const section = viewport.querySelector(`section[data-index-h="${connection}"]`);
		section?.scrollIntoView({ behavior: "instant", block: "start" });
	} else {
		// Navigate slides in presentation mode
		if (isInternalLink && options.selectby === "id") {
			debug.log(`Using internal Reveal ID to go to: ${targetSlide.id}`);
			deck.slide(connection, 0);
		} else {
			debug.log(`Using matched slide to go to: ${connection} (${targetSlide.name})`);
			deck.slide(connection, 0);
		}
	}
};
