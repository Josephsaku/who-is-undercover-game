document.addEventListener('DOMContentLoaded', () => {
    // Get all necessary DOM elements
    const screens = {
        setup: document.getElementById('setup-section'),
        cards: document.getElementById('cards-section'),
        vote: document.getElementById('vote-section'),
        result: document.getElementById('result-section')
    };
    
    const startBtn = document.getElementById('start-btn');
    const playerTurnText = document.getElementById('player-turn');
    const cardElement = document.querySelector('.card');
    const cardBack = document.querySelector('.card-back');
    const nextPlayerBtn = document.getElementById('next-player-btn');
    const killerSelect = document.getElementById('killer-select');
    const revealBtn = document.getElementById('reveal-btn');
    const resultMessage = document.getElementById('result-message');
    const finalCardsContainer = document.getElementById('final-cards');
    const restartBtn = document.getElementById('restart-btn');

    // ENGLISH Word Bank
    const wordPairs = [
        { civilian: "Apple", undercover: "Orange" },
        { civilian: "Coffee", undercover: "Tea" },
        { civilian: "Laptop", undercover: "Tablet" },
        { civilian: "Chair", undercover: "Sofa" },
        { civilian: "River", undercover: "Ocean" },
        { civilian: "Dog", undercover: "Cat" },
        { civilian: "Book", undercover: "Magazine" },
        { civilian: "Guitar", undercover: "Violin" }
    ];

    // Game state variables
    let players;
    let currentPlayer;

    // Core function: Switch screens
    function showScreen(screenName) {
        for (let key in screens) {
            screens[key].classList.add('hidden');
        }
        screens[screenName].classList.remove('hidden');
    }

    // Core function: Start a new game
    function startGame() {
        players = [];
        currentPlayer = 1;
        
        const wordPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
        const undercoverIndex = Math.floor(Math.random() * 3);
        
        for (let i = 0; i < 3; i++) {
            const isUndercover = (i === undercoverIndex);
            players.push({
                id: i + 1,
                word: isUndercover ? wordPair.undercover : wordPair.civilian,
                role: isUndercover ? 'Undercover' : 'Civilian'
            });
        }
        
        console.log("This round's cards:", players);

        cardElement.classList.remove('is-flipped');
        killerSelect.value = '';
        prepareTurn();
        showScreen('cards');
    }
    
    // Core function: Prepare the UI for the current player's turn
    function prepareTurn() {
        const player = players[currentPlayer - 1];
        playerTurnText.textContent = `Player ${player.id}, view your card`;
        
        cardBack.innerHTML = `
            <h2>${player.role}</h2>
            <h1>${player.word}</h1>
        `;
        
        nextPlayerBtn.textContent = (currentPlayer === 3) ? 'Done Viewing, Start Discussion' : 'Done Viewing, Pass to Next Player';
        nextPlayerBtn.disabled = true;
    }
    
    // Flip the card
    function flipCard() {
        if (!cardElement.classList.contains('is-flipped')) {
            cardElement.classList.add('is-flipped');
            nextPlayerBtn.disabled = false;
        }
    }

    // Handle the logic for the next player
    function handleNextPlayer() {
        nextPlayerBtn.disabled = true;
        cardElement.classList.remove('is-flipped');

        setTimeout(() => {
            if (currentPlayer < 3) {
                currentPlayer++;
                prepareTurn();
            } else {
                showScreen('vote');
            }
        }, 800);
    }

    // Reveal the final result
    function revealResult() {
        const votedPlayerId = parseInt(killerSelect.value);
        if (!votedPlayerId) {
            alert('Please select a player!');
            return;
        }

        const undercover = players.find(p => p.role === 'Undercover');
        resultMessage.textContent = (votedPlayerId === undercover.id) ? 'Civilians Win! The Undercover has been found!' : 'Undercover Wins! You caught the wrong person.';
        
        finalCardsContainer.innerHTML = '';
        players.forEach(player => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('final-card');
            if (player.role === 'Undercover') {
                cardDiv.classList.add('undercover');
            }
            cardDiv.innerHTML = `<strong>Player ${player.id}: ${player.role}</strong> (${player.word})`;
            finalCardsContainer.appendChild(cardDiv);
        });

        showScreen('result');
    }

    // Event Listeners
    startBtn.addEventListener('click', startGame);
    cardElement.addEventListener('click', flipCard);
    nextPlayerBtn.addEventListener('click', handleNextPlayer);
    revealBtn.addEventListener('click', revealResult);
    restartBtn.addEventListener('click', () => showScreen('setup'));

    // Show the main menu on initial load
    showScreen('setup');
});
