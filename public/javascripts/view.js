var view = {

	timer: document.querySelector(".time"),
	gameBoard: document.querySelector(".game"),

	setTime: function(newTime){
		this.timer.innerText = newTime;
	},

	changeGameSize: function(width, height){
		this.gameBoard.style.width = width + "px";
		this.gameBoard.style.height = height + "px";
	},

	changeTileSize: function(width, height){
		var tiles = document.querySelectorAll(".tile");
		for(var i = 0; i < tiles.length; i++){
			tiles[i].style.width = width + "px";
			tiles[i].style.height = height + "px";
			tiles[i].style.lineHeight = height + "px";
		}
	},

	updateDisplay: function(displayObjects){
		var tiles = document.querySelectorAll(".tile");
		for(var i = 0; i < tiles.length; i++){
			tiles[i].style.top = displayObjects[i].top + "px";
			tiles[i].style.left = displayObjects[i].left + "px";
		}
	},

	createTiles: function(gameSize){
		var game = document.querySelector(".game");

		while(game.firstElementChild){
			game.removeChild(game.firstElementChild);
		}

		for(var row = 0; row < gameSize; row++){
			for(var column = 0; column < gameSize; column++){
				var tile = document.createElement("div");
				tile.className = "tile";
				tile.innerText = (row * gameSize) + column + 1;
				game.appendChild(tile);
			}
		}

		var tiles = document.querySelectorAll(".tile");
		var lastTile = tiles[tiles.length - 1];

		lastTile.className = "empty tile";
		lastTile.innerText = "";

	},

}

