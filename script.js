let playerScore = 0;
let computerScore = 0;
let tieScore = 0;
let gamesPlayed = 0;
let totalWins = 0;
let totalLosses = 0;
let maxRounds = 1;
let numMoves = 3;
let choices = ['rock', 'paper', 'scissors'];
const history = Array(5).fill('-');
const leaderboard = Array(5).fill({ name: 'No entries', score: 0 });
const profiles = {};
let difficulty = 'easy';
let mode = 'single';
let customBackground = '#f0f0f0';
let customText = '#000';

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    updateProfileSelect();
    setProfile();
    setGameSettings();
    setTheme();
});

// Set difficulty level
function setDifficulty() {
    difficulty = document.getElementById('difficulty').value;
}

// Set game mode (single or multiplayer)
function setGameMode() {
    mode = document.getElementById('mode').value;
}

// Set number of moves and choices
function setGameSettings() {
    numMoves = parseInt(document.getElementById('num-moves').value, 10);
    choices = document.getElementById('move-names').value.split(',').map(choice => choice.trim());
    if (choices.length < 3) choices = ['rock', 'paper', 'scissors']; // Default values
    createMoveButtons();
}

// Create buttons for each move
function createMoveButtons() {
    const buttonsContainer = document.querySelector('.buttons');
    buttonsContainer.innerHTML = '';
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.charAt(0).toUpperCase() + choice.slice(1);
        button.onclick = () => play(choice);
        buttonsContainer.appendChild(button);
    });
}

// Set profile to play with
function setProfile() {
    const selectedProfile = document.getElementById('profile').value;
    if (profiles[selectedProfile]) {
        const p = profiles[selectedProfile];
        playerScore = p.playerScore;
        computerScore = p.computerScore;
        tieScore = p.tieScore;
        gamesPlayed = p.gamesPlayed;
        totalWins = p.totalWins;
        totalLosses = p.totalLosses;
        updateScores();
        updateHistory();
        updateStatistics();
        updateProfileStats();
    }
}

// Create new profile
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
        updateProfileSelect();
        setProfile();
    } else if (profileName) {
        alert("Profile already exists.");
    }
}

// Edit an existing profile
function editProfile() {
    const profileName = prompt("Enter profile name to edit:");
    if (profiles[profileName]) {
        const newName = prompt("Enter new profile name:");
        if (newName && !profiles[newName]) {
            profiles[newName] = profiles[profileName];
            delete profiles[profileName];
            updateProfileSelect();
            setProfile();
        } else if (newName) {
            alert("Profile already exists or invalid name.");
        }
    } else {
        alert("Profile does not exist.");
    }
}

// Delete an existing profile
function deleteProfile() {
    const profileName = prompt("Enter profile name to delete:");
    if (profiles[profileName]) {
        delete profiles[profileName];
        updateProfileSelect();
        if (Object.keys(profiles).length > 0) {
            setProfile();
        } else {
            resetGame();
        }
    } else {
        alert("Profile does not exist.");
    }
}

// Update profile select dropdown
function updateProfileSelect() {
    const profileSelect = document.getElementById('profile');
    profileSelect.innerHTML = '';
    Object.keys(profiles).forEach(profile => {
        const option = document.createElement('option');
        option.value = profile;
        option.textContent = profile;
        profileSelect.appendChild(option);
    });
    if (Object.keys(profiles).length === 0) {
        profileSelect.innerHTML = '<option>No profiles</option>';
    }
}

// Play a round of the game
function play(playerChoice) {
    if (!choices.includes(playerChoice)) {
        alert("Invalid choice.");
        return;
    }

    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = '';
    
    if (playerChoice === computerChoice) {
        result = 'Tie';
        tieScore++;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'Player Wins';
        playerScore++;
        totalWins++;
    } else {
        result = 'Computer Wins';
        computerScore++;
        totalLosses++;
    }
    
    gamesPlayed++;
    updateScores();
    updateHistory(playerChoice, computerChoice, result);
    updateStatistics();
    if (mode === 'multiplayer') {
        updateLeaderboard();
    }
}

