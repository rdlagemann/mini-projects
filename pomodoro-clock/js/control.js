(function () {
  /* macros */
  const SECONDS = 60;
  var pomodoro_time = 1,
      break_time = 2,
      long_break = 3;

  /* clock object */
  var clock = {
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    intervalID: false,
    running: false,

    in_seconds: {
      setted: pomodoro_time * SECONDS,
      current: pomodoro_time * SECONDS
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
      this.in_seconds.setted = timerType * SECONDS;
    },

    reset: function () {
      this.in_seconds.current = this.in_seconds.setted;
      this.intervalID = false;
      this.running = false;
    }

  };

  /* preset */
  clock.set(pomodoro_time);
  clock.update();

  /* set buttons (yep hard coded) */
  let pomodoroButton = document.getElementById('pomodoroButton').onclick = runTimer,
      breakButton = document.getElementById('breakButton').onclick = runTimer,
      longBreakButton = document.getElementById('longBreakButton').onclick = runTimer;
 


  function runTimer() {
    let timerType = '',
        buttonID = this.id;

    console.log(buttonID);

    if (buttonID === 'pomodoroButton') {
      timerType = pomodoro_time;
    }
    else if (buttonID === 'breakButton') {
      timerType = break_time;
    }
    else if (buttonID === 'longBreakButton') {
      timerType = long_break;
    }

    if(clock.intervalID){
      clearInterval(clock.intervalID);
      console.log('clearInterval')
    }

    clock.set(timerType);
    clock.reset();
    //this.disabled = true;   
    
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
    }, 100);  

}
  

})()

