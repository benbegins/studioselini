function ToggleElement() {
	return {
		el: null,
		isOpen: false,
		calculateHeight(el) {
			return this.isOpen ? el.scrollHeight + "px" : 0
		},
		closeOnOutsideClick(event) {
			if (this.el && !this.el.contains(event.target)) {
				this.isOpen = false
			}
		},
		mounted(el) {
			this.el = el
			document.addEventListener("click", this.closeOnOutsideClick.bind(this))
		},
		unmounted() {
			this.el = null
			document.removeEventListener("click", this.closeOnOutsideClick.bind(this))
		},

		closeOnScroll() {
			document.addEventListener("scroll", () => {
				this.isOpen = false
			})
		},
	}
}

export { ToggleElement }
