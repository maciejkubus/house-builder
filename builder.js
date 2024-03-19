(function() {
	const houseCreator = document.querySelector('.house-creator')
	const elementButtons = document.querySelectorAll('.house-element-btn')

	elementButtons.forEach(elementButton => {
		elementButton.addEventListener('click', () => elementButtonClick(elementButton))
	})

	const elementButtonClick = (button) => {
		const element = button.getAttribute('data-element')

		if(element == 'square') {
			createSquare();
		}
	}

	const createSquare = () => {
		const houseCreatorRect = houseCreator.getBoundingClientRect()
		const newItem = document.createElement("div")
		newItem.classList.add('house-item');
		const key = Date.now()
		newItem.setAttribute('data-key', key)

		const innerItem = document.createElement('div')
		innerItem.classList.add('house-item-inner')
		
		const image = document.createElement('img')
		image.setAttribute('alt', 'item')
		image.setAttribute('src', '/img/square.png')
		innerItem.appendChild(image)
		
		const remove = document.createElement('div')
		remove.classList.add('house-item-remove')
		remove.setAttribute('data-key', key)
		remove.innerHTML = '<i class="fas fa-trash"></i>'
		remove.addEventListener('click', removeItem)
		innerItem.appendChild(remove)

		const drag = document.createElement('div')
		drag.classList.add('house-item-drag')
		drag.setAttribute('key', key)
		drag.innerHTML = '<i class="fas fa-hand-rock"></i>'
		innerItem.appendChild(drag)
		
		newItem.appendChild(innerItem)
		houseCreator.appendChild(newItem)
		const newItemRect = newItem.getBoundingClientRect()
		dragElement(newItem, key)
		
		// calculate place to put element into center (center of creator - half of new element +'px')
		newItem.style.top = (houseCreatorRect.height / 2) - (newItemRect.height / 2) + 'px';
		newItem.style.left = (houseCreatorRect.width / 2) - (newItemRect.width / 2) + 'px';
	}

	const removeItem = (event) => {
		const item = event.target.parentNode.parentNode;
		item.remove();
	}

})()