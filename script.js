let playerScore = 0;
let computerScore = 0;
let tieScore = 0;
let gamesPlayed = 0;
let totalWins = 0;
let totalLosses = 0;
let maxRounds = 1;
const history = Array(5).fill('-');
const leaderboard = Array(5).fill('No entries');
let difficulty = 'easy';
let mode = 'single';
const choices = ['rock', 'paper', 'scissors'];
const profiles = {};

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

function setProfile() {
    const selectedProfile = document.getElementById('profile').value;
    if (profiles[selectedProfile]) {
        playerScore = profiles[selectedProfile].playerScore;
        computerScore = profiles[selectedProfile].computerScore;
        tieScore = profiles[selectedProfile].tieScore;
        gamesPlayed = profiles[selectedProfile].gamesPlayed;
        totalWins = profiles[selectedProfile].totalWins;
        totalLosses = profiles[selectedProfile].totalLosses;
        updateScores();
        updateHistory();
    }
}

function createProfile() {
    const profileName = prompt("Enter profile name:");
    if (profileName && !profiles[profileName]) {
        profiles[profileName] = {
            playerScore: 0,
            computerScore: 0,
            tieScore: 0,
            gamesPlayed: 0,
            totalWins: 0,
            totalLosses: 0
        };
        const profileSelect = document.getElementById('profile');
        const option = document.createElement('option');
        option.value = profileName;
        option.text = profileName;
        profileSelect.add(option);
        profileSelect.value = profileName;
        setProfile();
    } else if (profileName) {
        alert("Profile already exists.");
    }
}

function play(playerChoice) {
    if (gamesPlayed >= maxRounds) {
        document.getElementById('result').innerText = "Game over! Please reset to start a new game.";
        return;
    }
    let opponentChoice;
    if (mode === 'single') {
        opponentChoice = getComputerChoice();
    } else {
        opponentChoice = prompt("Player 2, enter your choice (rock, paper, scissors):").toLowerCase();
        if (!choices.includes(opponentChoice)) {
            alert("Invalid choice by Player 2. Please choose rock, paper, or scissors.");
            return;
        }
    }
    const result = getResult(playerChoice, opponentChoice);
    updateScores(result);
    updateHistory(playerChoice, opponentChoice, result);
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
    history.pop();
    history.unshift(`Player: ${playerChoice} | Computer: ${opponentChoice} | Result: ${result}`);
    document.getElementById('history').innerHTML = history.map((entry, index) => `<li>Game ${index + 1}: ${entry}</li>`).join('');
}

function updateLeaderboard() {
    leaderboard.sort((a, b) => b.score - a.score);
    document.getElementById('leaderboard').innerHTML = leaderboard.map((entry, index) => `<li>${index + 1}. ${entry.name} - ${entry.score}</li>`).join('');
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    tieScore = 0;
    gamesPlayed = 0;
    totalWins = 0;
    totalLosses = 0;
    document.getElementById('player-score').innerText = playerScore;
    document.getElementById('computer-score').innerText = computerScore;
    document.getElementById('tie-score').innerText = tieScore;
    document.getElementById('games-played').innerText = gamesPlayed;
    document.getElementById('total-wins').innerText = totalWins;
    document.getElementById('total-losses').innerText = totalLosses;
    updateHistory('', '', '');
}
