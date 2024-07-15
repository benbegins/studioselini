/** @type {import('tailwindcss').Config} */
export default {
	content: ["../templates/**/*.twig", "./components/**/*.js", "./js/**/*.js"],
	theme: {
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
