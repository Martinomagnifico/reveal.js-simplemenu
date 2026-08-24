import { eventTools, pluginDebug as debug, type RevealInstance } from "reveal.js-plugintoolkit";
import type { Deck, RevealSlideEvent, SlideMapItem } from "./types";
import type { Config } from "./config";

import { updateMenus, updateStates } from "./functions/update-menus";
import { handleClick } from "./functions/click-handler";
import { prepareMenubars } from "./functions/setup-auto-menus";
import { handlePdfMode } from "./functions/pdf-mode";
import { applyIds } from "./functions/apply-ids";
import { fixLastItem } from "./functions/last-item-fix";
import { getRevealUI } from "./functions/get-reveal-ui";

import { isAutoMode } from "./functions/check-auto-mode";
import { buildBaseMap } from "./functions/map-builder";

export class SimpleMenu {
	private readonly deck: Deck;
	private readonly viewport: HTMLElement;
	private readonly options: Config;
	private readonly slideMap: Map<number, SlideMapItem>;
	private readonly auto: boolean;
	private menus: HTMLUListElement[];

	private constructor(deck: Deck, options: Config) {
		this.deck = deck;
		this.options = options;
		this.viewport = deck.getViewportElement();

		this.slideMap = buildBaseMap(deck, options);

		this.menus = Array.from(this.viewport.querySelectorAll(`.${options.menuclass}`)).filter(
			(menu): menu is HTMLUListElement => menu instanceof HTMLUListElement
		);

		this.auto = isAutoMode(this.menus);

		if (!this.auto) {
			for (const menu of this.menus) {
				const items = menu.querySelectorAll(this.options.activeelement);
				for (const item of items) {
					// With activeelement "a" the item is the anchor itself, so looking inside it would search an anchor for an anchor and find nothing. Manual menus would then never be matchable.
					const anchor =
						item instanceof HTMLAnchorElement ? item : item.querySelector("a");
					if (anchor && !anchor.hasAttribute("data-sm")) {
						anchor.setAttribute("data-sm", anchor.textContent?.trim() || "");
					}
				}
			}
		}

		if (this.options.debug) {
			console.log(
				`Mode: ${this.auto ? "auto" : "manual"}, flat navigation: ${this.options.flat}`
			);
			console.log("Map of all slides:");
			console.dir([...this.slideMap], { depth: null });
		}
	}

	static async create(deck: Deck, options: Config): Promise<SimpleMenu> {
		debug.group();
		const instance = new SimpleMenu(deck, options);
		await instance.prepareSlides();
		debug.groupEnd();
		instance.setupEventListeners();
		return instance;
	}

	private async prepareSlides(): Promise<void> {
		if (this.auto) {
			prepareMenubars(this.deck, this.slideMap, this.options);
			this.menus = Array.from(this.viewport.querySelectorAll(`.${this.options.menuclass}`));
		}
		// Simplemenu types the deck more narrowly than the toolkit does.
		eventTools.addDirectionEvents(this.deck as unknown as RevealInstance);
		applyIds(this.deck, this.slideMap);
		fixLastItem(this.deck, this.viewport);

		this.viewport.style.setProperty("--simplemenu-scale", this.options.scale.toString());
	}

	private setupEventListeners(): void {
		this.deck.on("ready", (event: unknown) => {
			debug.log("Ready event");
			getRevealUI(this.deck);

			const e = event as RevealSlideEvent;

			updateMenus(e.indexh, this.slideMap, this.options, this.menus, this.auto);
			updateStates(e.indexh, this.slideMap, this.viewport);

			this.viewport.addEventListener("click", (event) =>
				handleClick(event, this.deck, this.options, this.slideMap, this.auto, this.viewport)
			);

			this.viewport.classList.add("simplemenu-ready");
		});

		this.deck.on("slidechanged-h", (event: unknown) => {
			const e = event as RevealSlideEvent;
			updateMenus(e.indexh, this.slideMap, this.options, this.menus, this.auto);
			updateStates(e.indexh, this.slideMap, this.viewport);
		});

		this.deck.on("slidechanged-v", (event: unknown) => {
			const e = event as RevealSlideEvent;
			updateStates(e.indexh, this.slideMap, this.viewport);
		});

		this.deck.on("pdf-ready", () => {
			debug.log("PDF ready event");
			handlePdfMode(this.deck, this.slideMap, this.options, this.auto);
		});
	}
}
