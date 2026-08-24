import type { Deck, SlideMapItem } from "../types";
import type { Config } from "../config";
import { moveRevealUI } from "./get-reveal-ui";
import { activateMenuItem } from "./activate-menu-item";

const cloneMenubarsToPage = (page: Element, menubars: HTMLElement[]): void => {
	for (const menubar of menubars) {
		const clone = menubar.cloneNode(true);
		if (!(clone instanceof HTMLElement)) continue;

		if (clone.classList.contains("bottom")) {
			page.insertAdjacentElement("beforeend", clone);
		} else {
			page.insertAdjacentElement("afterbegin", clone);
		}

		if (menubar.parentNode) {
			menubar.parentNode.removeChild(menubar);
		}
	}
};

const applyStates = (page: Element, mapItem: SlideMapItem | undefined): void => {
	if (mapItem?.state) {
		const states = mapItem.state.split(" ").filter(Boolean);
		for (const state of states) {
			page.classList.add(state);
		}
	}
};

export const handlePdfMode = (
	deck: Deck,
	slideMap: Map<number, SlideMapItem>,
	options: Config,
	auto: boolean
): void => {
	const slides = deck.getSlidesElement();
	const pdfPages = slides.querySelectorAll(".pdf-page");
	const menubars = Array.from(
		deck.getViewportElement().querySelectorAll<HTMLElement>(".menubar")
	);

	Array.from(pdfPages).forEach((page, pageIndex) => {
		cloneMenubarsToPage(page, menubars);

		const slideNumberPDF = page.querySelector(".slide-number-pdf");
		const slideNumber = page.querySelector(".slide-number-a");
		if (slideNumberPDF && slideNumber) {
			moveRevealUI(slideNumberPDF as HTMLElement, slideNumber as HTMLElement);
		}

		const mapItem = slideMap.get(pageIndex);
		if (!mapItem) return;

		applyStates(page, mapItem);

		const pageMenus = page.querySelectorAll(`.${options.menuclass}`);
		for (const menu of pageMenus) {
			activateMenuItem(menu, mapItem, options, auto);
		}
	});
};
