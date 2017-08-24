(function () {
	/* macros */
	const SECONDS = 60;
	const DEFAULT_MINUTES = 1;


	/* clock object */
	var clock = {
		minutes: document.getElementById('minutes'),
		seconds: document.getElementById('seconds'),

		in_seconds: {
			setted: DEFAULT_MINUTES * SECONDS,
			current: DEFAULT_MINUTES * SECONDS
		},
		format: function () {
			if(seconds.innerText.length === 1) {
				seconds.innerText = "0" + seconds.innerText;
			}

			if(minutes.innerText.length === 1) {
				minutes.innerText = "0" + minutes.innerText;
			}
		},
		update: function () {
			this.minutes.innerText = Math.floor(this.in_seconds.current / 60);
			this.seconds.innerText = (this.in_seconds.current % 60).toString();
			this.format();	
			
		},
		reset: function () {
			this.in_seconds.current = this.in_seconds.setted;
		}

	};

	/* preset */
	clock.update();

	/* set buttons */
	var startButton = document.getElementById('startButton');
	
	startButton.onclick = function () {
		console.log('start clicked');

		this.disabled = true;
		var that = this;
		
		var intervalID = setInterval(function () {
			clock.in_seconds.current -= 1;
			clock.update();

			// stop chronometer
			if (clock.in_seconds.current <= 0) {
				console.log('finished clock');
				clearInterval(intervalID);
				that.disabled = false;

			}

			// debug
			console.log(clock.in_seconds.current);
			
		}, 100);

	}



})()