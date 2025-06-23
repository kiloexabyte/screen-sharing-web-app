// https://nuxt.com/docs/api/configuration/nuxt-config
import lara from '@primeuix/themes/lara';

export default defineNuxtConfig({
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
	modules: ['@primevue/nuxt-module'],
	primevue: {
		/* Options */
		options: {
			ripple: true,
			inputStyle: "filled",
			theme: {
				preset: lara,
				options: {}
			}
		},
	},
	runtimeConfig: {
		public: {
			livekitWSurl: "wss://mello-d6rzaz12.livekit.cloud",
		},
	},
});
