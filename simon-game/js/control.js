(function () {
	var MAX_TURNS = 20,
		waitingPlayerInput = false,
		inputIterator = 0,
		currentSeq = [], // current game sequence
		seqDisplay = document.getElementById('seqDisplay'),
		colors = Array.from(document.querySelectorAll('.simon')),
		startButton = document.getElementById('startButton'),
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

		runTurn();

	};

	/*	
	
	Function Definitions 

	 */

	function runTurn () {	
		if(currentSeq.length >= MAX_TURNS) {
			console.log('you win, goodbye');
			return;
		}	

		let last = false,
			i = 0,
			intervalID;

		/* adds new step in final sequence */
		currentSeq.push(Math.floor(Math.random() * 4));	
		// handle one digit number
		seqDisplay.innerText = currentSeq.length;
		if (seqDisplay.innerText.length === 1) {
			seqDisplay.innerText = '0'+ seqDisplay.innerText;
		}
		//debug
		console.log(currentSeq);

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


	function lightSwitch (light) {	
		if(light){
			light.classList.toggle("off");		
			light.classList.toggle("on");
		}	
	}


	function playLight (light) {
		let intervalID,
			button = light;

		lightSwitch(light);
		console.log(light);

		intervalID = setTimeout( function () {

			lightSwitch(light);

			sounds[light.id].play();

			clearInterval(intervalID);

		}, 300);


	}

	function checkHit (color, guess) {
		return (color === guess) ? true : false;
	}

	function endTurn () {
		inputIterator = 0;
		waitingPlayerInput = false;
		console.log('end turn');
	}



	function simonClick () {
		if (!waitingPlayerInput) {
			console.log('wait your turn!');
			return;
		}

		let lightToGuess = colors[currentSeq[inputIterator]],
			hit = checkHit(this.id, lightToGuess.id),
			seqIsOver;


		playLight(this);
		
		inputIterator += 1;

		seqIsOver = inputIterator >= currentSeq.length;

		if (hit){
			console.log('hit!');
			if(seqIsOver){
				setTimeout(function (){
					runTurn();
					return;
				}, 500);
				
			}
			
		}
		else {
			console.log('error at ' + this.id);
			endTurn();
			return;
		}		

		if (seqIsOver){
			console.log('current seq ends');
			endTurn();
			return;
		}
		
	}


})()



