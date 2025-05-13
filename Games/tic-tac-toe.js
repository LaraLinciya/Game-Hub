const board = document.getElementById('board');
const statusText = document.getElementById('status');

let currentPlayer = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Create cells
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = i;
  board.appendChild(cell);
}

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8], // Rows
  [0,3,6], [1,4,7], [2,5,8], // Columns
  [0,4,8], [2,4,6]           // Diagonals
];

function checkWin() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      gameActive = false;
      statusText.textContent = `🎉 Player ${cells[a]} Wins!`;
      return true;
    }
  }
  if (!cells.includes('')) {
    gameActive = false;
    statusText.textContent = `It's a Draw!`;
    return true;
  }
  return false;
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (!checkWin()) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

board.addEventListener('click', handleClick);
