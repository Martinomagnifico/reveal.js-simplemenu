// Basic imports

// Helper imports
import {
	pluginDebug as debug,
	PluginBase,
	pluginCSS,
	type RevealInstance,
	warnOnce,
} from "reveal.js-plugintoolkit";
import type { Config } from "./config";
import { defaultBarHeader, defaultConfig, PLUGIN_ID } from "./config";
// Function imports
import { SimpleMenu } from "./core";
import type { Deck } from "./types";

const init = async (
	plugin: PluginBase<Config>,
	revealDeck: RevealInstance,
	config: Config
): Promise<void> => {
	// Simplemenu types the deck more narrowly than the toolkit does.
	const deck = revealDeck as unknown as Deck;

	// Reveal's own rtl is the default; an explicit simplemenu.rtl still wins.
	if (plugin.userConfig.rtl === undefined) {
		config.rtl = deck.getConfig().rtl;
	}

	// Barhtml is replaced wholesale rather than merged, so that an empty header or footer in user config can erase the default instead of falling back to it.
	if (plugin.userConfig.barhtml !== undefined) {
		config.barhtml = plugin.userConfig.barhtml;
	} else {
		// The default bar is rebuilt here rather than held as a literal, because the class names it uses are themselves options. A deck that renames `menuclass` to dodge a collision would otherwise get a generated menu under the old name, and Simplemenu would look for the new one and find nothing.
		config.barhtml = {
			...config.barhtml,
			header: defaultBarHeader(config.menubarclass, config.menuclass),
		};
	}

	// Still honoured, no longer documented or demoed. Matching happens on the same map either way, so a deck that switches to data-name keeps its menu.
	if (config.selectby === "name") {
		warnOnce(
			PLUGIN_ID,
			'selectby: "name" is no longer documented. Use data-name on your sections and selectby: "data-name" instead.'
		);
	}

	if (debug && (config.debug || deck.getConfig().debug)) {
		debug.initialize(true, PLUGIN_ID);
		debug.log("Simplemenu debugging enabled.");
	}

	// Quarto ships its own copy of the plugin CSS, so autoloading it there would only duplicate what is already on the page.
	const generatorMetaTag = document.querySelector("meta[name=generator]");
	const isQuartoContent =
		generatorMetaTag instanceof HTMLMetaElement && generatorMetaTag.content.includes("quarto");

	if (!isQuartoContent) {
		await pluginCSS(plugin, config);
	}

	await SimpleMenu.create(deck, config);
};

export default () => {
	const plugin = new PluginBase(PLUGIN_ID, init, defaultConfig);
	return plugin.createInterface();
};
