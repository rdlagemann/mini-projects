(function () {
  /* macros */
  const SECONDS = 60;

  var pomodoroValue = document.getElementById('pomodoroValue').innerText,
      breakValue = document.getElementById('breakValue').innerText,
      longBreakValue = document.getElementById('longBreakValue').innerText;

  // clock object
  var clock = {
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds'),
        intervalID: false,
        running: false,

        in_seconds: {
          setted: 0,
          current: 0
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

        set: function (timerType) {
          this.in_seconds.setted = Number(timerType) * SECONDS;
          this.in_seconds.current = Number(timerType) * SECONDS;
        },

        reset: function () {
          this.in_seconds.current = this.in_seconds.setted;
          this.intervalID = false;
          this.running = false;
          this.update();
        }

    };

  /* preset */
  clock.set(pomodoroValue);
  clock.update();

  /* set buttons (yep hard coded) */
  document.getElementById('pomodoroButton').onclick = startAndRunTimer;
  document.getElementById('breakButton').onclick = startAndRunTimer;
  document.getElementById('longBreakButton').onclick = startAndRunTimer;
  document.getElementById('stopButton').onclick = stopTimer;
  pausePlayButton = document.getElementById('pauseButton');
  pausePlayButton.onclick = pauseTimer;

  /* settings control */
  var decrements = Array.from(document.querySelectorAll('.dec')),
      increments = Array.from(document.querySelectorAll('.inc'));


  decrements.forEach( function(element) {
    element.onclick = decrementValue;
  });

  increments.forEach( function(element) {
    element.onclick = incrementValue;
  });


  /* 
  
  FUNCTIONS 

  */

  function pauseTimer() {
    if (clock.intervalID) {
      clearInterval(clock.intervalID);
      clock.intervalID = false;

    }
    else {
      runTimer();
    }
    
    this.classList.toggle('fa-pause');
    this.classList.toggle('fa-play');

  }


  function stopTimer () {
    if (clock.intervalID) {
      clearInterval(clock.intervalID);
    }
    clock.reset();
  }

  function runTimer () {
    if(clock.intervalID) {
       clearInterval(clock.intervalID);
    }

    clock.intervalID = setInterval(function () {
      clock.in_seconds.current -= 1;
      clock.update();

      // stop chronometer
      if (clock.in_seconds.current <= 0) {
        console.log('finished clock');
        clearInterval(clock.intervalID);
        clock.intervalID = false;
      }
      
       // TODO: debug in 100ms, change to 1000ms
    }, 1000);  
  }


  function startAndRunTimer () {
    let timerType = '',
        buttonID = this.id;

    pausePlayButton.classList.remove('fa-play');
    pausePlayButton.classList.add('fa-pause');

    console.log(buttonID);

    if (buttonID === 'pomodoroButton') {
      timerType = pomodoroValue;
    }
    else if (buttonID === 'breakButton') {
      timerType = breakValue;
    }
    else if (buttonID === 'longBreakButton') {
      timerType = longBreakValue;
    }
    else {
      // default to prevent bug
      timerType = pomodoroValue;
    }

    if(clock.intervalID){
      clearInterval(clock.intervalID);
      console.log('clearInterval')
    }

    clock.set(timerType);
    clock.reset();

    runTimer();
  }  
  

  function incrementValue () {
    if (!clock.intervalID) {
     var target = this.previousElementSibling,
          number = Number(target.innerText);

      number =  (number + 1) % 40;
      target.innerText = number;

      switch(target.id) {
        case 'pomodoroValue':
          pomodoroValue = number;
          break;
        case 'breakValue':
          breakValue = number;
          break;
        case 'longBreakValue':
          longBreakValue = number;
          break;
      }

    }

  }

  function decrementValue () {
    if(!clock.intervalID) {
      var target = this.nextElementSibling,
          number = Number(target.innerText);

      number -= 1;

      if (number <= 0) {
        number = 0;
      }

      target.innerText = number;
    }

  }


})()

