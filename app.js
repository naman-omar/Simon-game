
let para1 = document.querySelector("#para");
let back = document.querySelector(".boxes");
let box1 = document.querySelector("#box1");
let box2 = document.querySelector("#box2");
let box3 = document.querySelector("#box3");
let box4 = document.querySelector("#box4");
let high = document.querySelector("h3");
let btns = document.querySelectorAll(".btn");

let box = ["box1", "box2", "box3", "box4"];
let gameSeq = [];
let userSeq = [];
let highScore = 0;
let score = 0;
let level = 0;
let isStarted = false;

function disable() {
    for (let button of btns) {
        button.classList.add("disabled");
    }
}

function enable() {
    for (let button of btns) {
        button.classList.remove("disabled");
    }
}

disable();

document.addEventListener("keypress", function () {
    if (!isStarted) {
        console.log("Game is started");
        enable();
        isStarted = true;
        levelup();
    }
});

function levelup() {
    level++;
    console.log(`current level is ${level}`);
    userSeq = [];
    para1.innerHTML = `Level ${level}`;
    let rand = Math.floor(Math.random() * 4);
    let randBox = box[rand];
    console.log(`box selected by the game is ${randBox}`);
    let mainBox = document.querySelector(`#${randBox}`);
    gameSeq.push(randBox);
    console.log(gameSeq);
    flashBtn(mainBox);
}

function flashBtn(btn) {
    btn.classList.add("flashGame");
    setTimeout(function () {
        btn.classList.remove("flashGame");
    }, 500);
}

for (let button of btns) {
    button.addEventListener("click", function () {
        button.classList.add("flashUser");
        setTimeout(function () {
            button.classList.remove("flashUser");
            let btnId = button.getAttribute("id");
            userSeq.push(btnId);
            matchSequence();
        }, 500);
    });
}

function matchSequence() {
    console.log("currently in match sequence function");
    for (let i = 0; i < userSeq.length; i++) {
        console.log(gameSeq[i], userSeq[i]);
        if (gameSeq[i] == userSeq[i]) {
            if (i == gameSeq.length - 1) {
                score = level;
                setTimeout(levelup,500);
    
            }
        }
        else {
            back.classList.add("wrong");
            setTimeout(function(){
                back.classList.remove("wrong");  
            },250);
            if(score > highScore){
                highScore = score;
                high.innerHTML = `High score: ${score}`;
                para1.innerHTML = `<b>GAME OVER!</b> Your score is ${score}.<br>Hurray! New high score created<br>Press any key to restart`;
            }
            else{
                para1.innerHTML = `<b>GAME OVER!</b> Your score is ${score}<br><br>Press any key to restart`;
            }
            restart();
        }
    }
}

function restart() {
    disable();
    console.clear();
    level = 0;
    isStarted = false;
    gameSeq = [];
    userSeq = [];
    score = 0;
}