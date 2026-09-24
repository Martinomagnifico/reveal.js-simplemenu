import fs from "node:fs";
import { resolve } from "node:path";
import type { Plugin, ResolvedConfig } from "vite";

interface DynamicIndexOptions {
	/** Where the page sources are, relative to the project root. */
	views?: string;
	/** Stylesheet for the generated page, as a URL the dev server can serve. */
	stylesheet?: string;
}

/**
 * Serve the dev server's index page as a list of the decks in `views`, so a page
 * added there is linked without an index page having to be written and kept up to
 * date beside it.
 *
 * Dev only: the build has no index of its own, and each demo is linked from the
 * readme rather than from a page in the demo folder.
 */
export default function dynamicIndex(options: DynamicIndexOptions = {}): Plugin {
	const { views = "src/demo/views", stylesheet = "/src/demo/style/demo.scss" } = options;
	let root = process.cwd();

	return {
		name: "vite-plugin-dynamic-index",

		configResolved(config: ResolvedConfig) {
			root = config.root;
		},

		configureServer(server) {
			server.middlewares.use((req, res, next) => {
				const url = (req.url ?? "").split("?")[0];
				if (url !== "/" && url !== "/index.html") return next();

				const dir = resolve(root, views);
				let pages: string[] = [];
				try {
					pages = fs
						.readdirSync(dir)
						// A leading underscore marks a partial, which is not a page.
						.filter((file) => file.endsWith(".pug") && !file.startsWith("_"))
						.map((file) => file.replace(/\.pug$/, ""))
						.sort();
				} catch {
					// No views folder is not worth failing the request over.
				}

				const links = pages
					.map((name) => `<li><a href="/${name}.html">${name}</a></li>`)
					.join("\n\t\t\t");

				res.setHeader("Content-Type", "text/html");
				res.end(`<!DOCTYPE html>
<html lang="en" class="index">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Pages</title>
	<link rel="stylesheet" href="${stylesheet}">
</head>
<body>
	<ul class="fileindex">
			${links}
	</ul>
</body>
</html>
`);
			});
		},
	};
}
