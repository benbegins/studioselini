function Popup() {
	return {
		el: null,

		init(el) {
			this.el = el
			if (!sessionStorage.getItem("popup-dismissed")) {
				el.style.display = "flex"
			}
		},

		close() {
			this.el.style.display = "none"
			sessionStorage.setItem("popup-dismissed", "1")
		},
	}
}

export { Popup }
