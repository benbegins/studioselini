import { gsap } from "gsap/gsap-core"

function Intro() {
	return {
		path: document.querySelector(".transition .path"),
		overlay: document.querySelector(".transition-overlay"),
		page: document.querySelector("#content"),
		links: document.querySelectorAll("a"),

		base: "M 0 0 V 100 Q 50 100 100 100 V 0 z",
		start: "M 0 0 V 75 Q 50 100 100 75 V 0 z",
		end: "M 0 0 V 0 Q 50 0 100 0 V 0 z",

		init() {
			window.addEventListener("pageshow", (event) => {
				if (event.persisted) {
					this.removeIntro()
				}
			})

			gsap.set(this.path, { attr: { d: this.base } })
			gsap.set(this.page, { opacity: 0 })
			gsap.set(this.overlay, { opacity: 0.3 })

			this.playIntro()

			this.links.forEach((link) => {
				if (link.hostname === window.location.hostname && !link.hash && !link.href.includes("wp-admin")) {
					link.addEventListener("click", (e) => {
						e.preventDefault()
						this.transitionOut(e)
					})
				}
			})
		},

		playIntro() {
			this.showIntro = true
			sessionStorage.setItem("intro", true)

			const tl = gsap.timeline()

			tl.to(this.path, {
				attr: { d: this.start },
				ease: "power2.in",
				duration: 0.5,
			})
			tl.to(this.path, {
				attr: { d: this.end },
				ease: "power2.out",
				duration: 0.5,
			})

			tl.to(
				this.overlay,
				{
					opacity: 0,
					duration: 0.35,
					ease: "power1.in",
				},
				"-=0.35"
			)

			tl.to(
				this.page,
				{
					opacity: 1,
					duration: 0.75,
					ease: "power1.inOut",
				},
				"-=0.5"
			)
		},

		transitionOut(event) {
			this.base = "M 0 100 V 100 Q 50 100 100 100 V 100 z"
			this.start = "M 0 100 V 50 Q 50 15 100 50 V 100 z"
			this.end = "M 0 100 V 0 Q 50 0 100 0 V 100 z"

			gsap.set(this.path, { attr: { d: this.base } })

			const tl = gsap.timeline({
				onComplete: () => {
					this.changePage(event)
				},
			})

			tl.to(this.path, {
				attr: { d: this.start },
				ease: "power2.in",
				duration: 0.6,
			})
			tl.to(this.path, {
				attr: { d: this.end },
				ease: "power2.out",
				duration: 0.4,
			})
			tl.fromTo(this.overlay, { opacity: 0 }, { opacity: 0.35, duration: 0.6, ease: "power1.in" }, "-=1")
			tl.play(0)
		},

		changePage(event) {
			let href = null
			let element = event.target

			while (element) {
				if (element.href) {
					href = element.href
					break
				}
				element = element.parentElement
			}

			window.location.href = href
		},

		removeIntro() {
			const hidden = "M 0 0 V 0 Q 50 0 100 0 V 0 z"
			gsap.set(this.path, { attr: { d: hidden } })
			gsap.set(this.page, { opacity: 1 })
			gsap.set(this.overlay, { opacity: 0 })
		},
	}
}

export { Intro }
