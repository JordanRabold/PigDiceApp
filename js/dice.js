function generateRandomValue(minValue, maxValue) {
    var min = Math.ceil(minValue);
    var max = Math.floor(maxValue);
    var random = Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
}
function changePlayers() {
    var currentPlayerName = document.getElementById("current").innerText;
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
    if (currentPlayerName == "") {
        document.getElementById("current").innerText = player1Name;
    }
    if (currentPlayerName == player1Name) {
        document.getElementById("current").innerText = player2Name;
    }
    else {
        document.getElementById("current").innerText = player1Name;
    }
}
window.onload = function () {
    var newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
function createNewGame() {
    var player1Score = document.getElementById("score1");
    var player2Score = document.getElementById("score2");
    player1Score.value = "0";
    player2Score.value = "0";
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
    if (player1Name == "") {
        alert("Player 1 missing name");
    }
    if (player2Name == "") {
        alert("Player 2 missing name");
    }
    if (player1Name == "" && player2Name == "") {
        alert("Player 1 & 2 missing names");
    }
    else {
        document.getElementById("turn").classList.add("open");
        document.getElementById("total").value = "0";
    }
    document.getElementById("player1").setAttribute("disabled", "disabled");
    document.getElementById("player2").setAttribute("disabled", "disabled");
    changePlayers();
}
function rollDie() {
    var currTotal = parseInt(document.getElementById("total").value);
    var diceRoll = generateRandomValue(1, 6);
    if (diceRoll == 1) {
        changePlayers();
        currTotal = 0;
    }
    if (diceRoll > 1) {
        currTotal += diceRoll;
    }
    document.getElementById("die").value = diceRoll.toString();
    document.getElementById("total").value = currTotal.toString();
}
function holdDie() {
    var namePlayer1 = document.getElementById("player1").value;
    var namePlayer2 = document.getElementById("player2").value;
    var player1TotalScore = parseInt(document.getElementById("score1").value);
    var player2TotalScore = parseInt(document.getElementById("score2").value);
    var currentTotal = parseInt(document.getElementById("total").value);
    var currentPlayer = document.getElementById("current").innerText;
    if (currentPlayer == namePlayer1) {
        player1TotalScore += currentTotal;
        document.getElementById("score1").value = player1TotalScore.toString();
    }
    if (currentPlayer == namePlayer2) {
        player2TotalScore += currentTotal;
        document.getElementById("score2").value = player2TotalScore.toString();
    }
    if (player1TotalScore >= 100) {
        alert("Player 1 Wins!");
        createNewGame();
        changePlayers();
    }
    if (player2TotalScore >= 100) {
        alert("Player 2 wins!");
        createNewGame();
        changePlayers();
    }
    document.getElementById("die").value = "0";
    document.getElementById("total").value = "0";
    changePlayers();
}
function playSound() {
    var diceSound = new Audio();
}
