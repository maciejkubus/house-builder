(function() {
	const canvas = document.querySelector('#house-builder-canvas');
	const ctx = canvas.getContext("2d");
	const wallTool = document.querySelector('#house-builder-wall');
	const squareTool = document.querySelector('#house-builder-square');

	let activeTool = 'none';
	const start = {
		wall: {
			x: 0,
			y: 0,
		},
		square: {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
		}
	}
	const mouse = {
		x: 0,
		y: 0,
	};
	const walls = [];
	const squares = [];

	function setActiveTool(tool) {
		activeTool = tool;
		canvas.setAttribute('tool', activeTool);
	}

	wallTool.addEventListener('click', () => {
		setActiveTool('start-wall');
	})
	squareTool.addEventListener('click', () => {
		setActiveTool('start-square');
	})

	canvas.addEventListener('click', (event) => {
		const x = parseInt( event.offsetX / 16 );
		const y = parseInt( event.offsetY / 16 );

		console.log({
			activeTool,
			x,
			y
		})

		if(activeTool == 'start-square') {
			start.square.x = x;
			start.square.y = y;
			activeTool = 'finish-square';
		}

	});

	canvas.addEventListener('mousemove', (event) => {
		const x = parseInt( event.offsetX / 16 );
		const y = parseInt( event.offsetY / 16 );

		mouse.x = x;
		mouse.y = y;
	})

	function drawSquare(square) {
		ctx.fillStyle = "#222";
		ctx.fillRect(
			square.start[0] * 16,
			square.start[1] * 16,
			square.size[0] * 16,
			square.size[1] * 16
		);
		ctx.fillStyle = "#fff";
		ctx.fillRect(
			(square.start[0] + 1) * 16,
			(square.start[1] + 1) * 16,
			(square.size[0] - 2) * 16,
			(square.size[1] - 2) * 16
		);
	}

	function drawGrid() {
		const gridCellSize = 16;
		const gridWidth = 1024;
		const gridHeight = 768;
		const gridPadding = 0;

    for (let x = 0; x <= gridWidth; x += gridCellSize) {
        ctx.moveTo(0.5 + x + gridPadding, gridPadding);
        ctx.lineTo(0.5 + x + gridPadding, gridHeight + gridPadding);
    }

    for (let x = 0; x <= gridHeight; x += gridCellSize) {
        ctx.moveTo(gridPadding, 0.5 + x + gridPadding);
        ctx.lineTo(gridWidth + gridPadding, 0.5 + x + gridPadding);
    }
    ctx.strokeStyle = "#22A1DC"; 
		ctx.strokeOpacity
    ctx.stroke();
	}

	function drawWalls() {
    walls.forEach(wall => {

		})
	}

	function drawSquares() {
		squares.forEach(square => {
			drawSquare(square);
		})

		if(activeTool == 'finish-square') {
			drawSquare({
				start: [start.square.x, start.square.y],
				size: [start.square.x - mouse.x, start.square.y - mouse.y]
			});
			console.log(start, mouse)
		}
	}

	function draw() {
		ctx.fillStyle = "#fff";
		ctx.fillRect(0, 0, 1024, 768)
		setActiveTool(activeTool);
		drawWalls();
		drawSquares();
		drawGrid();
	}

	setInterval(draw, 100)
})()