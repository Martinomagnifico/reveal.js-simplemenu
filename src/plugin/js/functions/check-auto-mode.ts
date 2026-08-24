export const isAutoMode = (menus: HTMLUListElement[]): boolean => {
	return menus.length === 0 || menus.every((menu) => !menu.querySelector(":scope > li"));
};