// Update scores display
function updateScores() {
    document.getElementById('player-score').innerText = playerScore;
    document.getElementById('computer-score').innerText = computerScore;
    document.getElementById('tie-score').innerText = tieScore;
    document.getElementById('games-played').innerText = gamesPlayed;
    document.getElementById('total-wins').innerText = totalWins;
    document.getElementById('total-losses').innerText = totalLosses;
}

// Update match history display
function updateHistory(playerChoice = '', computerChoice = '', result = '') {
    history.pop();
    history.unshift(`Player: ${playerChoice} | Computer: ${computerChoice} | Result: ${result}`);
    document.getElementById('history').innerHTML = history.map((entry, index) => `<li>Game ${index + 1}: ${entry}</li>`).join('');
}

// Update statistics display
function updateStatistics() {
    const avgScore = gamesPlayed > 0 ? playerScore / gamesPlayed : 0;
    const avgWins = gamesPlayed > 0 ? totalWins / gamesPlayed : 0;
    const avgLosses = gamesPlayed > 0 ? totalLosses / gamesPlayed : 0;
    
    document.getElementById('avg-score').innerText = avgScore.toFixed(2);
    document.getElementById('avg-wins').innerText = avgWins.toFixed(2);
    document.getElementById('avg-losses').innerText = avgLosses.toFixed(2);
}

// Export game statistics to CSV
function exportStats() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Profile,Player Score,Computer Score,Ties,Games Played,Total Wins,Total Losses\n";
    Object.keys(profiles).forEach(profile => {
        const p = profiles[profile];
        csvContent += `${profile},${p.playerScore},${p.computerScore},${p.tieScore},${p.gamesPlayed},${p.totalWins},${p.totalLosses}\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "game_statistics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Reset the game state
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    tieScore = 0;
    gamesPlayed = 0;
    totalWins = 0;
    totalLosses = 0;
    updateScores();
    updateHistory();
    updateStatistics();
    updateLeaderboard();
}

// Update profile statistics display
function updateProfileStats() {
    const selectedProfile = document.getElementById('profile').value;
    if (profiles[selectedProfile]) {
        const p = profiles[selectedProfile];
        document.getElementById('profile-stats').innerText = `
            Player Score: ${p.playerScore}
            Computer Score: ${p.computerScore}
            Ties: ${p.tieScore}
            Games Played: ${p.gamesPlayed}
            Total Wins: ${p.totalWins}
            Total Losses: ${p.totalLosses}
        `;
    }
}

// Update leaderboard
function updateLeaderboard() {
    const leaderboardData = Object.keys(profiles).map(profile => {
        const p = profiles[profile];
        return {
            name: profile,
            score: p.totalWins - p.totalLosses
        };
    }).sort((a, b) => b.score - a.score).slice(0, 5);

    for (let i = 0; i < 5; i++) {
        document.getElementById('leaderboard').children[i].innerText = `${i + 1}. ${leaderboardData[i] ? `${leaderboardData[i].name} (${leaderboardData[i].score})` : 'No entries'}`;
    }
}

// Set and apply selected theme
function setTheme() {
    const theme = document.getElementById('theme').value;
    document.body.className = theme;
    document.querySelector('.custom-theme').style.display = theme === 'custom' ? 'block' : 'none';
}

// Apply custom theme
function applyCustomTheme() {
    customBackground = document.getElementById('custom-background').value;
    customText = document.getElementById('custom-text').value;
    document.documentElement.style.setProperty('--bg-color', customBackground);
    document.documentElement.style.setProperty('--text-color', customText);
}

// Initialize game settings and profiles
function initializeGame() {
    setDifficulty();
    setGameMode();
    setGameSettings();
    updateProfileSelect();
    updateScores();
    updateHistory();
    updateStatistics();
    updateProfileStats();
    updateLeaderboard();
}

initializeGame();
