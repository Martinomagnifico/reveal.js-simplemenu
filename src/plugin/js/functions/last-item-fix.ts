import type { Deck } from "../types";

/**
 * Initializes a MutationObserver to handle changes to the viewport's class attribute.
 * @param viewport - The DOM element to observe.
 * @param deck - The Reveal.js deck instance.
 */
export function fixLastItem(deck: Deck, viewport: HTMLElement): void {
	const observer = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type === "attributes" && mutation.attributeName === "class") {
				// Just handle virtual anchor for scroll mode
				if (viewport.classList.contains("reveal-scroll")) {
					const slidesEl = deck.getSlidesElement();
					if (!slidesEl.querySelector(".virtual-anchor")) {
						const anchor = document.createElement("div");
						anchor.className = "virtual-anchor";
						anchor.style.height = "1px";
						anchor.style.visibility = "hidden";
						slidesEl.appendChild(anchor);
					}
				}
			}
		}
	});

	observer.observe(viewport, { attributes: true });
}
