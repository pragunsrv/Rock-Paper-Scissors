let playerScore = 0;
let computerScore = 0;
let tieScore = 0;
let gamesPlayed = 0;
let totalWins = 0;
let totalLosses = 0;
let maxRounds = 1;
const history = Array(5).fill('-');
const leaderboard = Array(5).fill({ name: 'No entries', score: 0 });
const profiles = {};
let difficulty = 'easy';
let mode = 'single';
const choices = ['rock', 'paper', 'scissors'];

function setDifficulty() {
    difficulty = document.getElementById('difficulty').value;
}

function setTheme() {
    const theme = document.getElementById('theme').value;
    if (theme === 'custom') {
        document.querySelector('.custom-theme').style.display = 'block';
    } else {
        document.querySelector('.custom-theme').style.display = 'none';
        document.body.className = theme;
    }
}

function applyCustomTheme() {
    const backgroundColor = document.getElementById('custom-background').value;
    const textColor = document.getElementById('custom-text').value;
    document.documentElement.style.setProperty('--bg-color', backgroundColor);
    document.documentElement.style.setProperty('--text-color', textColor);
    document.body.className = 'custom';
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
        updateStatistics();
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
        updateProfileSelect();
        setProfile();
    } else if (profileName) {
        alert("Profile already exists.");
    }
}

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

function deleteProfile() {
    const profileName = prompt("Enter profile name to delete:");
    if (profiles[profileName]) {
        delete profiles[profileName];
        updateProfileSelect();
        if (Object.keys(profiles).length > 0) {
            setProfile();
        } else {
            playerScore = 0;
            computerScore = 0;
            tieScore = 0;
            gamesPlayed = 0;
            totalWins = 0;
            totalLosses = 0;
            updateScores();
            updateHistory();
            updateStatistics();
        }
    } else {
        alert("Profile does not exist.");
    }
}

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
}

function updateScores() {
    document.getElementById('player-score').innerText = playerScore;
    document.getElementById('computer-score').innerText = computerScore;
    document.getElementById('tie-score').innerText = tieScore;
    document.getElementById('games-played').innerText = gamesPlayed;
    document.getElementById('total-wins').innerText = totalWins;
    document.getElementById('total-losses').innerText = totalLosses;
}

function updateHistory(playerChoice = '', computerChoice = '', result = '') {
    history.pop();
    history.unshift(`Player: ${playerChoice} | Computer: ${computerChoice} | Result: ${result}`);
    document.getElementById('history').innerHTML = history.map((entry, index) => `<li>Game ${index + 1}: ${entry}</li>`).join('');
}

function updateStatistics() {
    const avgScore = gamesPlayed > 0 ? playerScore / gamesPlayed : 0;
    const avgWins = gamesPlayed > 0 ? totalWins / gamesPlayed : 0;
    const avgLosses = gamesPlayed > 0 ? totalLosses / gamesPlayed : 0;
    
    document.getElementById('avg-score').innerText = avgScore.toFixed(2);
    document.getElementById('avg-wins').innerText = avgWins.toFixed(2);
    document.getElementById('avg-losses').innerText = avgLosses.toFixed(2);
}

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
}
