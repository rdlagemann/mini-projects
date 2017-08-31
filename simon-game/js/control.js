(function () {
	var MAX_TURNS = 20,
		waitingPlayerInput = false,
		currentSeq = [], // current game sequence
		colors = Array.from(document.querySelectorAll('.simon')),
		startButton = document.getElementById('startButton');


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
		let last = false,
			i = 0,
			intervalID;

		/* adds new step in final sequence */
		currentSeq.push(Math.floor(Math.random() * 4));	
		//debug
		console.log(currentSeq);

		intervalID = setInterval( function () {

			playLight(colors[currentSeq[i]]);

			/* stop condition*/
			(i >= currentSeq.length) ? clearInterval(intervalID) : i += 1;

		}, 1000);
			
	}


	function lightSwitch (light) {	
		if(light){
			light.classList.toggle("off");		
			light.classList.toggle("on");
		}	
	}

	function playLight (light) {
		let intervalID;

		lightSwitch(light);

		intervalID = setTimeout( function () {
			lightSwitch(light);
			// TODO: playsound
			clearInterval(intervalID);
		}, 500);


	}

	function simonClick(){
		playLight(this);
	}


})()



