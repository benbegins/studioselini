import "./styles/main.css"

import { createApp } from "petite-vue"
import { Menu } from "./js/components/Menu"

createApp({
	$delimiters: ["[[", "]]"],
	Menu,
}).mount()
