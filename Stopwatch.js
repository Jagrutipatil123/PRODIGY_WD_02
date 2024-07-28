let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapTimes = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startStopButton.innerHTML = "Stop";
    } else {
        clearInterval(tInterval);
        running = false;
        startStopButton.innerHTML = "Start";
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00";
    startStopButton.innerHTML = "Start";
    laps.innerHTML = '';
    lapTimes = [];
}

function lap() {
    if (running) {
        lapTimes.push(display.innerHTML);
        const lapElement = document.createElement('li');
        lapElement.innerHTML = `Lap ${lapTimes.length}: ${display.innerHTML}`;
        laps.appendChild(lapElement);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    display.innerHTML = (hours < 10 ? "0" + hours : hours) + ":"
                        + (minutes < 10 ? "0" + minutes : minutes) + ":"
                        + (seconds < 10 ? "0" + seconds : seconds);
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);