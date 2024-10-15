function Gallery(props) {
	return {
		photoSelected: null,
		openModal: false,

		handleClick(id) {
			this.openModal = true
			const body = document.querySelector("body")
			body.style.overflow = "hidden"

			axios
				.get("/wp-json/wp/v2/media/" + id)
				.then((response) => {
					this.photoSelected = response.data
				})
				.catch((error) => {
					console.error(error)
				})
		},

		closeModal() {
			this.photoSelected = null
			this.openModal = false
			const body = document.querySelector("body")
			body.style.overflow = "auto"
		},
	}
}

export { Gallery }
