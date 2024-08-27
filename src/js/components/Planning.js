import { gsap } from "gsap"

function Planning() {
	return {
		days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
		apiUrl: "/wp-json/bemy/planning",
		courses: [],
		hourHeight: 110,
		dayHeight: 1430,
		dayActive: 0,

		initPlanning() {
			this.fetchCourses()
			this.displayCurrentDay()
			window.addEventListener("resize", this.displayCurrentDay)
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

		displayCurrentDay() {
			const days = document.querySelectorAll(".planning-days")

			// Mobile
			if (window.innerWidth <= 1024) {
				days.forEach((day) => {
					if (day.id != `day-${this.dayActive}`) {
						gsap.to(day, {
							height: 0,
							duration: 0.5,
							ease: "power2.inOut",
						})
					} else {
						gsap.to(day, {
							height: "auto",
							duration: 0.5,
							ease: "power2.inOut",
						})
					}
				})
			} else {
				// Desktop
				days.forEach((day) => {
					gsap.to(day, {
						height: this.dayHeight,
						duration: 0.5,
						ease: "power2.inOut",
					})
				})
			}
		},

		changeDay(day) {
			this.dayActive = day

			this.displayCurrentDay()
			this.scrollTop()
		},

		scrollTop() {
			const planningContainer = document.querySelector(".planning-container")
			if (planningContainer.offsetTop < window.scrollY) {
				window.scrollTo(0, planningContainer.offsetTop - 100)
			}
		},
	}
}

export { Planning }
