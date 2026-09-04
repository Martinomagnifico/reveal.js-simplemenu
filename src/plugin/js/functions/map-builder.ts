import { pluginDebug as debug, textTools, warnOnce } from "reveal.js-plugintoolkit";
import { PLUGIN_ID } from "../config";
import type { Deck, SlideMapItem } from "../types";

// A plain `name` on a section is not valid HTML and is no longer documented or demoed. It keeps working, so a deck that uses one is told what to write instead rather than losing its menu.
const LEGACY_NAME_NOTICE =
	"A section is using the name attribute for its menu item. Use data-name instead: name still works, but it is no longer documented and support for it can go in a future version.";

const readName = (element: Element): string | null => {
	const name = element.getAttribute("name");
	if (name) warnOnce(PLUGIN_ID, LEGACY_NAME_NOTICE);
	return name;
};

const getEffectiveName = (section: Element) => {
	// Check data-name and name on the section
	const dataName = section.getAttribute("data-name");
	if (dataName) return dataName;

	const name = readName(section);
	if (name) return name;

	// Check the first nested section for stacks
	const nestedSection = section.querySelector("section");
	return nestedSection
		? nestedSection.getAttribute("data-stack-name") ||
				nestedSection.getAttribute("data-name") ||
				readName(nestedSection) ||
				null
		: null;
};

export const buildBaseMap = (deck: Deck, options: { flat: boolean }): Map<number, SlideMapItem> => {
	// Check if we are in pdf mode Using Reveal's ?print-pdf or Quarto's ?view=print
	const isPdfMode = /[?&](print-pdf|view=print)\b/i.test(window.location.search);

	const slideMap = new Map<number, SlideMapItem>();
	const slidesContainer = deck.getRevealElement().querySelector(".slides");
	const horizontalSections = slidesContainer?.children || [];
	let currentIndex = 0;

	const hasInternation = deck.getPlugin("internation");
	const langattribute = hasInternation
		? deck.getConfig().internation?.langattribute || "data-i18n"
		: "data-i18n";

	// Iterate over all horizontal slides
	for (const section of horizontalSections) {
		if (
			!(section instanceof HTMLElement) ||
			section.tagName !== "SECTION" ||
			section.getAttribute("data-visibility") === "hidden"
		) {
			continue;
		}

		// Start with index and name
		const mapItem: SlideMapItem = {
			index: currentIndex,
			name: null,
		};

		// Check for flat mode and inheritance
		if (options.flat) {
			if (section.querySelector("section")) {
				debug.warn(
					"Vertical slides detected while using flat mode. This may cause unexpected behavior."
				);
			}
			if (section.getAttribute("data-sm") === "false") {
				mapItem.stopInheritance = true;
			}
		}

		// Check for an id on the section or the first child
		if (section.id) {
			mapItem.id = section.id;
		} else {
			const firstChild = section.firstElementChild;
			if (
				firstChild instanceof HTMLElement &&
				firstChild.tagName === "SECTION" &&
				firstChild.id
			) {
				mapItem.id = firstChild.id;
			}
		}

		// Check for a name on the section or the first child
		mapItem.name = getEffectiveName(section);

		// A stack is not something an author can address in Markdown: Reveal builds it around the slides, so `data-stack-name` has to be written on the first vertical slide instead. Copy the resolved name onto the stack itself, so the finished DOM is the same however the deck was authored, and so anything that asks a stack about itself — Internation keys its dictionary on `data-name` — has something to read.
		if (mapItem.name && !section.dataset.name && section.querySelector(":scope > section")) {
			section.dataset.name = mapItem.name;
		}

		// Check for a lang attribute on the section or the first child
		const langattr =
			section.getAttribute(langattribute) ||
			section.querySelector("section")?.getAttribute(langattribute);
		if (langattr) {
			mapItem.langattr = langattr;
		}

		// Check for a data-sm on the section. Note that this is not the same as the data-sm that is set on menu items to track active states
		if (section.getAttribute("data-sm") === "false") {
			mapItem.name = null;
			mapItem.id = undefined;
		}

		// Check for a state on the section
		const state = section.getAttribute("data-state");
		if (state) {
			mapItem.state = state;
		}

		// Here we handle vertical slides
		if (!isPdfMode && section.querySelectorAll("section").length > 0) {
			// Add ids to vertical slides as well but do not add to the map
			const verticalSlides = section.querySelectorAll(":scope > section");

			for (const vSlide of verticalSlides) {
				if (
					vSlide instanceof HTMLElement &&
					vSlide.getAttribute("data-visibility") !== "hidden"
				) {
					if (!vSlide.id) {
						const name = getEffectiveName(vSlide);
						if (name) {
							vSlide.id = textTools.sanitizeText(name);
						}
					}
				}
			}
		}

		// Vertical slides as well, but only in pdf mode
		if (isPdfMode && section.querySelectorAll("section").length > 0) {
			// Get the stack's name (either from stack or first child)
			const stackName = getEffectiveName(section);

			const langattr =
				section.getAttribute(langattribute) ||
				section.querySelector("section")?.getAttribute(langattribute) ||
				null;

			// Get the vertical slides from this stack
			const verticalSlides = section.querySelectorAll(":scope > section");

			let vIndex = 0;

			for (const vSlide of verticalSlides) {
				if (
					vSlide instanceof HTMLElement &&
					vSlide.getAttribute("data-visibility") !== "hidden"
				) {
					const verticalItem: SlideMapItem = {
						index: currentIndex,
						name: stackName,
						id: vSlide.id || mapItem.id,
						isVertical: true,
						verticalIndex: vIndex++,
						langattr: langattr,
					};

					const vState = vSlide.getAttribute("data-state");
					if (vState) {
						verticalItem.state = vState;
					}

					slideMap.set(currentIndex, verticalItem);
					currentIndex++;
				}
			}
		} else {
			// Regular non-PDF slide
			slideMap.set(currentIndex, mapItem);
			currentIndex++;
		}
	}

	return options.flat ? processInheritance(slideMap) : slideMap;
};

const processInheritance = (baseMap: Map<number, SlideMapItem>): Map<number, SlideMapItem> => {
	let currentName: string | null = null;

	const sortedIndices = Array.from(baseMap.keys()).sort((a, b) => a - b);

	for (const index of sortedIndices) {
		const item = baseMap.get(index);
		if (!item) continue;

		if (item.stopInheritance) {
			currentName = null;
		} else if (item.name) {
			currentName = item.name;
		}

		item.name = currentName;
		baseMap.set(index, item);
	}

	return baseMap;
};
