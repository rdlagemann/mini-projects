(function () {
  /* macros */
  const SECONDS = 60;
  var pomodoro_time = 1,
      break_time = 1,
      long_break = 1;

  /* clock object */
  var clock = {
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
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
    reset: function () {
      this.in_seconds.current = this.in_seconds.setted;
      this.running = false;
    }

  };

  /* preset */
  clock.update();

  /* set buttons */
  var pomodoroButton = document.getElementById('pomodoroButton');
  var intervalID = false;

  pomodoroButton.onclick = function () {
    if(intervalID){
      clearInterval(intervalID);
    }

    clock.reset();
    //this.disabled = true;   
    
    intervalID = setInterval(function () {
      clock.in_seconds.current -= 1;
      clock.update();

      // stop chronometer
      if (clock.in_seconds.current <= 0) {
        console.log('finished clock');
        clearInterval(intervalID);
        pomodoroButton.disabled = false;

      }
      
      // TODO: debug in 100ms, change to 1000ms
    }, 100);

  }

})()

function runTimer(timer, clock, intervalID) {

}