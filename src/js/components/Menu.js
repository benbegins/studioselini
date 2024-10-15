import { gsap } from "gsap"

function Menu(props) {
	return {
		siteHeader: null,
		menuOpen: false,
		submenuOpen: false,
		scrollPosition: 0,
		displayMenu: true,
		menuIsScrolling: false,

		toggleMenu(button) {
			this.menuOpen = !this.menuOpen

			if (this.menuOpen) {
				document.body.style.overflow = "hidden"

				button.setAttribute("aria-expanded", true)
				this.$refs.nav.classList.add("-translate-x-full")
				this.$refs.nav.setAttribute("aria-hidden", false)
			} else {
				document.body.style.overflow = "auto"

				button.setAttribute("aria-expanded", false)
				this.$refs.nav.classList.remove("-translate-x-full")
				this.$refs.nav.setAttribute("aria-hidden", true)

				this.closeAllSubmenus()
			}
		},

		scrollEvent(el) {
			this.siteHeader = el

			window.addEventListener("scroll", () => {
				// Display header on scroll up, hide on scroll down
				if (window.scrollY > 100) {
					// Set menuIsScrolling to true
					this.menuIsScrolling = true
					// Toggle header on scroll direction
					if (window.scrollY < this.scrollPosition) {
						this.displayMenu !== true ? this.toggleHeader(el, true) : null
					} else {
						this.displayMenu !== false ? this.toggleHeader(el, false) : null
					}
				} else {
					// Set menuIsScrolling to false
					this.menuIsScrolling = false
				}

				this.scrollPosition = window.scrollY

				if (this.submenuOpen) {
					// this.closeAllSubmenus()
				}
			})
		},

		toggleHeader(el, state) {
			this.displayMenu = state

			if (this.displayMenu) {
				gsap.to(el, {
					duration: 0.5,
					y: 0,
					ease: "power2.out",
				})
			} else {
				gsap.to(el, {
					duration: 0.5,
					y: -el.offsetHeight,
					ease: "power2.out",
				})
			}
		},

		toggleSubmenu(el) {
			const submenu = el.nextElementSibling
			const expanded = el.getAttribute("aria-expanded") === "true" || false

			if (this.submenuOpen && window.innerWidth >= 1024) {
				// this.closeAllSubmenus()
			}

			if (!expanded) {
				this.submenuOpen = true
				const submenuHeight = submenu.scrollHeight
				submenu.style.height = submenuHeight + "px"
				submenu.setAttribute("aria-hidden", false)
			} else {
				this.submenuOpen = false
				submenu.style.height = 0
				submenu.setAttribute("aria-hidden", true)
			}

			el.setAttribute("aria-expanded", !expanded)
		},

		closeAllSubmenus() {
			const submenus = this.siteHeader.querySelectorAll(".site-header__submenu")
			const btnSubmenus = this.siteHeader.querySelectorAll(".btn-submenu")

			if (submenus.length === 0) return
			if (btnSubmenus.length === 0) return

			this.submenuOpen = false

			submenus.forEach((submenu) => {
				submenu.style.height = 0

				submenu.setAttribute("aria-hidden", true)
			})
			btnSubmenus.forEach((btnSubmenu) => {
				btnSubmenu.setAttribute("aria-expanded", false)
			})
		},
	}
}

export { Menu }
