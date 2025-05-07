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
let timerMessage = document.getElementById("message");

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

    //make study timer active when pressed
    study.classList.add("active");
    shortBreak.classList.remove("active");
    longBreak.classList.remove("active");

    if (currentTimer !== pomodoroT){
        pausedTimer = false;
        currentTime = 0;
    }
    else{
        pausedTimer = true;
    }
    currentTimer = pomodoroT;
})

shortBreak.addEventListener("click", () => {
    hideElement();
    shortBT.style.display = "block";

    // make short break timer active when pressed
    study.classList.remove("active");
    shortBreak.classList.add("active");
    longBreak.classList.remove("active");

    if (currentTimer !== shortBT){
        pausedTimer = false;
        currentTime = 0;
    }
    else{
        pausedTimer = true;
    }
    currentTimer = shortBT;
})

longBreak.addEventListener("click", () => {
    hideElement();
    longBT.style.display = "block";

    // make long break timer active when pressed
    study.classList.remove("active");
    shortBreak.classList.remove("active");
    longBreak.classList.add("active");

    if (currentTimer !== longBT){
        pausedTimer = false;
        currentTime = 0;
    }
    else{
        pausedTimer = true;
    }
    currentTimer = longBT;
})

// --------------------------------Timer logic code ---------------------------------

let currentTime = 0;
let pausedTimer = false;

/**
 * 
 * @param timeElement: reference to the timer duration in HTML 
 * @returns the value of timer in seconds
 */
function findCurrentTimer(timeElement) {
    // grabs the timer value and change to float value
    const DURATION = parseFloat(timeElement.getAttribute("data-duration"));
    currentTime = DURATION * 60; // change to seconds

    return currentTime;
}

// updates time display on the timer
function updateDisplay(originalDuration, timeElement) {
    const min = Math.floor(originalDuration / 60);
    const secs = Math.floor(originalDuration % 60);
    timeElement.textContent = `${min}:${secs.toString().padStart(2, '0')}`;
}

// timer count down logic
function countDown(timeElement) {
    // if time is less than 0, stop the timer
    if (currentTime <= 0){
        clearInterval(currentInterval);
        currentInterval = null;
        return;
    }

    currentTime--;
    updateDisplay(currentTime, timeElement);
}

// Start the Timer from both the beginning or from pause
function startTimer(timeElement) {
    // calculate new time if timer is not paused
    if (!pausedTimer){
        findCurrentTimer(timeElement);
    }

    updateDisplay(currentTime, timeElement);
    // stop interval if timer is already starting
    if (currentInterval) {
        clearInterval(currentInterval);
    }
    // call countdown function every second
    currentInterval = setInterval(() => countDown(timeElement), 1000);
    pausedTimer = false;
}
// Button Functions
startBtn.addEventListener("click", () => {
    if (currentInterval !== null) {
        alert("Timer is already running");
        return;
    }
    if (currentTimer){
        timerMessage.style.display = "none";
        startTimer(currentTimer);
    }
    else{
        timerMessage.style.display = "block";
    }
})

stopBtn.addEventListener("click", () => {
    if (currentInterval){
        clearInterval(currentInterval);
        currentInterval = null;
        pausedTimer = true;
    }
})

resetBtn.addEventListener("click", () => {
    if (currentInterval) {
        clearInterval(currentInterval);
        currentInterval = null;
    }


    const timeDisplay = parseFloat(currentTimer.getAttribute("data-duration"));
    const formatTime = `${timeDisplay}:00`;
    currentTimer.textContent = formatTime;

    pausedTimer = false;
})
