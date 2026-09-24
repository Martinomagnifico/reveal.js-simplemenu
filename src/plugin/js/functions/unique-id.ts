/**
 * An id that nothing on the page has yet: the one asked for, or the same with
 * `-2`, `-3` and so on after it.
 *
 * The page is what gets checked, not the deck, so two decks with the same chapter
 * names do not hand out the same id, and a deck on its own keeps the plain id
 * whenever nothing else has it.
 */
export const uniqueId = (base: string): string => {
	if (!document.getElementById(base)) return base;
	let n = 2;
	while (document.getElementById(`${base}-${n}`)) n++;
	return `${base}-${n}`;
};
