/*
	Parallax effect for elements with data-parallax attribute

	Usage:
		<div data-parallax data-speed="5" data-scale="1.2">
			<img src="image.jpg" alt="Image">
		</div>

		data-speed: Parallax speed, default is 5
		data-scale: Parallax scale, default is 1
		data-position: Parallax position, default is bottom
		- top: Parallax effect starts from top of the element

		Example:
		<div data-parallax data-speed="5" data-scale="1.2" data-position="top">
			<img src="image.jpg" alt="Image">
		</div>
*/

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default class Parallax {
	constructor() {
		this.parallaxActive = false
		this.initParallax()
	}

	initParallax() {
		const parallaxElements = document.querySelectorAll("[data-parallax]")
		if (!parallaxElements.length) return

		if (window.innerWidth >= 1024) {
			this.parallaxActive = true
			parallaxElements.forEach((element) => {
				this.animateParallax(element)
			})
		}

		window.addEventListener("resize", () => {
			if (window.innerWidth >= 1024 && !this.parallaxActive) {
				this.parallaxActive = true
				parallaxElements.forEach((element) => {
					this.animateParallax(element)
				})
			} else if (window.innerWidth < 1024 && this.parallaxActive) {
				this.parallaxActive = false
				// Remove scrolltrigger animations and reset elements position
				parallaxElements.forEach((element) => {
					// if element has img child, desactive scrolltrigger and reset img position
					// else reset element position and desactive scrolltrigger
					const img = element.querySelector("img")
					if (img) {
						gsap.killTweensOf(img)
						gsap.set(img, { clearProps: "all" })
					} else {
						gsap.killTweensOf(element)
						gsap.set(element, { clearProps: "all" })
					}
				})
			}
		})
	}

	animateParallax(element) {
		// Set speed
		const speed = element.dataset.speed ? parseFloat(element.dataset.speed) : 5
		// Check if element has img child
		const img = element.querySelector("img")
		let parallaxElement
		img ? (parallaxElement = img) : (parallaxElement = element)
		// Set scale
		gsap.set(parallaxElement, {
			scale: element.dataset.scale ? parseFloat(element.dataset.scale) : 1,
		})
		// If element is on header
		if (element.dataset.position == "top") {
			gsap.set(parallaxElement, { scale: 1 })
			gsap.to(parallaxElement, {
				y: `${speed * (window.innerHeight / 100)}`,
				ease: "none",
				scrollTrigger: {
					trigger: element.parentElement,
					scrub: true,
					start: "top top",
					end: "bottom top",
				},
			})
		} else {
			gsap.fromTo(
				parallaxElement,
				{
					y: `-${speed * (window.innerHeight / 100)}`,
				},
				{
					y: `${speed * (window.innerHeight / 100)}`,
					ease: "none",
					scrollTrigger: {
						trigger: element.parentElement,
						scrub: true,
						start: "top bottom",
						end: "bottom top",
					},
				}
			)
		}
	}
}
