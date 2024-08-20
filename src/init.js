import "./styles/main.css"

import { createApp } from "petite-vue"
import { Menu } from "./js/components/Menu"
import { Reviews } from "./js/components/Reviews"
import { PopinTeacher } from "./js/components/PopinTeacher"
import { Planning } from "./js/components/Planning"
import { Contact } from "./js/components/Contact"
import { Intro } from "./js/components/Intro"
import Parallax from "./js/components/Parallax"
import Buttons from "./js/components/buttons"

createApp({
	$delimiters: ["[[", "]]"],
	Menu,
	Reviews,
	PopinTeacher,
	Planning,
	Contact,
	Intro,
}).mount()

const init = () => {
	new Parallax()
	new Buttons(".btn-primary")
	new Buttons(".btn-secondary")
}

document.addEventListener("DOMContentLoaded", () => {
	init()
})
