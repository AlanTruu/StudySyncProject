//button variables
let start = document.getElementById('start');
let pause = document.getElementById('pause');
let reset = document.getElementById('reset');

//start timer variables
let study_minutes = document.getElementById('s_minutes');
let study_seconds = document.getElementById('s_seconds');
console.log(typeof study_seconds.innerText);

//break timer variables
let break_minutes = document.getElementById('b_minutes');
let break_seconds = document.getElementById('b_seconds');

let startCountDown;

//Start Button Event Listener
start.addEventListener('click', function(){
    if (startCountDown === undefined){
        startCountDown = setInterval(decreaseTimer, 1000);
    }
    else{
        alert("Timer is already running");
    }
})

//Pause Button Event Listener
pause.addEventListener('click', function(){
    if (startCountDown != undefined){
        clearInterval(startCountDown);
        startCountDown = undefined;
    }
})

//Reset Button Event Listener
reset.addEventListener('click', function(){
    clearInterval(startCountDown); 
    startCountDown = undefined;
    
    study_minutes.innerText = "25";
    study_seconds.innerText = "00";

    break_minutes.innerText = "05";
    break_seconds.innerText = "00";
})

function decreaseTimer(){
    let studyMinutes = parseInt(study_minutes.innerText);
    let studySeconds = parseInt(study_seconds.innerText);
    let breakMinutes = parseInt(break_minutes.innerText);
    let breakSeconds = parseInt(break_seconds.innerText);
    
    //study timer 
    if (studySeconds != 0){
        studySeconds--;
    }
    else if (studySeconds == 0 && studyMinutes != 0){
        studyMinutes--;
        studySeconds = 59;
    }

    //break timer
    if (studySeconds == 0 && studyMinutes == 0) {
        if (breakSeconds != 0) {
            breakSeconds -= 1;
        } else if (breakSeconds == 0 && breakMinutes != 0) {
            breakMinutes -= 1;
            breakSeconds = 59;
        }
    }

    // Update the display
    if (studyMinutes < 10){
        study_minutes.innerText = '0' + studyMinutes;
    }
    else{
        study_minutes.innerText = studyMinutes;
    }
    if (studySeconds < 10){
        study_seconds.innerText = '0' + studySeconds;
    }
    else{
        study_seconds.innerText = studySeconds;
    }
    if (breakMinutes < 10){
        break_minutes.innerText = '0' + breakMinutes;
    }
    else{
        break_minutes.innerText = breakMinutes;
    }
    if (breakSeconds < 10){
        break_seconds.innerText = '0' + breakSeconds;
    }
    else{
        break_seconds.innerText = breakSeconds;
    }

    //if study and break timer are 0 secs, alert the user "Time up" and stop the timer
    if (studyMinutes == 0 && studySeconds == 0 && breakMinutes == 0 && breakSeconds == 0) {
        clearInterval(startCountDown);
        startCountDown = undefined;
        alert("Time's up!");
    }
}