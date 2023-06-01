const winningCombination = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

const displays = document.querySelectorAll('.display');
const winningMessage = document.getElementById('winningmessage');
const winningMessageText = document.getElementById('winningmessagetext');
const restart = document.getElementById('restartbutton');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameStarted = false;

restart.addEventListener('click', startGame);
displays.forEach(display => display.addEventListener('click', handleCellClick));

function startGame() {
  resetBoard();
  const chosenSymbol = prompt("Choose X or O:");
  if (chosenSymbol && (chosenSymbol.toUpperCase() === 'X' || chosenSymbol.toUpperCase() === 'O')) {
    currentPlayer = chosenSymbol.toUpperCase();
    gameStarted = true;
    displays.forEach(display => {
      display.innerHTML = '';
      display.classList.remove('occupied');
    });
  }
}

function resetBoard() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
}

function endGame(winner) {
  gameStarted = false;
  winningMessageText.innerText = winner ? `Player ${winner} wins!` : "It's a draw!";
}

function checkWin() {
  for (let i = 0; i < winningCombination.length; i++) {
    const [a, b, c] = winningCombination[i];
    if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }
  return null;
}

function handleCellClick() {
  if (!gameStarted || this.classList.contains('occupied')) return;
  const cellIndex = parseInt(this.dataset.index);
  if (gameBoard[cellIndex] !== '') return;
  gameBoard[cellIndex] = currentPlayer;
  this.innerHTML = currentPlayer;
  this.classList.add('occupied');
  const winner = checkWin();
  if (winner) {
    endGame(winner);
  } else if (gameBoard.every(cell => cell !== '')) {
    endGame(null);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}
