const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF33E9', '#33F9FF', '#FFE333', '#A233FF', '#33FFA4'];
const cards = [...colors, ...colors]; // duplicate colors to create pairs
let flippedCards = [];
let matchedCards = [];
let moveCounter = 0; // Initialize move counter

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(color, index) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.color = color;
  card.dataset.index = index;
  card.addEventListener('click', handleCardClick);
  return card;
}

function handleCardClick() {
  const card = this;
  if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)) {
    card.style.backgroundColor = card.dataset.color;
    flippedCards.push(card);
    moveCounter++; // Increment move counter
    updateMoveCounter(); // Update move counter display
    if (flippedCards.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.color === card2.dataset.color) {
    matchedCards.push(card1, card2);
    card1.classList.add('matched');
    card2.classList.add('matched');
    if (matchedCards.length === cards.length) {
      alert(`Congratulations! You won the game with ${moveCounter} moves!`);
    }
  } else {
    card1.style.backgroundColor = '#ccc'; // reset color
    card2.style.backgroundColor = '#ccc'; // reset color
  }
  flippedCards = [];
}

function initGame() {
  shuffle(cards);
  const gameContainer = document.getElementById('game-container');
  cards.forEach((color, index) => {
    const card = createCard(color, index);
    gameContainer.appendChild(card);
  });
}

function updateMoveCounter() {
  const moveCounterElement = document.getElementById('move-counter');
  moveCounterElement.textContent = moveCounter;
}

initGame();
