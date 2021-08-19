// Buttons
var start = document.getElementById("start");
var pause = document.getElementById("pause");
var reset = document.getElementById("reset");
var skip = document.getElementById("skip");

// Timer
var work_minutes = document.getElementById("w-min");
var work_seconds = document.getElementById("w-sec");

var pomo = document.getElementById("pomo");
var break_time = document.getElementById("break");

var message = document.getElementById("message");

var cycle = document.getElementById("cycle");
var totalCycles = document.getElementById("total-cycles");

var startTimer;

window.addEventListener("keyup", handleKeyPress);

function handleKeyPress(e) {
  if (e.code === "Space") {
    if (startTimer == undefined) {
      start.click();
    } else if (startTimer != undefined) {
      pause.click();
    }
  }
}

/**
 * Start the break.
 */
function StartBreak() {
  work_minutes.innerText = "05";
  work_seconds.innerText = "00";
  message.innerText = "Time for a break.";
}

start.addEventListener("click", function () {
  if (startTimer === undefined) {
    startTimer = setInterval(timer, 1000);
  } else {
    alert("Timer is already running");
  }
  start.classList.remove("is-primary");
  pause.classList.add("is-link");
});

pause.addEventListener("click", function () {
  clearInterval(startTimer);
  startTimer = undefined;
  start.classList.add("is-primary");
  pause.classList.remove("is-link");
});

reset.addEventListener("click", function () {
  work_minutes.innerText = 25;
  work_seconds.innerText = "00";

  start.classList.add("is-primary");
  pause.classList.remove("is-link");

  clearInterval(startTimer);
  startTimer = undefined;
});

skip.addEventListener("click", function () {
  work_minutes.innerText = 25;
  work_seconds.innerText = "00";

  break_time.classList.remove("active");
  pomo.classList.add("active");

  message.innerText = "Time to Work!";

  reset.style.display = "block";
  skip.style.display = "none";

  start.classList.add("is-primary");
  pause.classList.remove("is-link");

  clearInterval(startTimer);
  startTimer = undefined;
});

function timer() {
  // Work Timer Countdown
  if (work_seconds.innerText != 0) {
    work_seconds.innerText--;
  } else if (work_minutes.innerText != 0 && work_seconds.innerText == 0) {
    work_seconds.innerText = 59;
    work_minutes.innerText--;
    if (work_minutes.innerText < 10) {
      work_minutes.innerText = "0" + work_minutes.innerText;
    }
  }

  // trailing zero
  if (work_seconds.innerText < 10) {
    work_seconds.innerText = "0" + work_seconds.innerText;
  }

  if (work_minutes.innerText == 0 && work_seconds.innerText == 0) {
    if (pomo.classList.contains("active")) {
      alert("Time is up");
      cycle.innerText++;
      StartBreak();
      clearInterval(startTimer);
      startTimer = undefined;
    } else if (break_time.classList.contains("active")) {
      cycle.innerText = cycle.innerText;
      clearInterval(startTimer);
      startTimer = undefined;
    }

    pomo.classList.remove("active");
    break_time.classList.add("active");
  }

  if (
    break_time.classList.contains("active") &&
    work_minutes.innerText == 0 &&
    work_seconds.innerText == 0
  ) {
    pomo.classList.add("active");
    break_time.classList.remove("active");
    work_minutes.innerText = 25;
    work_seconds.innerText = "00";
  }

  if (cycle.innerText == totalCycles.innerText) {
    cycle.innerText = 0;
  }

  for (let cssClass of break_time.classList) {
    if (cssClass == "active") {
      reset.style.display = "none";
      skip.style.display = "block";
    }
  }

  document.title = work_minutes.innerText + ":" + work_seconds.innerText;

  if (startTimer == undefined) {
    start.classList.add("is-primary");
    pause.classList.remove("is-link");
  } else if (startTimer != undefined) {
    start.classList.remove("is-primary");
    pause.classList.add("is-link");
  }
  if (start.classList.contains("is-primary")) {
    pause.classList.remove("is-link");
  } else if (pause.classList.contains("is-link")) {
    start.classList.remove("is-primary");
  }
}
