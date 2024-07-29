let playerScore = 0;
let computerScore = 0;
let tieScore = 0;
const history = Array(5).fill('-');
const leaderboard = Array(5).fill('No entries');
let difficulty = 'easy';
const choices = ['rock', 'paper', 'scissors'];

function setDifficulty() {
    difficulty = document.getElementById('difficulty').value;
}

function setTheme() {
    const theme = document.getElementById('theme').value;
    document.body.className = theme;
}

function addCustomChoice() {
    const customChoice = document.getElementById('custom-choice').value.trim().toLowerCase();
    if (customChoice && !choices.includes(customChoice)) {
        choices.push(customChoice);
    }
    document.getElementById('custom-choice').value = '';
}

function play(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = getResult(playerChoice, computerChoice);
    updateScores(result);
    updateHistory(playerChoice, computerChoice, result);
    updateLeaderboard();
}

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
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

function updateLeaderboard() {
    const scores = leaderboard.map(entry => parseInt(entry.split(':')[0], 10) || 0);
    scores.push(playerScore);
    scores.sort((a, b) => b - a);
    scores.length = 5; // Limit to top 5
    leaderboard.length = 5;
    leaderboard.forEach((_, index) => {
        document.getElementById('leaderboard').children[index].innerText = `${index + 1}. ${scores[index]} wins`;
    });
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
