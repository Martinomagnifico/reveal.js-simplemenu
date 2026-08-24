// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import vituum from "vituum";
import pug from "@vituum/vite-plugin-pug";
import pkg from "./package.json" with { type: "json" };
import pluginConfig from './plugin.config.js'
import suppressWarnings from './vite-plugins/vite-plugin-suppress-warnings.ts';

export default defineConfig({
    publicDir: "src/demo/public",
    build: {
        outDir: "demo",
        emptyOutDir: false,
        rollupOptions: {
            checks: {
                emptyImportMeta: false,
            },
            // Every page in views/, not just demo*.pug — index.pug is a page too and was being skipped.
            input: [
                resolve(import.meta.dirname, "src/demo/views/*.pug"),
                resolve(import.meta.dirname, "src/demo/style/*.scss"),
            ],
            external: [/^\/node_modules\/reveal\.js\/.*/],
            output: {
                assetFileNames: (assetInfo) => {
                    const assetName = assetInfo.names ? assetInfo.names[0] : assetInfo.name;
                    if (assetName && /\.css$/.test(assetName)) {
                        return "assets/css/[name].[ext]";
                    }
                    return "[name].[ext]";
                },
            },
        },
    },
    plugins: [
        vituum({
            pages: {
                dir: "src/demo/views",
                normalizeBasePath: true,
            },
        }),
        pug({
            root: "src",
            globals: {
                plugin: {
                    packagename: pkg.name,
                    homepage: pkg.homepage,
                    functionname: pluginConfig.functionname,
                    name: pluginConfig.functionname.toLowerCase(),
                },
                presentation: {
                    title: pluginConfig.demo?.presentation?.title || pkg.name,
                    theme: pluginConfig.demo?.presentation?.theme || "black",
                },
                author: pkg.author,
                isProd: process.env.NODE_ENV === "production",
            },
            options: {
                pretty: true,
            },
        }),
        suppressWarnings()
    ],
    resolve: {
        alias: {
        "@": "/src",
        },
    },
    server: {
        host: true,
        port: pluginConfig.demo?.server?.port || 8000,
        open: pluginConfig.demo?.server?.open || "index.html",
    },
});
