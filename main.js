// Buttons
var start = document.getElementById("start");
var pause = document.getElementById("pause");
var reset = document.getElementById("reset");
var skip = document.getElementById("skip");
var skip_pomodoro = document.getElementById("skip-pomo");

// Timer
var work_minutes = document.getElementById("w-min");
var work_seconds = document.getElementById("w-sec");

var pomo = document.getElementById("pomo");
var break_time = document.getElementById("break");

var message = document.getElementById("message");

var cycle = document.getElementById("cycle");
var totalCycles = document.getElementById("total-cycles");

var settings_button = document.getElementById("settings-btn");

var settings_panel = document.getElementById("settings");
var close_settings = document.getElementById("settings-close");
var settings_okay_button = document.getElementById("setting-okay");

var pomodoros = document.getElementById("setting-pomodoros");
var short_break = document.getElementById("setting-break");

var help_button = document.getElementById("setting-help");

var startTimer;

window.addEventListener("keyup", handleKeyPress);

function setValue() {
  work_minutes.innerText = pomodoros.value;
  work_seconds.innerText = "00";
}

document.getElementById("time").addEventListener("load", setValue());

/**
 * @param {KeyboardEvent} e Key pressed by the user.
 */
function handleKeyPress(e) {
  if (e.code === "Space") {
    if (startTimer == undefined) {
      start.click();
    } else if (startTimer != undefined) {
      pause.click();
    }
  }
  if (e.shiftKey && e.code === "Space") {
    if (pomo.classList.contains("active")) {
      reset.click();
    } else if (break_time.classList.contains("active")) {
      skip.click();
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
    if (pomo.classList.contains("active")) {
      skip_pomodoro.style.display = "block";
    } else if (break_time.classList.contains("active")) {
      skip_pomodoro.style.display = "none";
    }
  } else {
    alert("Timer is already running");
  }
  start.classList.remove("is-primary");
  pause.classList.add("is-link");
});

pause.addEventListener("click", function () {
  clearInterval(startTimer);
  startTimer = undefined;
  skip_pomodoro.style.display = "none";
  start.classList.add("is-primary");
  pause.classList.remove("is-link");
});

reset.addEventListener("click", function () {
  start.classList.add("is-primary");
  pause.classList.remove("is-link");

  skip_pomodoro.style.display = "none";

  document.title =
    work_minutes.innerText + ":" + work_seconds.innerText + " | Pomodoro";

  settings_okay_button.click();

  clearInterval(startTimer);
  startTimer = undefined;
});

skip.addEventListener("click", function () {
  work_minutes.innerText = 25;
  work_seconds.innerText = "00";

  break_time.classList.remove("active");
  pomo.classList.add("active");

  skip_pomodoro.style.display = "none";

  message.innerText = "Time to Work!";

  reset.style.display = "block";
  skip.style.display = "none";

  start.classList.add("is-primary");
  pause.classList.remove("is-link");

  settings_okay_button.click();

  clearInterval(startTimer);
  startTimer = undefined;
});

skip_pomodoro.addEventListener("click", function () {
  alert("Do you wish to skip the Pomodoro?");
  work_minutes.innerText = "05";
  work_seconds.innerText = "00";

  start.classList.add("is-primary");
  pause.classList.remove("is-link");

  reset.style.display = "none";
  skip.style.display = "block";

  skip_pomodoro.style.display = "none";

  clearInterval(startTimer);
  startTimer = undefined;

  pomo.classList.remove("active");
  break_time.classList.add("active");

  settings_okay_button.click();

  cycle.innerText++;
});

settings_button.addEventListener("click", function () {
  settings_panel.classList.add("enable");
});

close_settings.addEventListener("click", function () {
  settings_panel.classList.remove("enable");
});

settings_okay_button.addEventListener("click", function () {
  pause.click();
  work_seconds.innerText = "00";
  work_minutes.innerText = pomodoros.value;
  if (break_time.classList.contains("active")) {
    if (short_break.value < 10) {
      work_minutes.innerText = "0" + short_break.value;
    } else {
      work_minutes.innerText = short_break.value;
    }
  } else {
    work_minutes.innerText = pomodoros.value;
  }
  settings_panel.classList.remove("enable");
});

help_button.addEventListener("click", function () {});

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

  if (break_time.classList.contains("active")) {
    skip_pomodoro.style.display = "none";
  }

  if (cycle.innerText == totalCycles.innerText) {
    new Notification("Congrats! ", {
      body: `You have completed ${cycle.innerText} Pomodoros.`,
    });
    cycle.innerText = 0;
  }

  for (let cssClass of break_time.classList) {
    if (cssClass == "active") {
      reset.style.display = "none";
      skip.style.display = "block";
    }
  }

  document.title =
    work_minutes.innerText + ":" + work_seconds.innerText + "  | Pomodoro";

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
