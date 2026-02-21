// https://nuxt.com/docs/api/configuration/nuxt-config
import lara from "@primeuix/themes/lara";

export default defineNuxtConfig({
	routeRules: {
		"/api/**": {
			cors: true,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
			},
		},
	},
	app: {
		head: {
			title: "Screen-sharing web app",
			meta: [{ name: "description", content: "Screen sharing website" }],
			link: [{ rel: "icon", type: "image/png", href: "/bnlab.png" }],
		},
	},
	devtools: { enabled: true },
	css: ["~/assets/css/main.css"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	modules: ["@primevue/nuxt-module"],
	primevue: {
		/* Options */
		options: {
			ripple: true,
			inputStyle: "filled",
			theme: {
				preset: lara,
				options: {},
			},
		},
	},
	runtimeConfig: {
		public: {
			livekitWSurl: "wss://screensharing-web-app-nxkeok9z.livekit.cloud",
		},
	},
});
