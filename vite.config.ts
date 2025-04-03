import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

export default defineConfig({
	plugins: [vue(), vuetify({ autoImport: true })],
	build: {
		lib: {
			entry: "src/index.ts",
			name: "SharedFrontend",
			fileName: (format) => `index.${format}.js`,
			formats: ["es"],
		},
		rollupOptions: {
			external: ["vue", "vuetify"],
			output: {
				globals: {
					vue: "Vue",
					vuetify: "Vuetify",
				},
			},
		},
	},
});
