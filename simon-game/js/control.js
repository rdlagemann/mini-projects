(function () {
	var MAX_TURNS = 20,
		currentSeq = [], // current game sequence
		colors = Array.from(document.querySelectorAll('.simon')),
		startButton = document.getElementById('startButton');

	startButton.onclick = function(){
		let last = false,
			i = 0,
			intervalID;

		this.disabled = true;		

		// adds new step in final sequence
		currentSeq.push(Math.floor(Math.random() * 4));		

		intervalID = setInterval(function(){
			// turn light off
			lightSwitch(last)			

			last = colors[currentSeq[i]];

			// turn light on
			setTimeout(function(){				
				lightSwitch(last);
				i++;				
			}, 200);


			// ends
			if(i >= currentSeq.length - 1){	
				// turn off last light, reset values, stop interval
				setTimeout(function(){					
					lightSwitch(last);
					last = false;	
					i = 0;
					startButton.disabled = false;
					clearInterval(intervalID);

				}, 900);

			}

		}, 1000);

	};

})()

function lightSwitch (light) {
	if(light){
		light.classList.toggle("off");		
		light.classList.toggle("on");
	}	
}


