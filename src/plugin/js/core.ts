import {
	pluginDebug as debug,
	eventTools,
	type RevealInstance,
	stateTools,
	type ThemeColors,
	themeTools,
} from "reveal.js-plugintoolkit";
import type { Config } from "./config";
import { BAR_CLASS, MENU_CLASS } from "./config";
import { anchorBars } from "./functions/anchor-bars";
import { applyIds } from "./functions/apply-ids";
import { isAutoMode } from "./functions/check-auto-mode";
import { handleClick } from "./functions/click-handler";
import { getRevealUI } from "./functions/get-reveal-ui";
import { fixLastItem } from "./functions/last-item-fix";
import { buildBaseMap } from "./functions/map-builder";
import { handlePdfMode } from "./functions/pdf-mode";
import { prepareMenubars, willFillMenus } from "./functions/setup-auto-menus";
import { updateMenus } from "./functions/update-menus";
import type { Deck, RevealSlideEvent, SlideMapItem } from "./types";

export class SimpleMenu {
	private readonly deck: Deck;
	private readonly viewport: HTMLElement;
	private readonly options: Config;
	private readonly slideMap: Map<number, SlideMapItem>;
	private readonly auto: boolean;
	private menus: HTMLUListElement[];
	// Kept for print mode, where every page is on screen at once and one colour on the viewport cannot serve them all.
	private themeColors: ThemeColors | null = null;

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

		// One switch, not two: the toolkit's debug is already off unless the deck asked for it, so there is no need to test the option here as well.
		debug.log(`Mode: ${this.auto ? "auto" : "manual"}, flat navigation: ${this.options.flat}`);
		debug.log("Map of all slides:");
		debug.dir([...this.slideMap], { depth: null });
	}

	/**
	 * The part of starting up that has to happen straight away, before the plugin waits for anything: reading the slides, and putting the ids on them that the menu links point at.
	 *
	 * Ids are unique on the page, so on a page with several decks the one that claims first keeps the plain id and a later one gets `-2`. Claimed here, decks claim in the order the page starts them. Claimed after the stylesheet wait, as before, the deck whose stylesheet happened to be ready first would win, which can differ from one load to the next.
	 *
	 * Ids are only made when there is a menu to fill, so a deck without one keeps Reveal's numbered URLs.
	 */
	static claim(deck: Deck, options: Config): SimpleMenu {
		debug.group();
		const instance = new SimpleMenu(deck, options);
		applyIds(instance.slideMap, instance.auto && willFillMenus(deck, options));
		return instance;
	}

	/** Everything else: the bars, the menus, the states and the events. */
	async start(): Promise<void> {
		await this.prepareSlides();
		debug.groupEnd();
		this.setupEventListeners();
	}

	private async prepareSlides(): Promise<void> {
		if (this.auto) {
			prepareMenubars(this.deck, this.slideMap, this.options);
			this.menus = Array.from(this.viewport.querySelectorAll(`.${this.options.menuclass}`));
		}
		// Simplemenu types the deck more narrowly than the toolkit does.
		eventTools.addDirectionEvents(this.deck as unknown as RevealInstance);

		// `hide-menubar` and `hide-menu` are slide states. Reveal's scroll view applies none, so the toolkit does it there. Now, from init, because scroll view takes stacks apart and a stack's state has to be read before that.
		stateTools.addSlideStates(this.deck as unknown as RevealInstance);

		this.markElements();
		anchorBars(this.deck);

		// Publishes --c-theme-color, which the bar follows on a slide whose background contrasts the theme. Any plugin may ask; the toolkit measures the theme once per deck however many of them do.
		this.themeColors = await themeTools.addThemeColor(this.deck as unknown as RevealInstance);
		fixLastItem(this.deck, this.viewport);

		this.viewport.style.setProperty("--simplemenu-scale", this.options.scale.toString());
	}

	// The stylesheet keys on these, never on `menubarclass` or `menuclass`. Those two say what to look for, which is a deck's business when another plugin already owns a name like `menu`. What to style is not, so it gets a name nobody can change.
	private markElements(): void {
		for (const menu of this.menus) {
			menu.classList.add(MENU_CLASS);
		}
		for (const bar of this.viewport.querySelectorAll(`.${this.options.menubarclass}`)) {
			bar.classList.add(BAR_CLASS);
		}
	}

	private setupEventListeners(): void {
		this.deck.on("ready", (event: unknown) => {
			debug.log("Ready event");
			getRevealUI(this.deck);

			const e = event as RevealSlideEvent;

			updateMenus(e.indexh, this.slideMap, this.options, this.menus, this.auto);

			this.viewport.addEventListener("click", (event) =>
				handleClick(event, this.deck, this.options, this.slideMap, this.auto, this.viewport)
			);

			this.viewport.classList.add("simplemenu-ready");
		});

		this.deck.on("slidechanged-h", (event: unknown) => {
			const e = event as RevealSlideEvent;
			updateMenus(e.indexh, this.slideMap, this.options, this.menus, this.auto);
		});

		this.deck.on("pdf-ready", () => {
			debug.log("PDF ready event");
			handlePdfMode(this.deck, this.slideMap, this.options, this.auto, this.themeColors);
		});
	}
}
