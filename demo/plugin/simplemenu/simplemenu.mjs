 /*****************************************************************
 *
 * reveal.js-simplemenu for Reveal.js 
 * Version 2.1.0
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
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = "simplemenu", u = {
	activeclass: "active",
	activeelement: "li",
	barhtml: {
		header: "<nav class='menubar'><ul class='menu'></ul></nav>",
		footer: ""
	},
	cssautoload: !0,
	csspath: "",
	flat: !1,
	menubarclass: "menubar",
	menuclass: "menu",
	scale: .67,
	selectby: "id"
}, d = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t) => {
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
})))(), 1), f = Object.defineProperty, p = (e, t) => {
	let n = {};
	for (var r in e) f(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || f(n, Symbol.toStringTag, { value: "Module" }), n;
}, m = [
	".js",
	".min.js",
	".mjs"
], h = (() => {
	let e = import.meta;
	if (typeof e?.url == "string" && e.url !== "") return e.url;
	let t = typeof document < "u" ? document.currentScript : null;
	return t && "src" in t && t.src ? t.src : "";
})(), g = (e) => {
	let t = e.lastIndexOf("/");
	return t === -1 ? "" : e.slice(0, t + 1);
}, _ = (e) => {
	let t = e.split(/[?#]/)[0];
	return t.slice(t.lastIndexOf("/") + 1);
}, v = (e, t) => m.some((n) => e === `${t}${n}`), y = [
	/\/@fs\//,
	/\/@id\//,
	/\/\.vite\/deps\//,
	/[?&][vt]=/
], b = (e) => y.some((t) => t.test(e)), x = (e) => {
	if (typeof document < "u") {
		let t = m.map((t) => `script[src$="${e}${t}"]`).join(", "), n = document.querySelector(t)?.getAttribute("src");
		if (n) return { directory: g(n) };
	}
	return h && !b(h) && v(_(h), e) ? { directory: g(h) } : { directory: null };
}, S = (e) => x(e).directory !== null, C = /* @__PURE__ */ new Map(), ee = (e = "") => {
	let t = C.get(e);
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
	let l = e !== "" && S(e), u = {
		hasResolvableSource: l,
		hasWindow: n,
		hasDocument: r,
		isBundled: !l,
		isDevelopment: s || c,
		hasHMR: s,
		isViteDev: c
	};
	return C.set(e, u), u;
}, w = class {
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
		this.userConfigData = n, this.mergedConfig = (0, d.default)(t, n, {
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
	getEnvironmentInfo = () => ee(this.pluginId);
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
}, T = "data-css-id", E = (e, t) => new Promise((n, r) => {
	let i = document.createElement("link");
	i.rel = "stylesheet", i.href = t, i.setAttribute(T, e);
	let a = setTimeout(() => {
		i.parentNode && i.parentNode.removeChild(i), r(/* @__PURE__ */ Error(`[${e}] Timeout loading CSS from: ${t}`));
	}, 5e3);
	i.onload = () => {
		clearTimeout(a), n();
	}, i.onerror = () => {
		clearTimeout(a), i.parentNode && i.parentNode.removeChild(i), r(/* @__PURE__ */ Error(`[${e}] Failed to load CSS from: ${t}`));
	}, document.head.appendChild(i);
}), D = (e) => document.querySelectorAll(`[${T}="${e}"]`).length > 0, te = 1e4, O = (e) => new Promise((t) => {
	if (k(e)) return t(!0);
	if (typeof MutationObserver > "u") return t(!1);
	let n = !1, r = (e) => {
		n || (n = !0, i.disconnect(), clearTimeout(o), window.removeEventListener("load", a), t(e));
	}, i = new MutationObserver(() => {
		k(e) && r(!0);
	});
	i.observe(document.documentElement, {
		childList: !0,
		subtree: !0,
		attributeFilter: ["href", "rel"]
	});
	let a = () => requestAnimationFrame(() => r(k(e)));
	document.readyState === "complete" ? a() : window.addEventListener("load", a, { once: !0 });
	let o = setTimeout(() => r(k(e)), te);
}), k = (e) => {
	if (D(e)) return !0;
	try {
		return window.getComputedStyle(document.documentElement).getPropertyValue(`--cssimported-${e}`).trim() !== "";
	} catch {
		return !1;
	}
}, A = ((e) => new Proxy(e, { get: (e, t) => {
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
}()), j = /* @__PURE__ */ new Set(), M = (e, t) => {
	let n = `${e}::${t}`;
	j.has(n) || (j.add(n), console.warn(`[${e}] ${t}`));
}, N = (e) => [`dist/plugin/${e}/${e}.css`, `plugin/${e}/${e}.css`], P = (e) => typeof e == "string" && e.trim() !== "", F = async (e, t) => {
	let { cssautoload: n, csspath: r, debug: i = !1 } = t;
	if (n === !1 || r === !1) return i && console.log(`[${e}] CSS loading is switched off`), { status: "skipped" };
	if (P(r)) {
		let t = r.trim();
		try {
			return await E(e, t), i && console.log(`[${e}] CSS loaded from: ${t}`), {
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
	if (k(e)) return i && console.log(`[${e}] CSS is already imported, skipping`), { status: "present" };
	let { directory: a } = x(e);
	if (a !== null || n === !0) {
		let t = [...a === null ? [] : [`${a}${e}.css`], ...N(e)].filter((e, t, n) => n.indexOf(e) === t);
		for (let n of t) try {
			return await E(e, n), i && console.log(`[${e}] CSS loaded from: ${n}`), {
				status: "loaded",
				path: n
			};
		} catch {
			i && console.log(`[${e}] No CSS at: ${n}`);
		}
		return console.warn(`[${e}] Could not load CSS. Tried: ${t.join(", ")}. Import the stylesheet yourself, or set csspath to where it is.`), { status: "failed" };
	}
	return O(e).then((t) => {
		t || M(e, `CSS could not be autoloaded here, because the plugin is part of a bundle. Import it once in your own code: import 'reveal.js-${e}/${e}.css'`);
	}), { status: "advised" };
};
async function ne(e, t) {
	if ("getEnvironmentInfo" in e && t) {
		let n = e, r = n.userConfig, i = "cssautoload" in r && r.cssautoload !== "auto" ? t.cssautoload : void 0;
		return F(n.pluginId, {
			...t,
			cssautoload: i
		});
	}
	let { id: n, cssautoload: r, csspath: i, debug: a } = e;
	return F(n, {
		cssautoload: r === "auto" ? void 0 : r,
		csspath: i,
		debug: a
	});
}
var re = /* @__PURE__ */ p({
	addDirectionEvents: () => z,
	addMoreDirectionEvents: () => B,
	addScrollModeEvents: () => V
}), I = Symbol.for("reveal.js-plugintoolkit.directionEvents"), L = Symbol.for("reveal.js-plugintoolkit.scrollModeEvents"), R = (e, t, n) => {
	Object.defineProperty(e, t, {
		value: n,
		configurable: !0,
		enumerable: !1,
		writable: !1
	});
}, z = (e) => {
	if (e[I]) return;
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
	}), R(e, I, !0);
}, B = z, V = (e) => {
	if (e[L]) return () => {};
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
		i.disconnect(), delete e[L];
	};
	return R(e, L, a), a;
}, H = /* @__PURE__ */ p({ sanitizeText: () => U }), U = (e) => e.toLowerCase().replace(/\s+/g, "").replace(/[^\p{L}\p{N}-]/gu, ""), W = (e, t, n, r) => {
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
}, G = [], K = (e, t, n, r, i = !1) => {
	let a = t.get(e);
	if (!a) return;
	let o = r.filter((e) => !e.closest("section"));
	for (let e of o) W(e, a, n, i);
}, q = (e, t, n) => {
	let r = t.get(e);
	if (r) {
		for (let e of G) n.classList.remove(e);
		G = r.state?.split(" ").filter(Boolean) || [];
		for (let e of G) n.classList.add(e);
	}
}, J = (e, t, n, r) => {
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
}, Y = (e, t, n, r, i, a) => {
	let o = e.target.closest(n.activeelement);
	if (!o) return;
	let s = o.tagName === "A" ? o : o.querySelector("a");
	if (!s) return;
	let c = s.getAttribute("href");
	if (!c) return;
	let l = J(o, r, i, n.selectby);
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
	}) : p && n.selectby === "id" ? (A.log(`Using internal Reveal ID to go to: ${u.id}`), t.slide(l, 0)) : (A.log(`Using matched slide to go to: ${l} (${u.name})`), t.slide(l, 0));
}, X = (e, t, n) => {
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
	for (let e of c) e.querySelector(":scope > li") || ie(e, t, n, a);
}, ie = (e, t, n, r) => {
	let i = [], a = /* @__PURE__ */ new Set();
	for (let [e, n] of t) if (n.name && !a.has(n.name)) {
		let e = document.createElement("li"), t = document.createElement("a");
		n.id ||= H.sanitizeText(n.name), n.langattr && t.setAttribute(r, n.langattr), t.href = `#/${n.id}`, t.textContent = n.name, t.setAttribute("data-sm", n.name), e.appendChild(t), i.push(e), a.add(n.name);
	}
	n.rtl && e.closest(".menubar") && i.reverse();
	for (let t of i) e.appendChild(t);
}, Z = (e, t) => {
	let n = t.classList;
	t.parentNode?.replaceChild(e, t), e.className = n.value;
}, ae = (e) => {
	for (let t of ["controls", "slide-number"]) {
		let n = e.getViewportElement().querySelector(`.reveal > .${t}`), r = e.getViewportElement().querySelector(`.reveal > * .${t}`);
		n && r && Z(n, r);
	}
}, oe = (e, t) => {
	for (let n of t) {
		let t = n.cloneNode(!0);
		t instanceof HTMLElement && (t.classList.contains("bottom") ? e.insertAdjacentElement("beforeend", t) : e.insertAdjacentElement("afterbegin", t), n.parentNode && n.parentNode.removeChild(n));
	}
}, se = (e, t) => {
	if (t?.state) {
		let n = t.state.split(" ").filter(Boolean);
		for (let t of n) e.classList.add(t);
	}
}, ce = (e, t, n, r) => {
	let i = e.getSlidesElement().querySelectorAll(".pdf-page"), a = Array.from(e.getViewportElement().querySelectorAll(".menubar"));
	Array.from(i).forEach((e, i) => {
		oe(e, a);
		let o = e.querySelector(".slide-number-pdf"), s = e.querySelector(".slide-number-a");
		o && s && Z(o, s);
		let c = t.get(i);
		if (!c) return;
		se(e, c);
		let l = e.querySelectorAll(`.${n.menuclass}`);
		for (let e of l) W(e, c, n, r);
	});
};
//#endregion
//#region src/plugin/js/functions/apply-ids.ts
function le(e, t) {
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
//#region src/plugin/js/functions/last-item-fix.ts
function ue(e, t) {
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
//#region src/plugin/js/functions/check-auto-mode.ts
var de = (e) => e.length === 0 || e.every((e) => !e.querySelector(":scope > li")), fe = "A section is using the name attribute for its menu item. Use data-name instead: name still works, but it is no longer documented and support for it can go in a future version.", Q = (e) => {
	let t = e.getAttribute("name");
	return t && M(l, fe), t;
}, $ = (e) => {
	let t = e.getAttribute("data-name");
	if (t) return t;
	let n = Q(e);
	if (n) return n;
	let r = e.querySelector("section");
	return r && (r.getAttribute("data-stack-name") || r.getAttribute("data-name") || Q(r)) || null;
}, pe = (e, t) => {
	let n = /[?&](print-pdf|view=print)\b/i.test(window.location.search), r = /* @__PURE__ */ new Map(), i = e.getRevealElement().querySelector(".slides")?.children || [], a = 0, o = e.getPlugin("internation") && e.getConfig().internation?.langattribute || "data-i18n";
	for (let e of i) {
		if (!(e instanceof HTMLElement) || e.tagName !== "SECTION" || e.getAttribute("data-visibility") === "hidden") continue;
		let i = {
			index: a,
			name: null
		};
		if (t.flat && (e.querySelector("section") && A.warn("Vertical slides detected while using flat mode. This may cause unexpected behavior."), e.getAttribute("data-sm") === "false" && (i.stopInheritance = !0)), e.id) i.id = e.id;
		else {
			let t = e.firstElementChild;
			t instanceof HTMLElement && t.tagName === "SECTION" && t.id && (i.id = t.id);
		}
		i.name = $(e);
		let s = e.getAttribute(o) || e.querySelector("section")?.getAttribute(o);
		s && (i.langattr = s), e.getAttribute("data-sm") === "false" && (i.name = null, i.id = void 0);
		let c = e.getAttribute("data-state");
		if (c && (i.state = c), !n && e.querySelectorAll("section").length > 0) {
			let t = e.querySelectorAll(":scope > section");
			for (let e of t) if (e instanceof HTMLElement && e.getAttribute("data-visibility") !== "hidden" && !e.id) {
				let t = $(e);
				t && (e.id = H.sanitizeText(t));
			}
		}
		if (n && e.querySelectorAll("section").length > 0) {
			let t = $(e), n = e.getAttribute(o) || e.querySelector("section")?.getAttribute(o) || null, s = e.querySelectorAll(":scope > section"), c = 0;
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
	return t.flat ? me(r) : r;
}, me = (e) => {
	let t = null, n = Array.from(e.keys()).sort((e, t) => e - t);
	for (let r of n) {
		let n = e.get(r);
		n && (n.stopInheritance ? t = null : n.name && (t = n.name), n.name = t, e.set(r, n));
	}
	return e;
}, he = class e {
	deck;
	viewport;
	options;
	slideMap;
	auto;
	menus;
	constructor(e, t) {
		if (this.deck = e, this.options = t, this.viewport = e.getViewportElement(), this.slideMap = pe(e, t), this.menus = Array.from(this.viewport.querySelectorAll(`.${t.menuclass}`)).filter((e) => e instanceof HTMLUListElement), this.auto = de(this.menus), !this.auto) for (let e of this.menus) {
			let t = e.querySelectorAll(this.options.activeelement);
			for (let e of t) {
				let t = e instanceof HTMLAnchorElement ? e : e.querySelector("a");
				t && !t.hasAttribute("data-sm") && t.setAttribute("data-sm", t.textContent?.trim() || "");
			}
		}
		this.options.debug && (console.log(`Mode: ${this.auto ? "auto" : "manual"}, flat navigation: ${this.options.flat}`), console.log("Map of all slides:"), console.dir([...this.slideMap], { depth: null }));
	}
	static async create(t, n) {
		A.group();
		let r = new e(t, n);
		return await r.prepareSlides(), A.groupEnd(), r.setupEventListeners(), r;
	}
	async prepareSlides() {
		this.auto && (X(this.deck, this.slideMap, this.options), this.menus = Array.from(this.viewport.querySelectorAll(`.${this.options.menuclass}`))), re.addDirectionEvents(this.deck), le(this.deck, this.slideMap), ue(this.deck, this.viewport), this.viewport.style.setProperty("--simplemenu-scale", this.options.scale.toString());
	}
	setupEventListeners() {
		this.deck.on("ready", (e) => {
			A.log("Ready event"), ae(this.deck);
			let t = e;
			K(t.indexh, this.slideMap, this.options, this.menus, this.auto), q(t.indexh, this.slideMap, this.viewport), this.viewport.addEventListener("click", (e) => Y(e, this.deck, this.options, this.slideMap, this.auto, this.viewport)), this.viewport.classList.add("simplemenu-ready");
		}), this.deck.on("slidechanged-h", (e) => {
			let t = e;
			K(t.indexh, this.slideMap, this.options, this.menus, this.auto), q(t.indexh, this.slideMap, this.viewport);
		}), this.deck.on("slidechanged-v", (e) => {
			q(e.indexh, this.slideMap, this.viewport);
		}), this.deck.on("pdf-ready", () => {
			A.log("PDF ready event"), ce(this.deck, this.slideMap, this.options, this.auto);
		});
	}
}, ge = async (e, t, n) => {
	let r = t;
	e.userConfig.rtl === void 0 && (n.rtl = r.getConfig().rtl), e.userConfig.barhtml !== void 0 && (n.barhtml = e.userConfig.barhtml), n.selectby === "name" && M(l, "selectby: \"name\" is no longer documented. Use data-name on your sections and selectby: \"data-name\" instead."), A && (n.debug || r.getConfig().debug) && (A.initialize(!0, l), A.log("Simplemenu debugging enabled."));
	let i = document.querySelector("meta[name=generator]");
	i instanceof HTMLMetaElement && i.content.includes("quarto") || await ne(e, n), await he.create(r, n);
}, _e = () => new w(l, ge, u).createInterface();
//#endregion
export { _e as default };
