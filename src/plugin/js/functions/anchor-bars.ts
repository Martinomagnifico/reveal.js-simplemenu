import { positionTools, type RevealInstance } from "reveal.js-plugintoolkit";
import { ANCHOR_CLASS, BAR_CLASS } from "../config";
import type { Deck } from "../types";

/**
 * Put every bar into an anchor from the toolkit.
 *
 * An anchor holds the top or bottom edge of what the reader sees: the window for a
 * deck that has the page to itself, the deck's own box when it is embedded, and
 * in scroll view as well. The stylesheet then only has to place the bar against
 * that edge. A bar that was `position: fixed` on its own pinned to the window,
 * which put the bars of an embedded deck on the page instead of on the deck.
 *
 * This is every bar outside the slides, whether Simplemenu added it from `barhtml`
 * or the deck wrote it in its HTML. A menu inside a slide is a table of contents,
 * not a bar, and stays where it is.
 */
export const anchorBars = (deck: Deck): void => {
	const revealElement = deck.getRevealElement();
	const slides = deck.getSlidesElement();
	const bars = Array.from(
		deck.getViewportElement().querySelectorAll<HTMLElement>(`.${BAR_CLASS}`)
	).filter((bar) => !bar.closest(".slides"));

	// Simplemenu's own `rtl` option, as the deck wrote it. The anchor follows Reveal's `rtl`, so the bar only needs a direction of its own when the two can differ.
	const ownRtl = deck.getConfig().simplemenu?.rtl;

	for (const bar of bars) {
		// A bar written after `.slides` has always meant a bar at the bottom. It gets the class too, so the stylesheet treats it as one.
		const afterSlides =
			bar.parentElement === slides.parentElement &&
			(slides.compareDocumentPosition(bar) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
		if (afterSlides) bar.classList.add("bottom");

		const edge = bar.classList.contains("bottom") ? "bottom" : "top";
		const anchor = positionTools.addAnchor(deck as unknown as RevealInstance, {
			edge,
			className: ANCHOR_CLASS,
			// A custom property, so a deck can still lift the bar above something of its own.
			zIndex: "var(--simplemenu-bar-z, 2)",
		});
		if (!anchor) continue;

		// Where the anchor is among the deck's children does not change where it shows, so a top bar goes first, as a header bar always has, and comes first in the tab order too.
		if (edge === "top") revealElement.insertAdjacentElement("afterbegin", anchor);
		anchor.appendChild(bar);

		if (ownRtl !== undefined) bar.dir = ownRtl ? "rtl" : "ltr";
	}
};
