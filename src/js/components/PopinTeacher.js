function PopinTeacher() {
	return {
		popinOpen: false,
		teacher: {
			name: "",
			tags: [],
			presentation: "",
			image: "",
		},
		urlApi: "/wp-json/wp/v2",

		clickTeacher(id) {
			// Axios call to get the teacher data from the API based on the ID
			axios
				.get(this.urlApi + "/teacher/" + id)
				.then((response) => {
					this.openPopin(response.data)
					this.getTeacherImage(response.data.featured_media)
				})
				.catch((error) => {
					console.error(error)
				})
		},

		openPopin(data) {
			// Reset the teacher object
			this.resetTeacher()
			// body overflow hidden
			document.body.style.overflow = "hidden"
			// Open the popin
			this.popinOpen = true
			// Fill the teacher object with the data from the API
			this.teacher.name = data.title.rendered
			this.teacher.tags = data.acf.tags.split(", ")
			this.teacher.presentation = data.acf.presentation
		},

		getTeacherImage(id) {
			axios
				.get(this.urlApi + "/media/" + id)
				.then((response) => {
					this.teacher.image = response.data.media_details.sizes.medium_large.source_url
				})
				.catch((error) => {
					console.error(error)
				})
		},

		closePopin() {
			this.popinOpen = false
			document.body.style.overflow = "auto"
		},

		resetTeacher() {
			this.teacher = {
				name: "",
				tags: [],
				presentation: "",
				image: "",
			}
		},
	}
}

export { PopinTeacher }
