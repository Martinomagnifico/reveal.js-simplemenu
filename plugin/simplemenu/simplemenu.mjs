 /*****************************************************************
 *
 * reveal.js-simplemenu for Reveal.js 
 * Version 2.1.1
 * 
 * @link
 * https://github.com/martinomagnifico/reveal.js-simplemenu
 * 
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/martinomagnifico
 *
 * @license 
 * MIT
 * 
 * Copyright (C) 2026 Martijn De Jongh (Martino)
 *
 ******************************************************************/


//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = /* @__PURE__ */ ((n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)))((/* @__PURE__ */ o(((e, t) => {
	var n = function(e) {
		return r(e) && !i(e);
	};
	function r(e) {
		return !!e && typeof e == "object";
	}
	function i(e) {
		var t = Object.prototype.toString.call(e);
		return t === "[object RegExp]" || t === "[object Date]" || o(e);
	}
	var a = typeof Symbol == "function" && Symbol.for ? Symbol.for("react.element") : 60103;
	function o(e) {
		return e.$$typeof === a;
	}
	function s(e) {
		return Array.isArray(e) ? [] : {};
	}
	function c(e, t) {
		return t.clone !== !1 && t.isMergeableObject(e) ? g(s(e), e, t) : e;
	}
	function l(e, t, n) {
		return e.concat(t).map(function(e) {
			return c(e, n);
		});
	}
	function u(e, t) {
		if (!t.customMerge) return g;
		var n = t.customMerge(e);
		return typeof n == "function" ? n : g;
	}
	function d(e) {
		return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
			return Object.propertyIsEnumerable.call(e, t);
		}) : [];
	}
	function f(e) {
		return Object.keys(e).concat(d(e));
	}
	function p(e, t) {
		try {
			return t in e;
		} catch {
			return !1;
		}
	}
	function m(e, t) {
		return p(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
	}
	function h(e, t, n) {
		var r = {};
		return n.isMergeableObject(e) && f(e).forEach(function(t) {
			r[t] = c(e[t], n);
		}), f(t).forEach(function(i) {
			m(e, i) || (r[i] = p(e, i) && n.isMergeableObject(t[i]) ? u(i, n)(e[i], t[i], n) : c(t[i], n));
		}), r;
	}
	function g(e, t, r) {
		r ||= {}, r.arrayMerge = r.arrayMerge || l, r.isMergeableObject = r.isMergeableObject || n, r.cloneUnlessOtherwiseSpecified = c;
		var i = Array.isArray(t);
		return i === Array.isArray(e) ? i ? r.arrayMerge(e, t, r) : h(e, t, r) : c(t, r);
	}
	g.all = function(e, t) {
		if (!Array.isArray(e)) throw Error("first argument should be an array");
		return e.reduce(function(e, n) {
			return g(e, n, t);
		}, {});
	}, t.exports = g;
})))(), 1), l = Object.defineProperty, u = (e, t) => {
	let n = {};
	for (var r in e) l(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || l(n, Symbol.toStringTag, { value: "Module" }), n;
}, d = [
	".js",
	".min.js",
	".mjs"
], f = (() => {
	let e = import.meta;
	if (typeof e?.url == "string" && e.url !== "") return e.url;
	let t = typeof document < "u" ? document.currentScript : null;
	return t && "src" in t && t.src ? t.src : "";
})(), p = (e) => {
	let t = e.lastIndexOf("/");
	return t === -1 ? "" : e.slice(0, t + 1);
}, m = (e) => {
	let t = e.split(/[?#]/)[0];
	return t.slice(t.lastIndexOf("/") + 1);
}, h = (e, t) => d.some((n) => e === `${t}${n}`), g = [
	/\/@fs\//,
	/\/@id\//,
	/\/\.vite\/deps\//,
	/[?&][vt]=/
], ee = (e) => g.some((t) => t.test(e)), _ = (e) => {
	if (typeof document < "u") {
		let t = d.map((t) => `script[src$="${e}${t}"]`).join(", "), n = document.querySelector(t)?.getAttribute("src");
		if (n) return { directory: p(n) };
	}
	return f && !ee(f) && h(m(f), e) ? { directory: p(f) } : { directory: null };
}, te = (e) => _(e).directory !== null, v = /* @__PURE__ */ new Map(), ne = (e = "") => {
	let t = v.get(e);
	if (t) return t;
	let n = typeof window < "u", r = typeof document < "u", i = import.meta, a = !1;
	try {
		a = typeof module < "u" && !!module?.hot;
	} catch {}
	let o = !1;
	try {
		o = !!i?.hot;
	} catch {}
	let s = a || o, c = !1;
	try {
		c = i?.env?.DEV === !0;
	} catch {}
	let l = e !== "" && te(e), u = {
		hasResolvableSource: l,
		hasWindow: n,
		hasDocument: r,
		isBundled: !l,
		isDevelopment: s || c,
		hasHMR: s,
		isViteDev: c
	};
	return v.set(e, u), u;
}, re = class {
	defaultConfig;
	pluginInit;
	pluginId;
	mergedConfig = null;
	userConfigData = null;
	data = {};
	constructor(e, t, n) {
		typeof e == "string" ? (this.pluginId = e, this.pluginInit = t, this.defaultConfig = n || {}) : (this.pluginId = e.id, this.pluginInit = e.init, this.defaultConfig = e.defaultConfig || {});
	}
	initializeConfig(e) {
		let t = this.defaultConfig, n = e.getConfig()[this.pluginId] || {};
		this.userConfigData = n, this.mergedConfig = (0, c.default)(t, n, {
			arrayMerge: (e, t) => t,
			clone: !0
		});
	}
	getCurrentConfig() {
		if (!this.mergedConfig) throw Error("Plugin configuration has not been initialized");
		return this.mergedConfig;
	}
	getData() {
		return Object.keys(this.data).length > 0 ? this.data : void 0;
	}
	get userConfig() {
		return this.userConfigData || {};
	}
	getEnvironmentInfo = () => ne(this.pluginId);
	init(e) {
		if (this.initializeConfig(e), this.pluginInit) return this.pluginInit(this, e, this.getCurrentConfig());
	}
	createInterface(e = {}) {
		return {
			id: this.pluginId,
			init: (e) => this.init(e),
			getConfig: () => this.getCurrentConfig(),
			getData: () => this.getData(),
			...e
		};
	}
}, y = "data-css-id", b = (e, t) => new Promise((n, r) => {
	let i = document.createElement("link");
	i.rel = "stylesheet", i.href = t, i.setAttribute(y, e);
	let a = setTimeout(() => {
		i.parentNode && i.parentNode.removeChild(i), r(/* @__PURE__ */ Error(`[${e}] Timeout loading CSS from: ${t}`));
	}, 5e3);
	i.onload = () => {
		clearTimeout(a), n();
	}, i.onerror = () => {
		clearTimeout(a), i.parentNode && i.parentNode.removeChild(i), r(/* @__PURE__ */ Error(`[${e}] Failed to load CSS from: ${t}`));
	}, document.head.appendChild(i);
}), ie = (e) => document.querySelectorAll(`[${y}="${e}"]`).length > 0, ae = 1e4, x = (e) => new Promise((t) => {
	if (S(e)) return t(!0);
	if (typeof MutationObserver > "u") return t(!1);
	let n = !1, r = (e) => {
		n || (n = !0, i.disconnect(), clearTimeout(o), window.removeEventListener("load", a), t(e));
	}, i = new MutationObserver(() => {
		S(e) && r(!0);
	});
	i.observe(document.documentElement, {
		childList: !0,
		subtree: !0,
		attributeFilter: ["href", "rel"]
	});
	let a = () => requestAnimationFrame(() => r(S(e)));
	document.readyState === "complete" ? a() : window.addEventListener("load", a, { once: !0 });
	let o = setTimeout(() => r(S(e)), ae);
}), S = (e) => {
	if (ie(e)) return !0;
	try {
		return window.getComputedStyle(document.documentElement).getPropertyValue(`--cssimported-${e}`).trim() !== "";
	} catch {
		return !1;
	}
}, C = ((e) => new Proxy(e, { get: (e, t) => {
	if (t in e) return e[t];
	let n = t.toString();
	if (typeof console[n] == "function") return (...t) => {
		e.debugLog(n, ...t);
	};
} }))(new class {
	debugMode = !1;
	label = "DEBUG";
	groupDepth = 0;
	initialize(e, t = "DEBUG") {
		this.debugMode = e, this.label = t;
	}
	group = (...e) => {
		this.debugLog("group", ...e), this.groupDepth++;
	};
	groupCollapsed = (...e) => {
		this.debugLog("groupCollapsed", ...e), this.groupDepth++;
	};
	groupEnd = () => {
		this.groupDepth > 0 && (this.groupDepth--, this.debugLog("groupEnd"));
	};
	error = (...e) => {
		let t = this.debugMode;
		this.debugMode = !0, this.formatAndLog(console.error, e), this.debugMode = t;
	};
	table = (e, t, n) => {
		if (this.debugMode) try {
			typeof e == "string" && t !== void 0 && typeof t != "string" ? (this.groupDepth === 0 ? console.log(`[${this.label}]: ${e}`) : console.log(e), n ? console.table(t, n) : console.table(t)) : (this.groupDepth === 0 && console.log(`[${this.label}]: Table data`), typeof t == "object" && Array.isArray(t) ? console.table(e, t) : console.table(e));
		} catch (t) {
			console.error(`[${this.label}]: Error showing table:`, t), console.log(`[${this.label}]: Raw data:`, e);
		}
	};
	formatAndLog = (e, t) => {
		if (this.debugMode) try {
			this.groupDepth > 0 ? e.call(console, ...t) : t.length > 0 && typeof t[0] == "string" ? e.call(console, `[${this.label}]: ${t[0]}`, ...t.slice(1)) : e.call(console, `[${this.label}]:`, ...t);
		} catch (e) {
			console.error(`[${this.label}]: Error in logging:`, e), console.log(`[${this.label}]: Original log data:`, ...t);
		}
	};
	debugLog(e, ...t) {
		let n = console[e];
		if (!this.debugMode && e !== "error" || typeof n != "function") return;
		let r = n;
		if (e === "group" || e === "groupCollapsed") {
			t.length > 0 && typeof t[0] == "string" ? r.call(console, `[${this.label}]: ${t[0]}`, ...t.slice(1)) : r.call(console, `[${this.label}]:`, ...t);
			return;
		}
		if (e === "groupEnd") {
			r.call(console);
			return;
		}
		if (e === "table") {
			t.length === 1 ? this.table(t[0]) : t.length === 2 ? (t[0], this.table(t[0], t[1])) : t.length >= 3 && this.table(t[0], t[1], t[2]);
			return;
		}
		this.groupDepth > 0 ? r.call(console, ...t) : t.length > 0 && typeof t[0] == "string" ? r.call(console, `[${this.label}]: ${t[0]}`, ...t.slice(1)) : r.call(console, `[${this.label}]:`, ...t);
	}
}()), w = /* @__PURE__ */ new Set(), T = (e, t) => {
	let n = `${e}::${t}`;
	w.has(n) || (w.add(n), console.warn(`[${e}] ${t}`));
}, oe = (e) => [`dist/plugin/${e}/${e}.css`, `plugin/${e}/${e}.css`], E = (e) => typeof e == "string" && e.trim() !== "", D = async (e, t) => {
	let { cssautoload: n, csspath: r, debug: i = !1 } = t;
	if (n === !1 || r === !1) return i && console.log(`[${e}] CSS loading is switched off`), { status: "skipped" };
	if (E(r)) {
		let t = r.trim(), n = S(e), a = n && !!document.querySelector(`[data-css-id="${e}"]`);
		try {
			return await b(e, t), i && console.log(`[${e}] CSS loaded from: ${t}`), n && T(e, `Loaded CSS from ${t}, but a stylesheet for this plugin was already on the page (${a ? "a tagged <link>" : "an import or inline <style>"}) — csspath adds one, it cannot remove one. Both are live and the cascade decides. Remove the other import or <link>, or drop csspath.`), {
				status: "loaded",
				path: t
			};
		} catch {
			return console.warn(`[${e}] Could not load CSS from: ${t}`), {
				status: "failed",
				path: t
			};
		}
	}
	if (S(e)) return i && console.log(`[${e}] CSS is already imported, skipping`), { status: "present" };
	let { directory: a } = _(e);
	if (a !== null || n === !0) {
		let t = [...a === null ? [] : [`${a}${e}.css`], ...oe(e)].filter((e, t, n) => n.indexOf(e) === t);
		for (let n of t) try {
			return await b(e, n), i && console.log(`[${e}] CSS loaded from: ${n}`), {
				status: "loaded",
				path: n
			};
		} catch {
			i && console.log(`[${e}] No CSS at: ${n}`);
		}
		return console.warn(`[${e}] Could not load CSS. Tried: ${t.join(", ")}. Import the stylesheet yourself, or set csspath to where it is.`), { status: "failed" };
	}
	return x(e).then((t) => {
		t || T(e, `CSS could not be autoloaded here, because the plugin is part of a bundle. Import it once in your own code: import 'reveal.js-${e}/${e}.css'`);
	}), { status: "advised" };
};
async function O(e, t) {
	if ("getEnvironmentInfo" in e && t) {
		let n = e, r = n.userConfig, i = "cssautoload" in r && r.cssautoload !== "auto" ? t.cssautoload : void 0;
		return D(n.pluginId, {
			...t,
			cssautoload: i
		});
	}
	let { id: n, cssautoload: r, csspath: i, debug: a } = e;
	return D(n, {
		cssautoload: r === "auto" ? void 0 : r,
		csspath: i,
		debug: a
	});
}
var k = /* @__PURE__ */ u({
	addDirectionEvents: () => N,
	addMoreDirectionEvents: () => se,
	addScrollModeEvents: () => P
}), A = Symbol.for("reveal.js-plugintoolkit.directionEvents"), j = Symbol.for("reveal.js-plugintoolkit.scrollModeEvents"), M = (e, t, n) => {
	Object.defineProperty(e, t, {
		value: n,
		configurable: !0,
		enumerable: !1,
		writable: !1
	});
}, N = (e) => {
	if (e[A]) return;
	let [t, n] = [0, 0];
	e.on("slidechanged", (r) => {
		let { indexh: i, indexv: a, previousSlide: o, currentSlide: s } = r;
		i !== t && e.dispatchEvent({
			type: "slidechanged-h",
			data: {
				previousSlide: o,
				currentSlide: s,
				indexh: i,
				indexv: a
			}
		}), a !== n && i === t && e.dispatchEvent({
			type: "slidechanged-v",
			data: {
				previousSlide: o,
				currentSlide: s,
				indexh: i,
				indexv: a
			}
		}), [t, n] = [i, a];
	}), M(e, A, !0);
}, se = N, P = (e) => {
	if (e[j]) return () => {};
	let t = e.getViewportElement();
	if (!t) return console.warn("[plugintoolkit]: Could not find viewport element"), () => {};
	let n = () => t.classList.contains("reveal-scroll"), r = n(), i = new MutationObserver(() => {
		let t = n();
		if (t !== r) {
			let n = e.getCurrentSlide(), { h: i, v: a } = e.getIndices();
			e.dispatchEvent({
				type: t ? "scrollmode-enter" : "scrollmode-exit",
				data: {
					currentSlide: n,
					previousSlide: null,
					indexh: i,
					indexv: a
				}
			}), r = t;
		}
	});
	i.observe(t, {
		attributes: !0,
		attributeFilter: ["class"]
	});
	let a = () => {
		i.disconnect(), delete e[j];
	};
	return M(e, j, a), a;
}, F = /* @__PURE__ */ u({ sanitizeText: () => I }), I = (e) => e.toLowerCase().replace(/\s+/g, "").replace(/[^\p{L}\p{N}-]/gu, ""), L = "simplemenu", R = "simplemenu-bar", z = "simplemenu-menu", B = (e, t) => `<nav class='${e}'><ul class='${t}'></ul></nav>`, V = {
	activeclass: "active",
	activeelement: "li",
	barhtml: {
		header: B("menubar", "menu"),
		footer: ""
	},
	cssautoload: !0,
	csspath: "",
	flat: !1,
	menubarclass: "menubar",
	menuclass: "menu",
	scale: .67,
	selectby: "id"
};
//#endregion
//#region src/plugin/js/functions/apply-ids.ts
function H(e, t) {
	let n = Array.from(e.getSlidesElement().children);
	for (let [e, r] of t) if (r.id) {
		let t = n[e];
		if (t instanceof HTMLElement) {
			let e = t.querySelector("section");
			e && !e.id ? (e.id = r.id, t.id && t.id === e.id && t.removeAttribute("id")) : !t.id && !t.querySelector("section") && (t.id = r.id);
		}
	}
}
//#endregion
//#region src/plugin/js/functions/check-auto-mode.ts
var U = (e) => e.length === 0 || e.every((e) => !e.querySelector(":scope > li")), W = (e, t, n, r) => {
	if (!n && r === "id") {
		let n = e instanceof HTMLAnchorElement ? e : e.querySelector("a");
		if (n?.href) {
			let e = n.href.split("#").pop() || "", r = e.startsWith("/") ? e.substring(1) : e;
			for (let [e, n] of t) if (n.id === r) return e;
		}
	} else {
		let n = e.textContent?.trim();
		if (n) {
			for (let [e, r] of t) if (r.name === n) return e;
		}
	}
	return null;
}, G = (e, t, n, r, i, a) => {
	let o = e.target.closest(n.activeelement);
	if (!o) return;
	let s = o.tagName === "A" ? o : o.querySelector("a");
	if (!s) return;
	let c = s.getAttribute("href");
	if (!c) return;
	let l = W(o, r, i, n.selectby);
	if (l === null) return;
	let u = r.get(l);
	if (!u) return;
	e.preventDefault();
	let d = t.getIndices();
	if (d.h === l && d.v === 0) return;
	let f = a.classList.contains("reveal-scroll"), p = c.includes("#/");
	f ? a.querySelector(`section[data-index-h="${l}"]`)?.scrollIntoView({
		behavior: "instant",
		block: "start"
	}) : p && n.selectby === "id" ? (C.log(`Using internal Reveal ID to go to: ${u.id}`), t.slide(l, 0)) : (C.log(`Using matched slide to go to: ${l} (${u.name})`), t.slide(l, 0));
}, K = (e, t) => {
	let n = t.classList;
	t.parentNode?.replaceChild(e, t), e.className = n.value;
}, ce = (e) => {
	for (let t of ["controls", "slide-number"]) {
		let n = e.getViewportElement().querySelector(`.reveal > .${t}`), r = e.getViewportElement().querySelector(`.reveal > * .${t}`);
		n && r && K(n, r);
	}
};
//#endregion
//#region src/plugin/js/functions/last-item-fix.ts
function le(e, t) {
	new MutationObserver((n) => {
		for (let r of n) if (r.type === "attributes" && r.attributeName === "class" && t.classList.contains("reveal-scroll")) {
			let t = e.getSlidesElement();
			if (!t.querySelector(".virtual-anchor")) {
				let e = document.createElement("div");
				e.className = "virtual-anchor", e.style.height = "1px", e.style.visibility = "hidden", t.appendChild(e);
			}
		}
	}).observe(t, { attributes: !0 });
}
//#endregion
//#region src/plugin/js/functions/map-builder.ts
var q = "A section is using the name attribute for its menu item. Use data-name instead: name still works, but it is no longer documented and support for it can go in a future version.", J = (e) => {
	let t = e.getAttribute("name");
	return t && T(L, q), t;
}, Y = (e) => {
	let t = e.getAttribute("data-name");
	if (t) return t;
	let n = J(e);
	if (n) return n;
	let r = e.querySelector("section");
	return r && (r.getAttribute("data-stack-name") || r.getAttribute("data-name") || J(r)) || null;
}, ue = (e, t) => {
	let n = /[?&](print-pdf|view=print)\b/i.test(window.location.search), r = /* @__PURE__ */ new Map(), i = e.getRevealElement().querySelector(".slides")?.children || [], a = 0, o = e.getPlugin("internation") && e.getConfig().internation?.langattribute || "data-i18n";
	for (let e of i) {
		if (!(e instanceof HTMLElement) || e.tagName !== "SECTION" || e.getAttribute("data-visibility") === "hidden") continue;
		let i = {
			index: a,
			name: null
		};
		if (t.flat && (e.querySelector("section") && C.warn("Vertical slides detected while using flat mode. This may cause unexpected behavior."), e.getAttribute("data-sm") === "false" && (i.stopInheritance = !0)), e.id) i.id = e.id;
		else {
			let t = e.firstElementChild;
			t instanceof HTMLElement && t.tagName === "SECTION" && t.id && (i.id = t.id);
		}
		i.name = Y(e), i.name && !e.dataset.name && e.querySelector(":scope > section") && (e.dataset.name = i.name);
		let s = e.getAttribute(o) || e.querySelector("section")?.getAttribute(o);
		s && (i.langattr = s), e.getAttribute("data-sm") === "false" && (i.name = null, i.id = void 0);
		let c = e.getAttribute("data-state");
		if (c && (i.state = c), !n && e.querySelectorAll("section").length > 0) {
			let t = e.querySelectorAll(":scope > section");
			for (let e of t) if (e instanceof HTMLElement && e.getAttribute("data-visibility") !== "hidden" && !e.id) {
				let t = Y(e);
				t && (e.id = F.sanitizeText(t));
			}
		}
		if (n && e.querySelectorAll("section").length > 0) {
			let t = Y(e), n = e.getAttribute(o) || e.querySelector("section")?.getAttribute(o) || null, s = e.querySelectorAll(":scope > section"), c = 0;
			for (let e of s) if (e instanceof HTMLElement && e.getAttribute("data-visibility") !== "hidden") {
				let o = {
					index: a,
					name: t,
					id: e.id || i.id,
					isVertical: !0,
					verticalIndex: c++,
					langattr: n
				}, s = e.getAttribute("data-state");
				s && (o.state = s), r.set(a, o), a++;
			}
		} else r.set(a, i), a++;
	}
	return t.flat ? de(r) : r;
}, de = (e) => {
	let t = null, n = Array.from(e.keys()).sort((e, t) => e - t);
	for (let r of n) {
		let n = e.get(r);
		n && (n.stopInheritance ? t = null : n.name && (t = n.name), n.name = t, e.set(r, n));
	}
	return e;
}, X = (e, t, n, r) => {
	let i = e.querySelectorAll(n.activeelement);
	for (let e of i) e.classList.remove(n.activeclass);
	for (let e of i) {
		let i = !1;
		if (!r && n.selectby === "id") {
			let r = n.activeelement === "a" ? e : e.querySelector("a");
			if (r?.href) {
				let e = r.href.split("#").pop() || "";
				i = (e.startsWith("/") ? e.substring(1) : e) === t.id;
			}
		} else {
			let r = (n.activeelement === "a" ? e : e.querySelector("a"))?.getAttribute("data-sm");
			i = t.name !== null && r !== null && r === t.name;
		}
		i && e.classList.add(n.activeclass);
	}
}, fe = (e, t) => {
	for (let n of t) {
		let t = n.cloneNode(!0);
		t instanceof HTMLElement && (t.classList.contains("bottom") ? e.insertAdjacentElement("beforeend", t) : e.insertAdjacentElement("afterbegin", t), n.parentNode && n.parentNode.removeChild(n));
	}
}, pe = (e, t) => {
	if (t?.state) {
		let n = t.state.split(" ").filter(Boolean);
		for (let t of n) e.classList.add(t);
	}
}, me = (e, t, n, r) => {
	let i = e.getSlidesElement().querySelectorAll(".pdf-page"), a = Array.from(e.getViewportElement().querySelectorAll(`.${R}`));
	Array.from(i).forEach((e, i) => {
		fe(e, a);
		let o = e.querySelector(".slide-number-pdf"), s = e.querySelector(".slide-number-a");
		o && s && K(o, s);
		let c = t.get(i);
		if (!c) return;
		pe(e, c);
		let l = e.querySelectorAll(`.${n.menuclass}`);
		for (let e of l) X(e, c, n, r);
	});
}, he = (e, t, n) => {
	let r = e.getRevealElement(), i = e.getViewportElement(), a = e.getConfig().internation?.langattribute || "data-i18n", o = (e) => !e.closest(".slides"), s = Array.from(i.querySelectorAll(`.${n.menubarclass}`)).some(o) || Array.from(i.querySelectorAll(`.${n.menuclass}`)).some(o);
	if (n.barhtml.header && !s) {
		let e = document.createElement("div");
		e.innerHTML = n.barhtml.header.trim();
		let t = e.firstElementChild;
		t && (t.id ||= "simplemenu-headerbar", r.insertAdjacentElement("afterbegin", t));
	}
	if (n.barhtml.footer) {
		let e = document.createElement("div");
		e.innerHTML = n.barhtml.footer.trim();
		let t = e.firstElementChild;
		t && (t.classList.add("bottom"), t.id ||= "simplemenu-footerbar", r.appendChild(t));
	}
	let c = i.querySelectorAll(`.${n.menuclass}`);
	for (let e of c) e.querySelector(":scope > li") || ge(e, t, n, a);
}, ge = (e, t, n, r) => {
	let i = [], a = /* @__PURE__ */ new Set();
	for (let [e, n] of t) if (n.name && !a.has(n.name)) {
		let e = document.createElement("li"), t = document.createElement("a");
		n.id ||= F.sanitizeText(n.name), n.langattr && t.setAttribute(r, n.langattr), t.href = `#/${n.id}`, t.textContent = n.name, t.setAttribute("data-sm", n.name), e.appendChild(t), i.push(e), a.add(n.name);
	}
	n.rtl && e.closest(`.${n.menubarclass}`) && i.reverse();
	for (let t of i) e.appendChild(t);
}, Z = [], Q = (e, t, n, r, i = !1) => {
	let a = t.get(e);
	if (!a) return;
	let o = r.filter((e) => !e.closest("section"));
	for (let e of o) X(e, a, n, i);
}, $ = (e, t, n) => {
	let r = t.get(e);
	if (r) {
		for (let e of Z) n.classList.remove(e);
		Z = r.state?.split(" ").filter(Boolean) || [];
		for (let e of Z) n.classList.add(e);
	}
}, _e = class e {
	deck;
	viewport;
	options;
	slideMap;
	auto;
	menus;
	constructor(e, t) {
		if (this.deck = e, this.options = t, this.viewport = e.getViewportElement(), this.slideMap = ue(e, t), this.menus = Array.from(this.viewport.querySelectorAll(`.${t.menuclass}`)).filter((e) => e instanceof HTMLUListElement), this.auto = U(this.menus), !this.auto) for (let e of this.menus) {
			let t = e.querySelectorAll(this.options.activeelement);
			for (let e of t) {
				let t = e instanceof HTMLAnchorElement ? e : e.querySelector("a");
				t && !t.hasAttribute("data-sm") && t.setAttribute("data-sm", t.textContent?.trim() || "");
			}
		}
		C.log(`Mode: ${this.auto ? "auto" : "manual"}, flat navigation: ${this.options.flat}`), C.log("Map of all slides:"), C.dir([...this.slideMap], { depth: null });
	}
	static async create(t, n) {
		C.group();
		let r = new e(t, n);
		return await r.prepareSlides(), C.groupEnd(), r.setupEventListeners(), r;
	}
	async prepareSlides() {
		this.auto && (he(this.deck, this.slideMap, this.options), this.menus = Array.from(this.viewport.querySelectorAll(`.${this.options.menuclass}`))), k.addDirectionEvents(this.deck), H(this.deck, this.slideMap), le(this.deck, this.viewport), this.markElements(), this.viewport.style.setProperty("--simplemenu-scale", this.options.scale.toString());
	}
	markElements() {
		for (let e of this.menus) e.classList.add(z);
		for (let e of this.viewport.querySelectorAll(`.${this.options.menubarclass}`)) e.classList.add(R);
	}
	setupEventListeners() {
		this.deck.on("ready", (e) => {
			C.log("Ready event"), ce(this.deck);
			let t = e;
			Q(t.indexh, this.slideMap, this.options, this.menus, this.auto), $(t.indexh, this.slideMap, this.viewport), this.viewport.addEventListener("click", (e) => G(e, this.deck, this.options, this.slideMap, this.auto, this.viewport)), this.viewport.classList.add("simplemenu-ready");
		}), this.deck.on("slidechanged-h", (e) => {
			let t = e;
			Q(t.indexh, this.slideMap, this.options, this.menus, this.auto), $(t.indexh, this.slideMap, this.viewport);
		}), this.deck.on("slidechanged-v", (e) => {
			$(e.indexh, this.slideMap, this.viewport);
		}), this.deck.on("pdf-ready", () => {
			C.log("PDF ready event"), me(this.deck, this.slideMap, this.options, this.auto);
		});
	}
}, ve = async (e, t, n) => {
	let r = t;
	e.userConfig.rtl === void 0 && (n.rtl = r.getConfig().rtl), n.barhtml = e.userConfig.barhtml === void 0 ? {
		...n.barhtml,
		header: B(n.menubarclass, n.menuclass)
	} : e.userConfig.barhtml, n.selectby === "name" && T(L, "selectby: \"name\" is no longer documented. Use data-name on your sections and selectby: \"data-name\" instead."), C && (n.debug || r.getConfig().debug) && (C.initialize(!0, L), C.log("Simplemenu debugging enabled."));
	let i = document.querySelector("meta[name=generator]");
	i instanceof HTMLMetaElement && i.content.includes("quarto") || await O(e, n), await _e.create(r, n);
}, ye = () => new re(L, ve, V).createInterface();
//#endregion
export { ye as default };
