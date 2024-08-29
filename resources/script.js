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

  const printBoard = function () {
    const boardWithSquares = squares.map((row) => row.map((square) => square.getMarker()));
    console.log(boardWithSquares);
  }

  const getSquares = () => squares;

  return { getSquares, printBoard, addMarker, squaresSetup };
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
  const getBoard = () => board;

  const player1 = { name: 'Sean', marker: 'X' };
  const player2 = { name: 'John', marker: 'O' };

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

  // Check if index numbers are in proper range
  const numsInRange = function (num1, num2) {
    return num1 >= 0 && num1 <= 2 && num2 >= 0 && num2 <= 2;
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

    if (numsInRange(row, col)) {
      board.addMarker(row, col, currentPlayer);
    }

    board.printBoard();

    if (checkWin(currentPlayer, row, col)) {
      console.log(`${currentPlayer.name} wins!`);
    }

    if (!checkNull()) {
      console.log('It\'s a tie!!');
    }

    switchPlayer();
  }

  const newGame = () => {
    board.squaresSetup();
    resetPlayers();
  };

  return { play, getCurrentPlayer, getPlayers, getBoard, newGame };
};

const screenSetup = function () {
  let game = Game();
  const showSquares = () => game.getBoard().getSquares();

  return { game, showSquares };
}

const screen = screenSetup();