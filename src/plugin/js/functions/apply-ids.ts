import type { Deck, SlideMapItem } from "../types";

export function applyIds(deck: Deck, slideMap: Map<number, SlideMapItem>): void {
	const sections = Array.from(deck.getSlidesElement().children);
	for (const [index, slide] of slideMap) {
		if (slide.id) {
			const slideElement = sections[index];
			if (slideElement instanceof HTMLElement) {
				const firstChild = slideElement.querySelector("section");

				if (firstChild && !firstChild.id) {
					firstChild.id = slide.id;

					// Remove id from stack if it's the same as the first child
					if (slideElement.id && slideElement.id === firstChild.id) {
						slideElement.removeAttribute("id");
					}
				} else if (!slideElement.id && !slideElement.querySelector("section")) {
					slideElement.id = slide.id;
				}
			}
		}
	}
}
