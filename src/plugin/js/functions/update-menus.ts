import type { Config } from "../config";
import type { SlideMapItem } from "../types";
import { activateMenuItem } from "./activate-menu-item";

let currentStates: string[] = [];

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

export const updateStates = (
	index: number,
	slideMap: Map<number, SlideMapItem>,
	viewport: HTMLElement
): void => {
	const slide = slideMap.get(index);
	if (!slide) return;

	// Remove previous states
	for (const state of currentStates) {
		viewport.classList.remove(state);
	}

	// Add new states
	currentStates = slide.state?.split(" ").filter(Boolean) || [];
	for (const state of currentStates) {
		viewport.classList.add(state);
	}
};
