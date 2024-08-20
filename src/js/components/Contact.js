function Contact() {
	return {
		fields: {
			name: "",
			email: "",
			message: "",
			rgpd: false,
		},
		errors: {
			name: "",
			email: "",
			message: "",
			rgpd: "",
		},
		apiUrl: "/wp-json/bemy/contact",
		success: false,

		submit() {
			if (!this.validate()) {
				this.sendEmail()
			}
		},

		validate() {
			this.errors = {
				name: this.fields.name ? "" : "Vous devez renseigner votre nom",
				email: this.fields.email ? "" : "Vous devez renseigner votre email",
				message: this.fields.message ? "" : "Vous devez renseigner un message",
				rgpd: this.fields.rgpd ? "" : "Vous devez cocher cette case pour envoyer le formulaire",
			}
			return this.errors.name || this.errors.email || this.errors.message || this.errors.rgpd
		},

		resetForm() {
			this.fields = {
				name: "",
				email: "",
				message: "",
			}
			this.errors = {
				name: "",
				email: "",
				message: "",
			}
		},

		sendEmail() {
			grecaptcha.enterprise.ready(() => {
				grecaptcha.enterprise
					.execute("6LfFYSoqAAAAAO8sSeoW3Qjp_d6PgLGonuDKBRNw", { action: "submit" })
					.then((token) => {
						const data = {
							name: this.fields.name,
							email: this.fields.email,
							message: this.fields.message,
							"g-recaptcha-response": token,
						}

						axios
							.post(this.apiUrl, data)
							.then((response) => {
								if (response.data.success) {
									this.resetForm()
									this.success = true
									console.log(response.data.message)
								} else {
									this.resetForm()
									console.log(response.data.message)
								}
							})
							.catch((error) => {
								console.log(error)
							})
					})
			})
		},
	}
}

export { Contact }
