function generateRandomValue(minValue:number, maxValue:number):number{
    let min = Math.ceil(minValue);
    let max = Math.floor(maxValue);
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
}


function changePlayers():void{
    let currentPlayerName = document.getElementById("current").innerText;
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    if(currentPlayerName == ""){
        document.getElementById("current").innerText = player1Name;
    }
    if(currentPlayerName == player1Name){
        document.getElementById("current").innerText = player2Name;
    }
    else{
        document.getElementById("current").innerText = player1Name;
    }
}

window.onload = function(){
    let newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;

    document.getElementById("roll").onclick = rollDie;

    document.getElementById("hold").onclick = holdDie;
}

function createNewGame(){
    //set player 1 and player 2 scores to 0
    let player1Score = <HTMLInputElement>document.getElementById("score1");
    let player2Score = <HTMLInputElement>document.getElementById("score2");
    
    player1Score.value = "0";
    player2Score.value = "0";

    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    //verify each player has a name
    //if both players don't have a name display error
    if(player1Name == ""){
        alert("Player 1 missing name");
    }
    if(player2Name == ""){
        alert("Player 2 missing name");
    }
    if(player1Name == "" && player2Name == ""){
        alert("Player 1 & 2 missing names");
    }
    else{
        //if both players do have a name start the game!
        document.getElementById("turn").classList.add("open");
        (<HTMLInputElement>document.getElementById("total")).value = "0";
    }

    //lock in player names and then change players
    document.getElementById("player1").setAttribute("disabled", "disabled");
    document.getElementById("player2").setAttribute("disabled", "disabled");
    changePlayers();

}

function rollDie():void{
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);
    
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let diceRoll = generateRandomValue(1, 6);

    //if the roll is 1
    //  change players
    //  set current total to 0
    if(diceRoll == 1){
        changePlayers();
        currTotal = 0;
    }

    //if the roll is greater than 1
    //  add roll value to current total
    if(diceRoll > 1){
        currTotal += diceRoll;
    }

    //set the die roll to value player rolled
    (<HTMLInputElement>document.getElementById("die")).value = diceRoll.toString();
    //display current total on form
    (<HTMLInputElement>document.getElementById("total")).value = currTotal.toString();
    
}

function holdDie():void{

    let namePlayer1 = (<HTMLInputElement>document.getElementById("player1")).value;
    let namePlayer2 = (<HTMLInputElement>document.getElementById("player2")).value;
    let player1TotalScore = parseInt((<HTMLInputElement>document.getElementById("score1")).value);
    let player2TotalScore = parseInt((<HTMLInputElement>document.getElementById("score2")).value);

    //get the current turn total
    let currentTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);

    //determine who the current player is
    let currentPlayer = document.getElementById("current").innerText;

    //add the current turn total to the player's total score
    if(currentPlayer == namePlayer1){
        player1TotalScore += currentTotal;
        (<HTMLInputElement>document.getElementById("score1")).value = player1TotalScore.toString();
    }
    if(currentPlayer == namePlayer2){
        player2TotalScore += currentTotal;
        (<HTMLInputElement>document.getElementById("score2")).value = player2TotalScore.toString();
    }
    if(player1TotalScore >= 100){
        alert("Player 1 Wins!");
        createNewGame();
        changePlayers();
    }
    if(player2TotalScore >= 100){
        alert("Player 2 wins!");
        createNewGame();
        changePlayers();
    }

    //reset the turn total to 0
    (<HTMLInputElement>document.getElementById("die")).value = "0";
    (<HTMLInputElement>document.getElementById("total")).value = "0";

    //change players
    changePlayers();
}

function playSound(){
    let diceSound = new Audio()
}