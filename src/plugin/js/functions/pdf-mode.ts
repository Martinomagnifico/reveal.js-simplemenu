import type { ThemeColors } from "reveal.js-plugintoolkit";
import type { Config } from "../config";
import { BAR_CLASS } from "../config";
import type { Deck, SlideMapItem } from "../types";
import { activateMenuItem } from "./activate-menu-item";
import { moveRevealUI } from "./get-reveal-ui";

const LIGHT_CLASS = "has-light-background";
const DARK_CLASS = "has-dark-background";
const INVERTED_CLASS = "c-theme-inverted";

/**
 * Give a page whose background contrasts the theme the colours that belong with it.
 *
 * On screen the toolkit keeps one set of colours on the viewport, matched to the
 * slide being shown. A print has every page at once, so one set cannot serve them
 * all: each page has to carry its own. Reveal marks the slide, not the page, so
 * that is what gets read.
 */
const applyPageColors = (page: Element, colors: ThemeColors | null): void => {
	if (!colors) return;

	const slide = page.querySelector("section");
	if (!slide) return;

	const inverted =
		colors.theme === "dark"
			? slide.classList.contains(LIGHT_CLASS)
			: slide.classList.contains(DARK_CLASS);
	if (!inverted) return;

	// On the page, so the bar inside it and the deck's own rules for this case both see it.
	page.classList.add(INVERTED_CLASS);

	if (page instanceof HTMLElement) {
		page.style.setProperty("--c-theme-color", colors.text.inverse);
		page.style.setProperty("--c-theme-heading-color", colors.heading.inverse);
	}
};

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
	auto: boolean,
	themeColors: ThemeColors | null = null
): void => {
	const slides = deck.getSlidesElement();
	const pdfPages = slides.querySelectorAll(".pdf-page");
	const menubars = Array.from(
		deck.getViewportElement().querySelectorAll<HTMLElement>(`.${BAR_CLASS}`)
	);

	Array.from(pdfPages).forEach((page, pageIndex) => {
		cloneMenubarsToPage(page, menubars);
		applyPageColors(page, themeColors);

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
