import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
	plugins: [
		vue(),
		vuetify({ autoImport: true }),
		dts({
			insertTypesEntry: true,
			include: ["src"],
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			fileName: "index",
			formats: ["es"],
		},
		rollupOptions: {
			external: ["vue", "vuetify", "vue-router", "pinia"],
		},
		sourcemap: true,
		minify: "esbuild",
	},
});
