const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions:{
   timerId: setInterval(randomSquare, 1000),
   countDownTimerId: setInterval(countDown, 1000), 

    }
};

function countDown(){
    //toda vez que for chamada decrementa o currentTime e verifica se o tempo acabou
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime; //atualiza de maneira visual
    if(state.values.currentTime <= 0){
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countDownTimerId);
        alert("Game Over! Your score is " + state.values.result);
    }
}
function playSound(){
    let audio = new Audio("./scr/audios/acerto.m4a"); //ver isso aqui depois
    audio.volume = 0.1; 
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}
/*function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
} - mesma forma de definir em actions. */

function addListenerHitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++,
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null; // volta para nulo para sempre ir guardando o oturo lugar do Ralph
                playSound(); //chama a função que toca o som
            }
        })
    });
}
function init() {
   // moveEnemy();
    addListenerHitbox();
}

init();