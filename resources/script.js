/* 
Create a tic-tac-toe game.

What do you need:
  Object to add content to page:
    screenObj?
  Game flow object:
    Check if all squares are full with no winner(a tie).

    Get input from user:
      When square is pressed, get square location:
        querySelectorAll
    
  When square is clicked, get current player marker.
  Add marker to 'square' array.
  Update the screen with the content of the array after every 'play'.
*/

// Create game board.
const gameBoard = function () {
  const squares = [];
  const row = 3;
  const column = 3;

  const squaresSetup = () => {
    for (let i = 0; i < row; i++) {
      squares[i] = [];
      for (let j = 0; j < column; j++) {
        squares[i].push(Square());
      }
    }
  }

  const addMarker = function (row, col, player) {
    if (squares[row][col].getMarker()) {
      return;
    }
    squares[row][col].setMarker(player.marker);
  }

  const getSquares = () => squares;

  return { getSquares, addMarker, squaresSetup };
};

// Create individual squares
const Square = function () {
  let marker = null;

  const setMarker = (mark) => { marker = mark };
  const getMarker = () => marker;

  return { setMarker, getMarker };
}

// Logic for game play.
const Game = function () {
  const board = gameBoard();

  const player1 = { name: 'John', marker: 'X' };
  const player2 = { name: 'Sean', marker: 'O' };

  const players = [player1, player2];

  let currentPlayer = players[0];
  const switchPlayer = () => { currentPlayer = currentPlayer === players[0] ? players[1] : players[0] };
  const getCurrentPlayer = () => currentPlayer;
  const getPlayers = () => players;
  const resetPlayers = () => currentPlayer = players[0];

  // Check if any null squares remain.
  function checkNull() {
    return board.getSquares().flat().map(item => item.getMarker()).includes(null);
  }


  // Check for winner.
  const checkWin = function (player, rowIdx, colIdx) {

    const squares = board.getSquares();
    const leftDiag = squares.filter((row, index) => row[(row.length - 1) - index].getMarker() === player.marker);
    const rightDiag = squares.filter((row, index) => row[index].getMarker() === player.marker);
    const column = squares.filter(row => row[colIdx].getMarker() === player.marker);
    const row = board.getSquares()[rowIdx].filter(item => item.getMarker() === player.marker);

    return leftDiag.length === 3 || rightDiag.length === 3 || column.length === 3 || row.length === 3;
  }

  // Play Method.
  const play = (row, col) => {
    board.addMarker(row, col, currentPlayer);

    // if (checkWin(currentPlayer, row, col)) {
    //   console.log(`${currentPlayer.name} wins!`)
    // }

    // if (!checkNull) {
    //   console.log('It\'s a tie!');
    // }
  }

  const newGame = () => {
    board.squaresSetup();
    resetPlayers();
  };

  return { play, getCurrentPlayer, getPlayers, newGame, board, checkWin, checkNull, switchPlayer };
};

const screenController = (function () {
  const game = Game();
  const gameCard = document.querySelector('.gameCard');
  const newGame = document.querySelector('.newGame');

  const player1 = document.querySelector('.player1');
  const player2 = document.querySelector('.player2');

  player1.textContent = game.getPlayers()[0].name;
  player2.textContent = game.getPlayers()[1].name;

  const updateScreen = function () {
    gameCard.textContent = '';
    const letterToPlay = document.querySelector('.letterToPlay');
    letterToPlay.textContent = game.getCurrentPlayer().marker;
    const squares = game.board.getSquares();

    if (game.getCurrentPlayer().name === player1.textContent) {
      player1.classList.add('playerTurn');
      player2.classList.remove('playerTurn');
    } else {
      player1.classList.remove('playerTurn');
      player2.classList.add('playerTurn');
    }

    for (let i = 0; i < squares.length; i++) {
      const row = document.createElement('div');
      row.classList.add('row');
      for (let j = 0; j < squares[i].length; j++) {
        const marker = squares[i][j].getMarker();
        const cell = document.createElement('button');
        cell.classList.add('cell');
        cell.classList.add('emptyCell');
        cell.setAttribute('data-row', i);
        cell.setAttribute('data-cell', j);

        cell.addEventListener('click', () => clickHandler(cell.dataset.row, cell.dataset.cell))

        if (marker) {
          cell.textContent = marker;
          cell.classList.remove('emptyCell');
        }
        row.appendChild(cell);
      }
      gameCard.appendChild(row);
    }
  }

  const clickHandler = function (row, cell) {
    game.play(row, cell);

    game.switchPlayer();
    updateScreen();


    // if (game.checkWin(game.getCurrentPlayer(), row, cell)) {
    //   console.log(`${game.getCurrentPlayer().name} wins!`)
    // } else if (!game.checkNull()) {
    //   console.log('It\'s a tie!');
    // }

  }

  newGame.addEventListener('click', () => { game.newGame(); updateScreen() })

})();