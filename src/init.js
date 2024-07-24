import "./styles/main.css"

import { createApp } from "petite-vue"
import { Menu } from "./js/components/Menu"
import { Reviews } from "./js/components/Reviews"
import Parallax from "./js/components/Parallax"
import Buttons from "./js/components/buttons"

createApp({
	$delimiters: ["[[", "]]"],
	Menu,
	Reviews,
}).mount()

const init = () => {
	new Parallax()
	new Buttons(".btn-primary")
	new Buttons(".btn-secondary")
}

document.addEventListener("DOMContentLoaded", () => {
	init()
})
