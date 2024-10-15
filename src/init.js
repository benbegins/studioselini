import "./styles/main.css"

import { createApp } from "petite-vue"
import { Menu } from "./js/components/Menu"
import { Reviews } from "./js/components/Reviews"
import { Courses } from "./js/components/Courses"
import { Planning } from "./js/components/Planning"
import { Contact } from "./js/components/Contact"
import { Intro } from "./js/components/Intro"
import { HomeAnim } from "./js/components/HomeAnim"
import { Gallery } from "./js/components/Gallery"
import { ToggleElement } from "./js/components/ToggleElement"
import Parallax from "./js/components/Parallax"
import Buttons from "./js/components/buttons"

createApp({
	$delimiters: ["[[", "]]"],
	Menu,
	Reviews,
	Courses,
	Planning,
	Contact,
	Intro,
	HomeAnim,
	Gallery,
	ToggleElement,
}).mount()

const init = () => {
	new Parallax()
	new Buttons(".btn-primary")
	new Buttons(".btn-secondary")
}

document.addEventListener("DOMContentLoaded", () => {
	init()
})
