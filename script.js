let playerScore = 0;
let computerScore = 0;
let tieScore = 0;
let gamesPlayed = 0;
let totalWins = 0;
let totalLosses = 0;
const history = Array(5).fill('-');
const leaderboard = Array(5).fill('No entries');
let difficulty = 'easy';
let mode = 'single';
const choices = ['rock', 'paper', 'scissors'];

function setDifficulty() {
    difficulty = document.getElementById('difficulty').value;
}

function setTheme() {
    const theme = document.getElementById('theme').value;
    document.body.className = theme;
}

function setGameMode() {
    mode = document.getElementById('mode').value;
}

function addCustomChoice() {
    const customChoice = document.getElementById('custom-choice').value.trim().toLowerCase();
    if (customChoice && !choices.includes(customChoice)) {
        choices.push(customChoice);
    }
    document.getElementById('custom-choice').value = '';
}

function play(playerChoice) {
    if (mode === 'single') {
        const computerChoice = getComputerChoice();
        const result = getResult(playerChoice, computerChoice);
        updateScores(result);
    } else {
        // Multiplayer mode: Prompt the second player for their choice
        const computerChoice = prompt("Player 2, enter your choice (rock, paper, scissors):").toLowerCase();
        if (choices.includes(computerChoice)) {
            const result = getResult(playerChoice, computerChoice);
            updateScores(result);
        } else {
            alert("Invalid choice by Player 2. Please choose rock, paper, or scissors.");
        }
    }
    updateHistory(playerChoice, mode === 'single' ? getComputerChoice() : computerChoice, result);
    updateLeaderboard();
    gamesPlayed++;
    document.getElementById('games-played').innerText = gamesPlayed;
}

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getResult(playerChoice, opponentChoice) {
    if (playerChoice === opponentChoice) {
        tieScore++;
        return "It's a tie!";
    }
    if (
        (playerChoice === 'rock' && opponentChoice === 'scissors') ||
        (playerChoice === 'paper' && opponentChoice === 'rock') ||
        (playerChoice === 'scissors' && opponentChoice === 'paper')
    ) {
        playerScore++;
        totalWins++;
        return "You win!";
    }
    computerScore++;
    totalLosses++;
    return "You lose!";
}

function updateScores(result) {
    document.getElementById('player-score').innerText = playerScore;
    document.getElementById('computer-score').innerText = computerScore;
    document.getElementById('tie-score').innerText = tieScore;
    document.getElementById('total-wins').innerText = totalWins;
    document.getElementById('total-losses').innerText = totalLosses;
}

function updateHistory(playerChoice, opponentChoice, result) {
    const timestamp = new Date().toLocaleTimeString();
    history.pop();
    history.unshift(`(${timestamp}) You chose ${playerChoice}, Opponent chose ${opponentChoice}: ${result}`);
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
    gamesPlayed = 0;
    totalWins = 0;
    totalLosses = 0;
    history.fill('-');
    document.getElementById('player-score').innerText = playerScore;
    document.getElementById('computer-score').innerText = computerScore;
    document.getElementById('tie-score').innerText = tieScore;
    document.getElementById('games-played').innerText = gamesPlayed;
    document.getElementById('total-wins').innerText = totalWins;
    document.getElementById('total-losses').innerText = totalLosses;
    updateHistory('', '', '');
}
