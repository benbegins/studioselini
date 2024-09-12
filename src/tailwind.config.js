/** @type {import('tailwindcss').Config} */
export default {
	content: ["../templates/**/*.twig", "./components/**/*.js", "./js/**/*.js"],
	theme: {
		colors: {
			black: "#18100A",
			white: "#E4E0DF",
			pink: "#BFA597",
			terracotta: "#A25448",
			transparent: "transparent",
		},
		container: {
			center: true,
			padding: {
				DEFAULT: "1.5rem",
				lg: "3rem",
				xl: "4rem",
			},
		},
		fontFamily: {
			sans: ["sole-sans-variable", "sans-serif"],
			serif: ["sole-serif-small-variable", "serif"],
			"titling-display": ["sole-serif-titling-variable", "serif"],
			"titling-headline": ["sole-serif-titling-variable", "serif"],
			"titling-subhead": ["sole-serif-titling-variable", "serif"],
		},

		extend: {
			fontSize: {
				h1: "clamp(3.375rem, 2.98rem + 1.69vw, 4.5rem)",
				h2: "clamp(1.75rem, 1.3099rem + 1.8779vw, 3rem)",
				"body-xl": "clamp(1.5rem, 1.324rem + 0.751vw, 2rem)",
				"body-l": "clamp(1.25rem, 1.162rem + 0.375vw, 1.5rem)",
				"body-m": "1.0625rem",
				"body-s": "0.75rem",
				btn: "0.875rem",
				"menu-mobile": "1.5rem",
			},
			height: {
				dvh: "100dvh",
			},
			spacing: {
				section: "clamp(5rem, 3.5915rem + 6.0094vw, 9rem)",
			},
			transitionTimingFunction: {
				smooth: "cubic-bezier(0.7,0,0.45,1)",
			},
		},
	},

	plugins: [],
}
