import type { Deck } from "../types";

export const moveRevealUI = (curUiEl: HTMLElement, newUiEl: HTMLElement): void => {
	const newUiElClassList = newUiEl.classList;
	newUiEl.parentNode?.replaceChild(curUiEl, newUiEl);
	curUiEl.className = newUiElClassList.value;
};

export const getRevealUI = (deck: Deck) => {
	const revealUIs = ["controls", "slide-number"];

	for (const uielement of revealUIs) {
		const curUiEl = deck.getViewportElement().querySelector(`.reveal > .${uielement}`);
		const newUiEl = deck.getViewportElement().querySelector(`.reveal > * .${uielement}`);

		if (curUiEl && newUiEl) {
			moveRevealUI(curUiEl as HTMLElement, newUiEl as HTMLElement);
		}
	}
};
