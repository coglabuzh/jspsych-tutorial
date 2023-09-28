
interface switchObject {
  RUN_TIMER: boolean;
}


/**
 *
 * @param duration the duration of the countdown timer in seconds
 * @param displayElementId the ID of the HTML element where you want to display the timer
 */
export function countDownTimer(timeSwitch: switchObject, duration: number, displayElementId) {
  
  // allow to run timer
  timeSwitch.RUN_TIMER = true;

  var timer: number = parseInt(String(duration), 10); // Parse duration as an integer
  var minutes, seconds;

  var intervalId = setInterval(function () {
    if (!timeSwitch.RUN_TIMER) {
      // Check the global variable to see if the timer should be stopped
      clearInterval(intervalId);
      return;
    }

    minutes = timer / 60;
    seconds = (timer % 60) - 1;

    minutes = minutes < 10 ? "0" + minutes : String(minutes);
    seconds = seconds < 10 ? "0" + seconds : String(seconds);

    const displayText = duration < 100 ? seconds : minutes + ":" + seconds;
    //@ts-ignore
    document.getElementById(displayElementId).textContent = displayText;

    if (--timer < 0) clearInterval(intervalId);
  }, 1000);
}
