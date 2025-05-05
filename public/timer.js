//timer on display
let pomodoroT = document.getElementById("pomodoro-timers");
let shortBT = document.getElementById("short-timers");
let longBT = document.getElementById("long-timers");

// timer option labels
let timers = document.querySelectorAll(".timer-display");
let study = document.getElementById("pomodoro-study");
let shortBreak = document.getElementById("short-break");
let longBreak = document.getElementById("long-break");

// start, stop, pause buttons
let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let resetBtn = document.getElementById("reset");

// select timer notice message
let timerMessage = document.getElementById("timer-message");

// tImer option labels class
let button = document.querySelector(".button");

let currentTimer = null;
let currentInterval = null;

// set default timer on display
function defaultTimer() {
    pomodoroT.style.display = "block";
    shortBT.style.display = "none";
    longBT.style.display = "none";
}

defaultTimer();

// a function to hide the elements
function hideElement() {
    timers.forEach((timer) => {
        timer.style.display = "none";
    });
}

// be able to click the study timer label
study.addEventListener("click", () => {
    hideElement();
    pomodoroT.style.display = "block";

    study.classList.add("active");
    shortBreak.classList.remove("active");
    longBreak.classList.remove("active");

    currentTimer = pomodoroT;
})

shortBreak.addEventListener("click", () => {
    hideElement();
    shortBT.style.display = "block";

    study.classList.remove("active");
    shortBreak.classList.add("active");
    longBreak.classList.remove("active");

    currentTimer = shortBT;
})

longBreak.addEventListener("click", () => {
    hideElement();
    longBT.style.display = "block";

    study.classList.remove("active");
    shortBreak.classList.remove("active");
    longBreak.classList.add("active");

    currentTimer = longBT;
})

let remainingTime = null;
let isPaused = false;
let previousSeconds = null;
// Start the timer on click
function startTimer(timeElement) {
    if (currentInterval){
        clearInterval(currentInterval);
    } 

    const duration = parseFloat(timeElement.getAttribute("data-duration")); // minutes
    const durationMs = duration * 60 * 1000;
    const endTimestamp = Date.now() + durationMs;

    currentInterval = setInterval(() => {
        const timeLeft = endTimestamp - Date.now();

        if (timeLeft <= 0) {
            clearInterval(currentInterval);
            timeElement.textContent = "00:00";
            remainingTime = null;
            previousSeconds = null;
        } else {
            remainingTime = timeLeft;

            const minutes = Math.floor(timeLeft / 60000);
            const seconds = Math.floor((timeLeft % 60000) / 1000);

            if (seconds !== previousSeconds) { 
                timeElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
                previousSeconds = seconds;
            }
        }
    }, 250);
}

function resumeTimer(timeElement) {
    if (!remainingTime || remainingTime <= 0){
        return;
    }
    if (currentInterval) {
        clearInterval(currentInterval);
    }

    const endTimestamp = Date.now() + remainingTime;

    currentInterval = setInterval(() => {
        const timeLeft = endTimestamp - Date.now();

        if (timeLeft <= 0) {
            clearInterval(currentInterval);
            timeElement.textContent = "00:00";
            remainingTime = null;
            previousSeconds = null;
        } else {
            remainingTime = timeLeft;

            const minutes = Math.floor(timeLeft / 60000);
            const seconds = Math.floor((timeLeft % 60000) / 1000);

            if (seconds !== previousSeconds) {
                timeElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
                previousSeconds = seconds;
            }
        }
    }, 250);
}

// Button logic
startBtn.addEventListener("click", () => {
    if (currentTimer) {
        if (!remainingTime || remainingTime <= 0) {
            startTimer(currentTimer);
        } else {
            resumeTimer(currentTimer);
        }
        timerMessage.style.display = "none";
    } else {
        timerMessage.style.display = "block";
    }
});

stopBtn.addEventListener("click", () => {
    if (currentTimer) {
        clearInterval(currentInterval);
    } 
})

resetBtn.addEventListener("click", () => {
    if (currentInterval) {
        clearInterval(currentInterval);
        currentInterval = null;
    }

    remainingTime = null;

    const timeDisplay = parseFloat(currentTimer.getAttribute("data-duration"));
    const formatTime = `${timeDisplay}:00`;
    currentTimer.textContent = formatTime;
})
