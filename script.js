let timer;
let isRunning = false;
let elapsedTime = 0;
const lapTimes = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const toggleThemeBtn = document.getElementById('toggleThemeBtn');
const lapTimesDiv = document.getElementById('lapTimes');
const startSound = document.getElementById('startSound');
const stopSound = document.getElementById('stopSound');

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startSound.play();
        timer = setInterval(() => {
            elapsedTime += 1000;
            display.textContent = formatTime(elapsedTime);
        }, 1000);
    }
});

stopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        stopSound.play();
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = formatTime(elapsedTime);
    lapTimes.length = 0; // Clear lap times
    lapTimesDiv.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        lapTimes.push(formatTime(elapsedTime));
        updateLapTimes();
    }
});

function updateLapTimes() {
    lapTimesDiv.innerHTML = '';
    lapTimes.forEach((lapTime, index) => {
        const lapElement = document.createElement('div');
        lapElement.className = 'lap';
        lapElement.textContent = `Lap ${index + 1}: ${lapTime}`;
        
        const clearLapBtn = document.createElement('button');
        clearLapBtn.textContent = 'Clear Lap';
        clearLapBtn.onclick = () => {
            lapTimes.splice(index, 1);
            updateLapTimes();
        };
        
        lapElement.appendChild(clearLapBtn);
        lapTimesDiv.appendChild(lapElement);
    });
}

toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});