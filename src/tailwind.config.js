/** @type {import('tailwindcss').Config} */
export default {
	content: ["../templates/**/*.twig", "./components/**/*.js", "./js/**/*.js"],
	theme: {
		colors: {
			black: "#18100A",
			white: "#E4E0DF",
			pink: "#BFA597",
			terracotta: "#A25448",
		},
		container: {
			center: true,
			padding: {
				DEFAULT: "1.25rem",
				lg: "1.5rem",
			},
		},
	},
	plugins: [],
}
