import { gsap } from "gsap/gsap-core"

function Intro() {
	return {
		showIntro: false,

		init(element) {
			// Check if user has already seen the intro
			if (!sessionStorage.getItem("intro")) {
				this.playIntro(element)
			}

			// this.playIntro(element)
		},

		playIntro(element) {
			this.showIntro = true
			sessionStorage.setItem("intro", true)

			const img = element.querySelector("img")
			const bg = element.querySelector(".intro__bg")
			const tl = gsap.timeline()

			tl.to(img, {
				scale: 1.03,
				opacity: 1,
				duration: 1,
				ease: "power1.inOut",
			})

			tl.to(img, {
				opacity: 0,
				duration: 0.75,
				delay: 0.5,
				ease: "power1.inOut",
			})

			tl.to(
				bg,
				{
					opacity: 0,
					duration: 1,
					ease: "power1.inOut",
				},
				"-=0.25"
			)
		},
	}
}

export { Intro }
