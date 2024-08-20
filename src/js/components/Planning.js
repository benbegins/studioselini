function Planning() {
	return {
		days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
		apiUrl: "/wp-json/bemy/planning",
		courses: [],
		hourHeight: 110,

		initPlanning() {
			this.fetchCourses()
		},

		fetchCourses() {
			axios
				.get(this.apiUrl)
				.then((response) => {
					this.courses = response.data
				})
				.catch((error) => {
					console.error(error)
				})
		},
	}
}

export { Planning }
