import { gsap } from "gsap"

function HomeAnim() {
	return {
		textes: {
			text1: ["une fois par semaine,", "deux fois par semaine,", "trois fois par semaine,"],
			text2: ["votre esprit change", "votre corps change", "votre vie change"],
		},
		classSpan: "absolute w-full text-center left-0",

		init(el) {
			// Create 2 paragraphs inside el
			const p1 = document.createElement("p")
			const p2 = document.createElement("p")
			el.appendChild(p1)
			el.appendChild(p2)

			// Add spans and divs to paragraphs
			this.addSpansToParagraph(p1, this.textes.text1)
			this.addSpansToParagraph(p2, this.textes.text2)
			this.addDivToParagraph(p1, "Studio")
			this.addDivToParagraph(p2, "Selini")

			// Display the first text of each paragraph and start the animation
			this.displayText(0, p1)
			this.displayText(0, p2)

			// Start the animation
			this.animateText(p1, this.textes.text1)
			this.animateText(p2, this.textes.text2)
		},

		addSpansToParagraph(paragraph, texts) {
			texts.forEach((text) => {
				const span = document.createElement("span")
				span.className = this.classSpan
				span.textContent = text
				span.style.opacity = 0
				paragraph.appendChild(span)
			})
		},

		addDivToParagraph(paragraph, text) {
			const div = document.createElement("div")
			div.innerText = text
			div.className = "opacity-0 pointer-events-none"
			paragraph.appendChild(div)
		},

		displayText(index, p) {
			// Hide all spans
			p.querySelectorAll("span").forEach((span) => {
				gsap.to(span, { opacity: 0, duration: 1, ease: "power2.inOut" })
			})

			// Display the span at the given index
			gsap.to(p.querySelectorAll("span")[index], { opacity: 1, duration: 1, ease: "power2.inOut" })
		},

		animateText(p, textes) {
			let index = 0
			setInterval(() => {
				// Increment the index
				index++
				if (index >= textes.length) {
					index = 0
				}

				// Display the text at the new index
				this.displayText(index, p)
			}, 3000)
		},
	}
}

export { HomeAnim }
