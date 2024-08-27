function Courses() {
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
			// Reset the teacher object
			this.resetTeacher()
			// body overflow hidden
			document.body.style.overflow = "hidden"
			// Open the popin
			this.popinOpen = true
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
			// Fill the teacher object with the data from the API
			this.teacher.name = data.title.rendered
			this.teacher.tags = data.acf.tags.split(", ")
			this.teacher.presentation = data.acf.presentation
		},

		getTeacherImage(id) {
			axios
				.get(this.urlApi + "/media/" + id)
				.then((response) => {
					// If medium_large size exists, use it, otherwise use full size
					this.teacher.image = response.data.media_details.sizes.medium_large
						? response.data.media_details.sizes.medium_large.source_url
						: response.data.media_details.sizes.full.source_url
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

		initScrollDetection() {
			const courses = document.querySelectorAll(".course-item")
			const tags = document.querySelectorAll(".course-tag")

			// Add event listener to detect wich course item is in the top of the viewport
			window.addEventListener("scroll", () => {
				courses.forEach((course, index) => {
					if (this.isElementInViewport(course)) {
						this.highlightTag(tags[index])
					}
				})
			})
		},

		isElementInViewport(el) {
			const rect = el.getBoundingClientRect()
			return rect.top <= window.innerHeight / 4
		},

		highlightTag(tagActive) {
			const tags = document.querySelectorAll(".course-tag")
			tags.forEach((tag) => {
				tag.classList.remove("w-3", "bg-black")
			})
			tagActive.classList.add("w-3", "bg-black")
		},
	}
}

export { Courses }
