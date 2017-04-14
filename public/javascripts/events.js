(function(){

	controller.view = view;
	controller.model = slideModel;

	window.addEventListener("keyup", function(event){
		
		if(event.key == "ArrowUp"){
			controller.slideUp();
		}

		else if(event.key == "ArrowDown"){
			controller.slideDown();
		}

		else if(event.key == "ArrowLeft"){
			controller.slideLeft();
		}

		else if(event.key == "ArrowRight"){
			controller.slideRight();
		}

	});

	var startButton = document.querySelector("#start");
	startButton.addEventListener("click", function(){
		var gameSize = (document.querySelector("#size")).value;
		gameSize = +gameSize;
		gameSize = gameSize > 6 ? 6 : gameSize;
		controller.createGame(+gameSize);
	});

	window.onload = function(){
		controller.createGame(3);
	}

})();