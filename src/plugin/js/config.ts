// The plugin id, and the prefix on anything this plugin prints to the console.
export const PLUGIN_ID = "simplemenu";

export interface Config {
	activeclass: string;
	activeelement: "li" | "a";
	barhtml: {
		header: string;
		footer: string;
	};
	cssautoload: boolean;
	csspath: string;
	debug?: boolean;
	flat: boolean;
	menubarclass: string;
	menuclass: string;
	rtl?: boolean;
	scale: number;
	selectby: "id" | "data-name" | "name";
}

const defaultConfig: Config = {
	activeclass: "active",
	activeelement: "li",
	barhtml: {
		header: "<nav class='menubar'><ul class='menu'></ul></nav>",
		footer: "",
	},
	cssautoload: true,
	csspath: "",
	flat: false,
	menubarclass: "menubar",
	menuclass: "menu",
	scale: 0.67,
	selectby: "id",
};

export { defaultConfig };
