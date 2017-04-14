var controller = (function(){

	var currentCount = 0;
	var timer = null;

	var firstMove = true;

	var winSound = new Audio("/crowd-yay.wav");
	var moveSound = new Audio("/dealing-card.mp3");

	function startTimer(){
		timer = setInterval(increaseCurrentCount.bind(this), 1000);
	}

	function pauseTimer(){
		clearInterval(timer);
	}

	function ressetTimer(){
		clearInterval(timer);
		currentCount = 0;
		this.view.setTime(extractTime(currentCount));
	}

	//Helper functions
	function increaseCurrentCount(){
		currentCount++;
		this.view.setTime(extractTime(currentCount));
	}

	function extractTime(currentCount){
		var hour = digitalize(Math.floor((currentCount / 3600) % 60));
		var minute = digitalize(Math.floor((currentCount / 60) % 60));
		var second = digitalize(currentCount % 60);

		return "" + hour + " : " + minute + " : " + second;
	}

	function digitalize(number){
		if(("" + number).length < 2){
			return "0" + number;
		}

		return number;
	}

	function slideUp(){
		slideModel.up();
		update();
	}

	function slideDown(){
		slideModel.down();
		update();
	}

	function slideLeft(){
		slideModel.left();
		update();
	}

	function slideRight(){
		slideModel.right();
		update();
	}

	function update(){
		moveSound.currentTime = 0.25;
		moveSound.play();
		this.view.updateDisplay(slideModel.tiles);

		if(firstMove){
			startTimer();
			firstMove = false;
		}

		if(slideModel.isCorrect()){
			console.log("Well Done");
			pauseTimer();
			winSound.play();
		}
	}

	function createGame(gameSize){
		gameSize = gameSize ? gameSize : 4;
		slideModel.createGame(gameSize, 100, 100);
		this.view.createTiles(gameSize);
		this.view.changeGameSize(gameSize * 100, gameSize * 100);
		this.view.updateDisplay(slideModel.tiles);
		shuffle();
		ressetTimer();
		firstMove = true;
	}

	function shuffle(){
		for(var i = 0; i < 1000; i++){
			slideModel.makeRandomMove();
			this.view.updateDisplay(slideModel.tiles);
		}
	}

	return{

		view: null,
		model: null,

		startTimer: startTimer,
		pauseTimer: pauseTimer,
		ressetTimer: ressetTimer,

		slideUp: slideUp,
		slideDown: slideDown,
		slideRight: slideRight,
		slideLeft: slideLeft,

		createGame: createGame,
		shuffle: shuffle,

	}

})();
// 4232026945