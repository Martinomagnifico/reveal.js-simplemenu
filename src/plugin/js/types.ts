import type { Config } from "./config";

export interface SlideMapItem {
	index: number;
	id?: string;
	name: string | null;
	stopInheritance?: boolean;
	state?: string;
	isVertical?: boolean;
	parentIndex?: number;
	verticalIndex?: number;
	langattr?: string | null;
}

interface DirectionalEventData {
	previousSlide: HTMLElement;
	currentSlide: HTMLElement;
	indexh: number;
	indexv: number;
}

export interface RevealSlideEvent {
	type: string;
	currentSlide: HTMLElement;
	previousSlide: HTMLElement;
	indexh: number;
	indexv: number;
	bubbles: boolean;
	cancelable: true;
	target: HTMLElement;
	currentTarget: null;
	defaultPrevented: boolean;
	eventPhase: number;
}

declare namespace Reveal {
	export interface Deck {
		getConfig(): {
			simplemenu?: Config;
			internation?: { langattribute?: string };
			rtl?: boolean;
			debug?: boolean;
		};
		getPlugin(name: string): string;
		getRevealElement(): HTMLElement;
		getViewportElement(): HTMLElement;
		getSlidesElement(): HTMLElement;
		getCurrentSlide(): HTMLElement;
		getIndices(slide?: HTMLElement): { h: number; v: number; f?: number };
		slide(indexh: number, indexv?: number, indexf?: number): void;
		on(eventName: string, callback: (event: unknown) => void): void;
		dispatchEvent(event: { type: string; data: DirectionalEventData }): void;
	}
}

export type Deck = Reveal.Deck;
