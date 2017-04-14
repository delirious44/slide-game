var slideModel = (function(){

	function createGame(gameSize, tileWidth, tileHeight){

		var topLeftValues = generateDisplaySettings(gameSize, tileWidth, tileHeight);
		var topValues = topLeftValues.top;
		var leftValues = topLeftValues.left;

		this.tiles = [];
		this.gameSize = gameSize;

		for(var row = 0; row < gameSize; row++){
			for(var column = 0; column < gameSize; column++){
				var currentPosition = (row * gameSize) + column;
				var tile = new tileObj(currentPosition, topValues[row], leftValues[column], (currentPosition + 1));
				this.tiles.push(tile);
			}
		}

		this.tiles[this.tiles.length - 1].name = "e";

	}

	function move(direction){
		var emptyTilePosition = getEmptyTilePosition.call(this);
		var toSwapTilePosition = getToSwapTile.call(this, emptyTilePosition, direction);

		try{
			swap(getTileAtPosition.call(this, emptyTilePosition), getTileAtPosition.call(this, toSwapTilePosition));
		}
		catch(err){
			console.log("Invalid Move");
		}
	}

	function getToSwapTile(emptyTilePosition, direction){
		var LEFT = -1;
		var RIGHT = 1;
		var UP = 2;
		var DOWN = -2;

		if(direction === LEFT){
			return emptyTilePosition + 1;
		}

		else if(direction === RIGHT){
			return emptyTilePosition - 1;
		}

		else if(direction === UP){
			return emptyTilePosition + this.gameSize;
		}

		else if(direction === DOWN){
			return emptyTilePosition - this.gameSize;
		}
	}

	function generateDisplaySettings(gameSize, tileWidth, tileHeight){
		var values = {};
		var topValues = [];
		var leftValues = [];

		for(var i = 0; i < gameSize; i++){
			topValues.push(tileHeight * i);
			leftValues.push(tileWidth * i);
		}

		values.top = topValues;
		values.left = leftValues;

		return values;
	}

	function getEmptyTilePosition(){
		for(var i = 0; i < this.tiles.length; i++){
			if(this.tiles[i].name == "e"){
				return this.tiles[i].position;
			}
		}
	}

	function getTileAtPosition(position){
		for(var i = 0; i < this.tiles.length; i++){
			if(this.tiles[i].position == position)
				return this.tiles[i];
		}
	}

	function swap(tile1, tile2){
		if(tile1.position == tile2.position + 1 || tile1.position == tile2.position - 1){
			if(tile1.top != tile2.top)
				throw new Error("Invalid Move");
		}

		var position1 = tile1.position;
		var top1 = tile1.top;
		var left1 = tile1.left;

		tile1.position = tile2.position;
		tile1.top = tile2.top;
		tile1.left = tile2.left;

		tile2.position = position1;
		tile2.top = top1;
		tile2.left = left1;
	}

	function print(){
		var text = "";
		for(var i = 0; i < this.tiles.length; i++){
			for(var j = 0; j < this.tiles.length; j++){
				if(this.tiles[j].position == i)
					text += this.tiles[j].name + " ";
			}
		}
		return text;
	}

	function makeRandomMove(){
		var moves = [-1, 1, 2, -2];
		var moveToMake = moves[Math.floor(Math.random() * moves.length)];
		move.call(this, moveToMake);
	}

	function isCorrect(){
		for(var i = 0; i < this.tiles.length; i++){
			if(this.tiles[i].position != i)
				return false;
		}

		return true;
	}

	return {
		gameSize: 0,
		createGame: createGame,
		print: print,
		up: function(){
			move.call(this, 2);
		},
		down: function(){
			move.call(this, -2);
		},
		left: function(){
			move.call(this, -1);
		},
		right: function(){
			move.call(this, 1);
		},
		makeRandomMove: makeRandomMove,
		isCorrect: isCorrect
	}

})();