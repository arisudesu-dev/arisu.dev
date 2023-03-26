window.onload = function () {
	const frame = document.getElementById('frame')
	frame.style.width = document.body.clientWidth + 'px'
	frame.style.height = document.body.clientHeight + 'px'

	const board = document.getElementById('board')
	board.width = board.parentNode.clientWidth
	board.height = board.parentNode.clientHeight

	var canvas = board.getContext('2d')

	var color = '#F0F0F0'
	var erasing = false
	var fMouseDown = false
	var position = null

	const palette = [
		'#F0F0F0',
		'#FF7F7F',
		'#FFB27F',
		'#FFE97F',
		'#7FFF8E',
		'#7FC9FF',
		'#D67FFF',
		'#FF7FB6'
	]

	window.setColor = function (index) {
		erasing = false
		color = palette[index]
		board.classList.remove('erasing')
	}

	window.setEraser = function () {
		erasing = true
		board.classList.add('erasing')
	}

	document.onmousedown = function (e) { if (e.button == 0) fMouseDown = true }
	document.onmouseup = function (e) { if (e.button == 0) fMouseDown = false }
	board.onmouseover = function (e) {
		position = {
			X: e.clientX,
			Y: e.clientY
		}
	}

	board.onmousemove = function (e) {
		if (position == null) {
			position = {
				X: e.clientX,
				Y: e.clientY
			}
		}

		const boardRect = board.getBoundingClientRect()

		if (fMouseDown) {
			const line = {
				p1: {
					X: position.X - boardRect.left,
					Y: position.Y - boardRect.top
				},
				p2: {
					X: e.clientX - boardRect.left,
					Y: e.clientY - boardRect.top,
				}
			}

			if (!erasing) {
				canvas.lineWidth = 2
				canvas.strokeStyle = color
				canvas.lineJoin = 'bevel'
				canvas.lineCap = 'butt'
				canvas.globalCompositeOperation = 'source-over'
				canvas.globalAlpha = 0.8

				canvas.beginPath()
				canvas.moveTo(line.p1.X, line.p1.Y)
				canvas.lineTo(line.p2.X, line.p2.Y)
				canvas.closePath()
				canvas.stroke()

				for (var i = 0; i < 5; i++) {
					canvas.beginPath()
					canvas.moveTo(line.p1.X + Math.floor(Math.random() * 4) - 2, line.p1.Y + Math.floor(Math.random() * 4) - 2)
					canvas.lineTo(line.p2.X + Math.floor(Math.random() * 4) - 2, line.p2.Y + Math.floor(Math.random() * 4) - 2)
					canvas.closePath()
					canvas.stroke()
				}
			} else {
				canvas.lineWidth = 33
				canvas.lineJoin = 'round'
				canvas.lineCap = 'round'
				canvas.globalCompositeOperation = 'destination-out'
				canvas.globalAlpha = 0.5

				canvas.beginPath()
				canvas.moveTo(line.p1.X, line.p1.Y)
				canvas.lineTo(line.p2.X, line.p2.Y)
				canvas.closePath()
				canvas.stroke()
			}
		}

		position = {
			X: e.clientX,
			Y: e.clientY
		}
	}

	var backgroundImageReady = false

	window.saveImage = function () {
		if (!backgroundImageReady) {
			return
		}

		const buffer = canvas.getImageData(0, 0, board.width, board.height)
		const pattern = canvas.createPattern(backgroundImage, 'repeat')

		const savedGlobalCompositeOperation = canvas.globalCompositeOperation
		const savedGlobalAlpha = canvas.globalAlpha
		const savedFillStyle = canvas.fillStyle

		canvas.globalCompositeOperation = 'destination-over'
		canvas.globalAlpha = 1.0
		canvas.fillStyle = pattern

		canvas.fillRect(0, 0, board.width, board.height)
		window.open(board.toDataURL('image/png'), '_blank')

		canvas.globalCompositeOperation = savedGlobalCompositeOperation
		canvas.globalAlpha = savedGlobalAlpha
		canvas.fillStyle = savedFillStyle

		canvas.clearRect(0, 0, board.width, board.height)
		canvas.putImageData(buffer, 0, 0)
	}

	window.clearAll = function () {
		if (confirm('Clear the drawing?')) {
			canvas.clearRect(0, 0, board.width, board.height)
		}
	}

	const backgroundImage = new Image()
	backgroundImage.onload = function () { backgroundImageReady = true }
	backgroundImage.src = 'data:image/png;base64,'
		+ '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'
}
