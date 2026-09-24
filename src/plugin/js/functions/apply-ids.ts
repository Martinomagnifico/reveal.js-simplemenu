import { textTools } from "reveal.js-plugintoolkit";
import type { SlideMapItem } from "../types";
import { uniqueId } from "./unique-id";

/** The element a chapter's id goes on: the slide itself, or for a stack its first vertical slide, because Reveal goes to slides, not to stacks. */
const targetOf = (element: HTMLElement): HTMLElement =>
	element.querySelector<HTMLElement>(":scope > section") ?? element;

/**
 * Give each chapter an id to link to, and put it on its slide in the same step.
 *
 * An id the deck wrote is kept. With `generate`, a chapter without one gets an
 * id made from its name, unique on the page. It is written onto the slide as soon
 * as it is chosen, so a second deck that starts at the same time finds it taken
 * instead of choosing the same one.
 *
 * Each map item carries its own slide, so a hidden slide, which the map leaves
 * out, does not move the ids after it onto the wrong slides.
 */
export function applyIds(slideMap: Map<number, SlideMapItem>, generate: boolean): void {
	const named = new Set<string>();

	for (const [, slide] of slideMap) {
		const element = slide.element;
		if (!element) continue;
		const target = targetOf(element);

		if (slide.id) {
			if (!target.id) {
				target.id = slide.id;
				// A stack's id moves to its first slide, so it is not on the page twice.
				if (element !== target && element.id === slide.id) element.removeAttribute("id");
			}
			continue;
		}

		// Chapters with the same name share one menu item, so only the first gets an id.
		if (!generate || !slide.name || named.has(slide.name)) continue;
		named.add(slide.name);

		// A slide that already has an id, the deck's or its own name's, is linked to by that id.
		if (target.id) {
			slide.id = target.id;
			continue;
		}

		const base = textTools.sanitizeText(slide.name);
		if (!base) continue;
		slide.id = uniqueId(base);
		target.id = slide.id;
	}
}
