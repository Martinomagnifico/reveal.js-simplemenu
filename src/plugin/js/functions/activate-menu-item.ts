import type { Deck, SlideMapItem } from "../types";
import type { Config } from "../config";

export const activateMenuItem = (
	menu: Element,
	mapItem: SlideMapItem,
	options: Config,
	auto: boolean
): void => {
	const items = menu.querySelectorAll(options.activeelement);

	// Reset all items first
	for (const item of items) {
		item.classList.remove(options.activeclass);
	}

	// Check for matches
	for (const item of items) {
		let matches = false;
		if (!auto && options.selectby === "id") {
			// Get anchor element and type check it
			const anchor = (
				options.activeelement === "a" ? item : item.querySelector("a")
			) as HTMLAnchorElement | null;

			if (anchor?.href) {
				const href = anchor.href.split("#").pop() || "";
				const targetId = href.startsWith("/") ? href.substring(1) : href;
				matches = targetId === mapItem.id;
			}
		} else {
			const anchor = (
				options.activeelement === "a" ? item : item.querySelector("a")
			) as HTMLAnchorElement | null;
			const dataSm = anchor?.getAttribute("data-sm");
			matches = mapItem.name !== null && dataSm !== null && dataSm === mapItem.name;
		}

		if (matches) {
			item.classList.add(options.activeclass);
		}
	}
};
