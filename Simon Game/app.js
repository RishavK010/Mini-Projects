let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : 0;

let playButton = document.getElementById("play-btn");
let h2 = document.querySelector("h2");

function updateHighScore() {
    document.getElementById("high-score").innerText = highScore;
}

function playSound(key) {
    let url;
    switch (key) {
        case "red":
            url = "sounds/red.mp3";
            break;
        case "green":
            url = "sounds/green.mp3";
            break;
        case "purple":
            url = "sounds/purple.mp3";
            break;
        case "yellow":
            url = "sounds/yellow.mp3";
            break;
        case "wrong":
            url = "sounds/wrong.mp3";
            break;
        default:
            break;
    }
    let audio = new Audio(url);
    audio.play();
    pressAnimation(key);
}

function pressAnimation(key) {
    $("#" + key).addClass("pressed");
    setTimeout(function () {
        $("#" + key).removeClass("pressed");
    }, 100);
}

playButton.addEventListener("click", startGame);

document.addEventListener("keypress", function () {
    if (!started && window.innerWidth >= 768) {
        startGame();
    }
});

function startGame() {
    playButton.style.display = "none";  
    started = true;
    level = 0;
    score = 0;
    gameSeq = [];
    userSeq = [];
    h2.innerText = `Level ${level}`;
    startCountdown();
}

function startCountdown() {
    let countdown = 5;
    let header = h2;
    let buttonFlashInterval = setInterval(() => {
        btns.forEach((btn, idx) => {
            setTimeout(() => pressAnimation(btn), idx * 200);
        });
    }, 1000);

    let countdownInterval = setInterval(() => {
        header.innerText = `Game starting in ${countdown}...`;
        countdown--;
        if (countdown < 0) {
            clearInterval(countdownInterval);
            clearInterval(buttonFlashInterval);
            header.innerText = `Level ${level}`;
            levelUp();
        }
    }, 1000);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`)
    gameSeq.push(randColor);

    gameSeq.forEach((color, idx) => {
        setTimeout(() => {
            pressAnimation(color);
            playSound(color);
        }, 1000 * idx);
    });

    btnFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        score++;
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        gameOver();
    }
}

function btnPress() {
    let btn = this;
    btnFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
    playSound(userColor);
}

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}

function gameOver() {
    let body = document.querySelector("body");
    h2.innerHTML = `Game Over! Your score was <b>${score}</b><br>Press any key to Restart`;
    body.style.backgroundColor = "red";

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        updateHighScore();
    }

    setTimeout(function () {
        body.style.backgroundColor = "#011F3F";
        playButton.style.display = "block"; 
    }, 200);

    reset();
    playSound("wrong");
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

updateHighScore();