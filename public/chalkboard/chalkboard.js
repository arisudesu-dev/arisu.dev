window.onload = function() {
	var chalkboard = document.getElementById('chalkboard');
	chalkboard.style.width = document.body.clientWidth + 'px';
	chalkboard.style.height = document.body.clientHeight + 'px';
	
	var board = document.getElementById('board');
	board.width = board.parentNode.clientWidth;
	board.height = board.parentNode.clientHeight;
	
	var drawMode = null;
	
	var canvas = board.getContext('2d');
	
	window.setColor = function(string) {
		board.style.cursor = "auto";
		drawMode = 'chalk';
		canvas.lineWidth = 2;
		canvas.strokeStyle = string;
		canvas.lineJoin = 'bevel';
		canvas.lineCap = 'butt';
		canvas.globalCompositeOperation = 'source-over';
		canvas.globalAlpha = 0.8;
	};
	
	window.setEraser = function() {
		board.style.cursor = "url(eraser.cur) 15 15, crosshair";
		drawMode = 'eraser';
		canvas.lineWidth = 33;
		canvas.lineJoin = 'round';
		canvas.lineCap = 'round';
		canvas.globalCompositeOperation = 'destination-out';
		canvas.globalAlpha = 0.5;		
	};
	
	setColor('#F0F0F0');
	
	var fMouseDown = false;
	var mX = null, mY = null;
	
	document.onmousedown = function(e) { if (e.which == 1) fMouseDown = true;  };
	document.onmouseup   = function(e) { if (e.which == 1) fMouseDown = false; };
	board.onmouseover   = function(e) {
		mX = e.clientX;
		mY = e.clientY;
	};
	
	board.onmousemove = function(e) {
		if (mX == null) {
			mX = e.clientX;
			mY = e.clientY;
		}
		var boardRect = board.getBoundingClientRect();
		
		if (fMouseDown) {
			if (drawMode == 'chalk') {
				var lineX1 = mX - boardRect.left;
				var lineY1 = mY - boardRect.top;
				var lineX2 = e.clientX - boardRect.left;
				var lineY2 = e.clientY - boardRect.top
				canvas.beginPath();
				canvas.moveTo(lineX1, lineY1);
				canvas.lineTo(lineX2, lineY2);
				canvas.closePath();
				canvas.stroke();
				
				board.lineWidth = 1.5;
				for (var i = 0; i < 5; i++ ) {
					canvas.beginPath();
					canvas.moveTo(lineX1 + Math.floor(Math.random() * 4) - 2, lineY1 + Math.floor(Math.random() * 4) - 2);
					canvas.lineTo(lineX2 + Math.floor(Math.random() * 4) - 2, lineY2 + Math.floor(Math.random() * 4) - 2);
					canvas.closePath();
					canvas.stroke();
				}
			} else if (drawMode == 'eraser') {
				var lineX1 = mX - boardRect.left;
				var lineY1 = mY - boardRect.top;
				var lineX2 = e.clientX - boardRect.left;
				var lineY2 = e.clientY - boardRect.top
				canvas.beginPath();
				canvas.moveTo(lineX1, lineY1);
				canvas.lineTo(lineX2, lineY2);
				canvas.closePath();
				canvas.stroke();
			}
		}
		
		mX = e.clientX;
		mY = e.clientY;
	};
	
	window.saveImage = function() {
		var buffer = canvas.getImageData(0, 0, board.width, board.height);
		
		var fillStyle = canvas.fillStyle;
		var compositeOperation = canvas.globalCompositeOperation;
		var alpha = canvas.globalAlpha;
		canvas.globalCompositeOperation = 'destination-over';
		canvas.globalAlpha = 1.0;
		
		var saveImageCallback = function () {
			// background-color
			background = window.getComputedStyle(board, null).backgroundColor;
			canvas.fillStyle = background;
			canvas.fillRect(0, 0, board.width, board.height);
			
			window.open(board.toDataURL('image/png'));
			
			canvas.clearRect(0, 0, board.width, board.height);
			canvas.globalCompositeOperation = compositeOperation;
			canvas.globalAlpha = alpha;
			canvas.putImageData(buffer, 0, 0);
			canvas.fillStyle = fillStyle;
		};
		
		// background-image?
		var background = window.getComputedStyle(board, null).backgroundImage.replace(/"/g,"").replace(/url\(|\)$/ig, "");
		
		if (background != 'none') {
			// load and fill with it
			var backgroundImage = new Image();
			backgroundImage.src = background;
			backgroundImage.onload = function() {
				var pattern = canvas.createPattern(backgroundImage, 'repeat');
				canvas.fillStyle = pattern;
				canvas.fillRect(0, 0, board.width, board.height);
				
				saveImageCallback();
			};
		} else {
			saveImageCallback();
		}
	};
	
	window.clearAll = function() {
		if (confirm('Очистить рисунок?')) {
			canvas.clearRect(0, 0, board.width, board.height);
		}
	};
};
