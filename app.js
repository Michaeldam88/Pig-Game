var scores, roundScore, activePlayer, previusDice, previusDice1, setToggled, winnerPoint, setToggledRules;

winnerPoint = 100;

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice1").style.display = "none";

    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector('.player-0-panel').classList.remove("winner");
    document.querySelector('.player-0-panel').classList.remove("active");
    document.querySelector('.player-0-panel').classList.add("active");
    document.querySelector('.player-1-panel').classList.remove("winner");
    document.querySelector('.player-1-panel').classList.remove("active");
    document.querySelector(".btn-roll").style.display = "block";
    document.querySelector(".btn-hold").style.display = "block";
    document.querySelector(".btn-set").style.display = "none";
    document.querySelector("#setPoint").style.display = "none";
    document.querySelector("#rules").style.display = "none";

    setToggled = false;
}

init();

var nextPlayer = function () {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    previusDice = 0;
    previusDice1 = 0;

    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
}

document.querySelector(".btn-set").addEventListener("click", function () {
    winnerPoint = document.getElementById("setPoint").value;
    document.getElementById("points").textContent = winnerPoint;
    init();

});

document.querySelector(".btn-roll").addEventListener("click", function () {

    var dice = Math.floor(Math.random() * 6) + 1;
    var dice1 = Math.floor(Math.random() * 6) + 1;

    var diceDOM = document.querySelector(".dice");
    var diceDOM1 = document.querySelector(".dice1");

    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    diceDOM1.style.display = "block";
    diceDOM1.src = "dice-" + dice1 + ".png";

    if (previusDice === 6 && dice === 6 || previusDice1 === 6 && dice1 === 6) {
        roundScore = 0;
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
        scores[activePlayer] = 0;
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
        nextPlayer();

    } else if (dice !== 1 && dice1 !== 1) {
        roundScore += dice + dice1;
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
        previusDice = dice;
        previusDice1 = dice1;
    } else {
        nextPlayer();
    };
});

document.querySelector(".btn-hold").addEventListener("click", function () {
    scores[activePlayer] += roundScore;
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

    if (scores[activePlayer] >= winnerPoint) {
        document.querySelector(".dice").style.display = "none";
        document.querySelector(".dice1").style.display = "none";
        document.getElementById("name-" + activePlayer).textContent = "Winner !";
        document.querySelector('.player-' + activePlayer + '-panel').classList.add("winner");
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove("active");
        document.querySelector(".btn-roll").style.display = "none";
        document.querySelector(".btn-hold").style.display = "none";
    } else {
        document.querySelector(".dice").style.display = "none";
        document.querySelector(".dice1").style.display = "none";
        nextPlayer();
    }
});

document.querySelector(".btn-new").addEventListener("click", init);

document.querySelector(".btn-setting").addEventListener("click", function () {
    if (setToggled === true) {
        document.querySelector(".btn-set").style.display = "none";
        document.querySelector("#setPoint").style.display = "none";
        setToggled = false;
    } else {
        document.querySelector(".btn-set").style.display = "block";
        document.querySelector("#setPoint").style.display = "block";
        setToggled = true;
    }
});

document.querySelector(".btn-rules").addEventListener("click", function () {
    document.querySelector("#rules").style.display = "block";
    document.querySelector("#rulesDiv").style.display = "block";
});

document.querySelector("#rulesDiv").addEventListener("click", function () {
    document.querySelector("#rules").style.display = "none";
    document.querySelector("#rulesDiv").style.display = "none";
});