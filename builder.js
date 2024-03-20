(function() {
	const houseCreator = document.querySelector('.house-creator')
	const elementButtons = document.querySelectorAll('.house-element-btn')

	elementButtons.forEach(elementButton => {
		elementButton.addEventListener('click', () => elementButtonClick(elementButton))
	})

	const elementButtonClick = (button) => {
		const element = button.getAttribute('data-element')

		if(element == 'square') {
			createItem({
				image: '/img/square.png'
			});
		} else if(element == 'window') {
			createItem({
				image: '/img/window.png',
				roatatedImage: '/img/window-rotated.png'
			});
		} if(element == 'base') {
			createItem({
				image: '/img/base.png'
			});
		}
	}

	const createItem = (item) => {
		const houseCreatorRect = houseCreator.getBoundingClientRect()
		const newItem = document.createElement("div")
		newItem.classList.add('house-item');
		const key = Date.now()
		newItem.setAttribute('data-key', key)

		const innerItem = document.createElement('div')
		innerItem.classList.add('house-item-inner')
		
		const image = document.createElement('img')
		image.classList.add('house-item-image')
		image.setAttribute('data-key', key)
		image.setAttribute('alt', 'item')
		image.setAttribute('src', item.image)
		image.setAttribute('data-image', item.image);
		image.setAttribute('data-rotated-image', item.roatatedImage)
		image.setAttribute('data-rotated', false)
		innerItem.appendChild(image)
		
		const remove = document.createElement('div')
		remove.classList.add('house-item-remove')
		remove.setAttribute('data-key', key)
		remove.innerHTML = '<i class="fas fa-trash"></i>'
		remove.addEventListener('click', removeItem)
		innerItem.appendChild(remove)

		if(item.roatatedImage) {
				const rotate = document.createElement('div')
				rotate.classList.add('house-item-rotate')
				rotate.setAttribute('data-key', key)
				rotate.innerHTML = '<i class="fas fa-undo" data-key="'+key+'"></i>'
				rotate.addEventListener('click', rotateItem)
				innerItem.appendChild(rotate)
		}
		
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

	const rotateItem = (event) => {
		const key = event.target.getAttribute('data-key')
		const images = document.querySelectorAll('.house-item-image')
		let image = null;

		images.forEach(img => {
			const imgKey = img.getAttribute('data-key')
			if(imgKey == key)
				image = img;
		})

		if(!image) {
			return
		}

		const dataImage = image.getAttribute('data-image')
		const dataRotatedImage = image.getAttribute('data-rotated-image')
		const dataRotated = image.getAttribute('data-rotated') == 'true'


		if(dataRotated)
			image.setAttribute('src', dataImage)
		else
			image.setAttribute('src', dataRotatedImage)

		image.setAttribute('data-rotated', !dataRotated)

	}

})()