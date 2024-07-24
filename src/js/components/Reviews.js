import Swiper from "swiper"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

function Reviews() {
	return {
		reviews: [],
		apiUrl: "/wp-json/bemy/reviews",
		maxTextLength: 200,
		slider: null,
		sliderContainer: null,

		initReviews(el) {
			// Api request to get reviews
			axios
				.get(this.apiUrl)
				.then((response) => {
					this.reviews = response.data.result.reviews
					this.initSlider(el)
				})
				.catch((error) => {
					console.log(error)
				})
		},

		initSlider(el) {
			this.sliderContainer = el.querySelector(".swiper")

			this.slider = new Swiper(this.sliderContainer, {
				modules: [Navigation, Pagination],
				pagination: {
					el: ".slider-pagination",
				},
				navigation: {
					nextEl: ".section-reviews .button-next",
					prevEl: ".section-reviews .button-prev",
				},
				centeredSlides: true,
				autoHeight: true,
				speed: 450,
				slidesPerView: 1,
				spaceBetween: 24,
			})

			this.slider.on("slideChange", () => {
				this.maxTextLength = 200
			})
		},
	}
}

export { Reviews }
