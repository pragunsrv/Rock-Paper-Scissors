let playerScore = 0;
let computerScore = 0;
const history = Array(5).fill('-');

function play(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    const result = getResult(playerChoice, computerChoice);
    updateScores(result);
    updateHistory(playerChoice, computerChoice, result);
}

function getResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    }
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return "You win!";
    }
    return "You lose!";
}

function updateScores(result) {
    if (result === "You win!") {
        playerScore++;
    } else if (result === "You lose!") {
        computerScore++;
    }
    document.getElementById('player-score').innerText = playerScore;
    document.getElementById('computer-score').innerText = computerScore;
}

function updateHistory(playerChoice, computerChoice, result) {
    history.pop();
    history.unshift(`You chose ${playerChoice}, Computer chose ${computerChoice}: ${result}`);
    const historyList = document.getElementById('history');
    historyList.innerHTML = history.map((entry, index) => `<li>Game ${index + 1}: ${entry}</li>`).join('');
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    history.fill('-');
    document.getElementById('player-score').innerText = playerScore;
    document.getElementById('computer-score').innerText = computerScore;
    updateHistory('', '', '');
}
