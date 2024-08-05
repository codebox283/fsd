// src/main.ts

let timer: number = 0;
let isRunning: boolean = false;
let intervalId: number | undefined;

const display = document.getElementById('display') as HTMLDivElement;
const startButton = document.getElementById('start') as HTMLButtonElement;
const pauseButton = document.getElementById('pause') as HTMLButtonElement;
const recordButton = document.getElementById('record') as HTMLButtonElement;
const resetButton = document.getElementById('reset') as HTMLButtonElement;
const recordedTimes = document.getElementById('recorded-times') as HTMLDivElement;

const formatTime = (time: number) => {
  const getSeconds = `0${time % 60}`.slice(-2);
  const minutes = Math.floor(time / 60);
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

const updateDisplay = () => {
  display.textContent = formatTime(timer);
};

const startTimer = () => {
  if (!isRunning) {
    isRunning = true;
    intervalId = setInterval(() => {
      timer += 1;
      updateDisplay();
    }, 1000);
  }
};

const pauseTimer = () => {
  if (isRunning) {
    isRunning = false;
    clearInterval(intervalId);
  }
};

const recordTime = () => {
  const record = document.createElement('div');
  record.textContent = formatTime(timer);
  recordedTimes.appendChild(record);
};

const resetTimer = () => {
    console.log('Reset button clicked');
    isRunning = false;
    clearInterval(intervalId);
    timer = 0;
    updateDisplay();
    recordedTimes.innerHTML = '';
  };
  

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
recordButton.addEventListener('click', recordTime);
resetButton.addEventListener('click', resetTimer);
