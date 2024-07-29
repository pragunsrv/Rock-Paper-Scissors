let playerScore = 0;
let computerScore = 0;
let tieScore = 0;
const history = Array(5).fill('-');
let difficulty = 'easy';

function setDifficulty() {
    difficulty = document.getElementById('difficulty').value;
}

function play(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = getResult(playerChoice, computerChoice);
    updateScores(result);
    updateHistory(playerChoice, computerChoice, result);
}

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    if (difficulty === 'easy') {
        return choices[Math.floor(Math.random() * 3)];
    } else if (difficulty === 'medium') {
        // Slightly more strategic
        return choices[Math.floor(Math.random() * 3)];
    } else {
        // Hard mode: Predictive choice
        // For simplicity, we'll still use random choices, but you can add logic here
        return choices[Math.floor(Math.random() * 3)];
    }
}

function getResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        tieScore++;
        return "It's a tie!";
    }
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        playerScore++;
        return "You win!";
    }
    computerScore++;
    return "You lose!";
}

function updateScores(result) {
    document.getElementById('player-score').innerText = playerScore;
    document.getElementById('computer-score').innerText = computerScore;
    document.getElementById('tie-score').innerText = tieScore;
}

function updateHistory(playerChoice, computerChoice, result) {
    const timestamp = new Date().toLocaleTimeString();
    history.pop();
    history.unshift(`(${timestamp}) You chose ${playerChoice}, Computer chose ${computerChoice}: ${result}`);
    const historyList = document.getElementById('history');
    historyList.innerHTML = history.map((entry, index) => `<li>Game ${index + 1}: ${entry}</li>`).join('');
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    tieScore = 0;
    history.fill('-');
    document.getElementById('player-score').innerText = playerScore;
    document.getElementById('computer-score').innerText = computerScore;
    document.getElementById('tie-score').innerText = tieScore;
    updateHistory('', '', '');
}
