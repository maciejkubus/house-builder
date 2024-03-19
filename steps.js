(function() {

	const stepButtons = document.querySelectorAll('.house-nav-step')
	const elementContainers = document.querySelectorAll('.house-element')

	stepButtons.forEach(button => {
		button.addEventListener('click', () => stepClick(button))
	})

	let currentStep = 1

	const stepClick = (button) => {
		const step = button.getAttribute('data-step')
		currentStep = step

		stepButtons.forEach(button => {
			const buttonStep = button.getAttribute('data-step')
			if(buttonStep == currentStep)
				button.classList.add('house-nav-step--active')
			else
				button.classList.remove('house-nav-step--active')
		})

		elementContainers.forEach(element => {
			const elementStep = element.getAttribute('data-step')
			if(elementStep == currentStep)
				element.classList.add('house-element--active')
			else
				element.classList.remove('house-element--active')
		})
	}
})()