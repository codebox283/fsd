"use strict";
// src/main.ts
var timer = 0;
var isRunning = false;
var intervalId;
var display = document.getElementById('display');
var startButton = document.getElementById('start');
var pauseButton = document.getElementById('pause');
var recordButton = document.getElementById('record');
var resetButton = document.getElementById('reset');
var recordedTimes = document.getElementById('recorded-times');
var formatTime = function (time) {
    var getSeconds = "0".concat(time % 60).slice(-2);
    var minutes = Math.floor(time / 60);
    var getMinutes = "0".concat(minutes % 60).slice(-2);
    var getHours = "0".concat(Math.floor(time / 3600)).slice(-2);
    return "".concat(getHours, " : ").concat(getMinutes, " : ").concat(getSeconds);
};
var updateDisplay = function () {
    display.textContent = formatTime(timer);
};
var startTimer = function () {
    if (!isRunning) {
        isRunning = true;
        intervalId = setInterval(function () {
            timer += 1;
            updateDisplay();
        }, 1000);
    }
};
var pauseTimer = function () {
    if (isRunning) {
        isRunning = false;
        clearInterval(intervalId);
    }
};
var recordTime = function () {
    var record = document.createElement('div');
    record.textContent = formatTime(timer);
    recordedTimes.appendChild(record);
};
var resetTimer = function () {
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
