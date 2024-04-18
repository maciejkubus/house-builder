(function() {
	const houseCreator = document.querySelector('.house-creator')
	const elementButtons = document.querySelectorAll('.house-element-btn')

	const houseWidthInput = document.querySelector('.house-size-width')
	const houseHeightInput = document.querySelector('.house-size-height')

	let isBaseCreated = false;

	const baseSquare = {
		images: [
			{ name: 'r', url: '/img/base-r.png' },
			{ name: 'l', url: '/img/base-l.png' },
			{ name: 't', url: '/img/base-t.png' },
			{ name: 'b', url: '/img/base-b.png' },
			{ name: 'rb', url: '/img/base-rb.png' },
			{ name: 'lb', url: '/img/base-lb.png' },
			{ name: 'lt', url: '/img/base-lt.png' },
			{ name: 'rt', url: '/img/base-rt.png' },
		],
		size: {
			t: 400,
			r: 400,
			b: 400,
			l: 400,
			width: 432,
			height: 432,
		}
	};

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
		} else if(element == 'door') {
			createItem({
				image: '/img/door.png',
				roatatedImage: '/img/door-rotated.png'
			});
		} else if(element == 'base') {
			createBaseSquare();
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

	const squareSetSize = (square) => {
		const left = square.querySelector('.house-inner-l');
		const right = square.querySelector('.house-inner-r');
		const top = square.querySelector('.house-inner-t');
		const bottom = square.querySelector('.house-inner-b');
		const inner = square.querySelector('.house-base-inner');

		left.style.height = baseSquare.size.l + 'px'
		right.style.height = baseSquare.size.r + 'px'
		top.style.width = baseSquare.size.t + 'px'
		bottom.style.width = baseSquare.size.b + 'px'

		inner.style.width = baseSquare.size.width + 'px';
		inner.style.height = baseSquare.size.height + 'px';
	}

	const createBaseSquare = () => {
		if(isBaseCreated) {
			const houseBase = document.querySelector('.house-base');
			houseBase.remove();
		}

		const houseCreatorRect = houseCreator.getBoundingClientRect()
		const newItem = document.createElement("div")
		newItem.classList.add('house-base');
		const key = Date.now()
		newItem.setAttribute('data-key', key)

		const innerItem = document.createElement('div')
		innerItem.classList.add('house-base-inner')

		baseSquare.images.forEach(image => {
			const div = document.createElement('div');
			div.classList.add('house-inner-' + image.name)
			div.style.backgroundImage = 'url("' + image.url + '")'
			innerItem.appendChild(div);
		})

		newItem.appendChild(innerItem)
		houseCreator.appendChild(newItem)
		squareSetSize(newItem)
		
		// calculate place to put element into center (center of creator - half of new element +'px')
		newItem.style.top = (houseCreatorRect.height / 2) - (baseSquare.size.height / 2) + 'px';
		newItem.style.left = (houseCreatorRect.width / 2) - (baseSquare.size.width / 2) + 'px';

		isBaseCreated = true;
	}

	const baseSizeChange = () => {
		const scale = getWidth() < 900 ? 0.333 : 0.864;
		const width = houseWidthInput.value * scale;
		const height = houseHeightInput.value * scale;

		baseSquare.size.height = height;
		baseSquare.size.width = width;

		baseSquare.size.l = height - 32;
		baseSquare.size.r = height - 32;
		baseSquare.size.t = width - 32;
		baseSquare.size.b = width - 32;

		if(isBaseCreated)
			createBaseSquare();
	}

	houseWidthInput.addEventListener('change', baseSizeChange)
	houseHeightInput.addEventListener('change', baseSizeChange)

	baseSizeChange();
})()