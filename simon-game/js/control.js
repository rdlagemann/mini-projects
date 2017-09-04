(function () {
	var MAX_TURNS = 20,
		waitingPlayerInput = false,
		inputIterator = 0,
		strictMode = false,
		currentSeq = [], // current game sequence
		mainFrame = document.querySelector('.main-frame'),
		seqDisplay = document.getElementById('seqDisplay'),
		colors = Array.from(document.querySelectorAll('.simon')),
		startButton = document.getElementById('startButton'),
		strictButton = document.getElementById('strictButton'),
		restartButton = document.getElementById('restartButton'),
		sounds = {
			'greenButton': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
			'redButton': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
			'blueButton':  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
			'yellowButton': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
		}


	colors.forEach( function(element) {	
		element.onclick = simonClick; 
	});

	startButton.onclick = function () { 
		runNewTurn(); 
	};

	strictButton.onclick = function () {
		runStrictMode(this);
		strictMode = !strictMode;
	}

	restartButton.onclick = function () {
		finishGame();
	}

	/*	
	
	Function Definitions 

	 */
	
	function runStrictMode (button) {
		button.classList.toggle('strict-button__active');
	}

	function resetControllers () {
		inputIterator = 0;
		waitingPlayerInput = false;
	}

	

	function playError () {
		// TODO: play error sound
		mainFrame.classList.add('shake-it');
		setTimeout(function () {
			mainFrame.classList.remove('shake-it');
		}, 400);
		seqDisplay.innerText = '!!';
	} 

	function updateDisplay (value) {
		if (value === 'error') {
			let oldValue = strictMode ? '00' : seqDisplay.innerText;
			playError();
			setTimeout(function () {
				seqDisplay.innerText = oldValue;
			}, 500);
		}
		else {
			
			seqDisplay.innerText = (value < 10) ? '0' + value : value;
		}
	}

	function finishGame () {
		resetControllers();
		updateDisplay(0);
		currentSeq.length = 0;
		startButton.disabled = false;

	}

	function runNewTurn () {	
		if(currentSeq.length >= MAX_TURNS) {
			window.alert('AMAZING! You win the Simon Game! Congrats! ;)');
			finishGame();
			return;
		}	

		let i = 0,
			intervalID;

		startButton.disabled = true;

		resetControllers();

		/* adds new step in final sequence */
		currentSeq.push(Math.floor(Math.random() * 4));	
		
		updateDisplay(currentSeq.length);

		intervalID = setInterval( function () {

			playLight(colors[currentSeq[i]]);

			i += 1;

			/* stop condition*/
			if(i >= currentSeq.length){
				clearInterval(intervalID);
				waitingPlayerInput = true;
			}			

		}, 800);
			
	}


	function lightSwitch (lightElement) {	
		if(lightElement){
			lightElement.classList.toggle("off");		
			lightElement.classList.toggle("on");
		}	
	}


	function playLight (lightElement) {
		let intervalID,
			button = lightElement;

		lightSwitch(lightElement);
		
		intervalID = setTimeout( function () {

			lightSwitch(lightElement);

			sounds[lightElement.id].play();

			clearInterval(intervalID);

		}, 300);
	}

	function checkHit (color, guess) {
		return (color === guess) ? true : false;
	}


	function endTurn (hit, button) {
		let seqIsOver = inputIterator >= currentSeq.length;

		if (hit) {
			playLight(button);			
		}
		else {

			updateDisplay('error');
			inputIterator = 0;

			if (strictMode) {
				finishGame();
				return;
			}

		}

		if (seqIsOver) {
			setTimeout(function (){
				runNewTurn();
			}, 500);			
		}				
		
	}


	function simonClick () {
		if (!waitingPlayerInput) {
			window.alert('Sir, please, wait your turn.');
			return;
		}

		let lightToGuess = colors[currentSeq[inputIterator]],
			hit = checkHit(this.id, lightToGuess.id),
			button = this;
		
		inputIterator += 1;

		endTurn(hit, button)
	}


})()



