/*
 *	Rename days in the admin planning page
 */
const renameDays = () => {
	const elements = document.querySelectorAll(".admin-planning-day label")
	if (elements.length === 0) return

	// Days
	const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

	// Get elements with text content "Jour"
	const dayLabels = Array.from(elements).filter((el) => el.textContent === "Jour")

	// Change text content of dayLabels to days
	dayLabels.forEach((el, i) => {
		el.textContent = days[i]
	})
}
renameDays()

/*
 *	Change the color of the admin planning buttons
 */
const colorButtons = () => {
	const buttons = document.querySelectorAll(".admin-planning-color .acf-button-group label")
	if (buttons.length === 0) return

	buttons.forEach((button) => {
		button.style.backgroundColor = button.textContent
		button.style.color = button.textContent
		button.style.border = "none"
	})
}
colorButtons()
