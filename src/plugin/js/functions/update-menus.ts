import type { Config } from "../config";
import type { SlideMapItem } from "../types";
import { activateMenuItem } from "./activate-menu-item";

export const updateMenus = (
	index: number,
	slideMap: Map<number, SlideMapItem>,
	options: Config,
	menus: HTMLUListElement[],
	auto = false
): void => {
	const slide = slideMap.get(index);
	if (!slide) return;

	const barMenus = menus.filter((menu) => !menu.closest("section"));
	for (const menu of barMenus) {
		activateMenuItem(menu, slide, options, auto);
	}
};
