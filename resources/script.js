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
const gameBoard = (function () {
  const squares = [];

  const makeSquares = function () {
    for (let i = 0; i < 3; i++) {
      squares.push([])
      for (let j = 0; j < 3; j++) {
        squares[i].push(null);
      }
    }
  }

  const getSquares = () => squares;
  const addMarker = function (index1, index2, marker) {
    squares[index1][index2] = marker;
  }
  return { getSquares, makeSquares, addMarker };
})();

const players = function (name, marker) {
  let wins = 0;

  const { addMarker } = gameBoard;
  const getName = () => name;
  const getMarker = () => marker;
  const incWins = () => wins++;
  const getWins = () => wins;
  const clearWins = () => wins = 0;

  return { addMarker, getName, getMarker, incWins, getWins, clearWins };
}

// Logic for game play.
const gameFlow = (function () {
  let turns = 0;

  const player1 = players('Sean', 'X');
  const player2 = players('John', 'O');

  let currentPlayer = player1;

  // Change current player based on turn
  const playerTurn = function () {
    currentPlayer = turns % 2 ? player2 : player1;
  }

  // Check if index numbers are in proper range
  const numsInRange = function (num1, num2) {
    return num1 >= 0 && num1 <= 2 && num2 >= 0 && num2 <= 2;
  }

  // Play Method
  const play = function (index1, index2) {
    const marker = currentPlayer.getMarker();
    const board = gameBoard.getSquares();
    const name = currentPlayer.getName();
    const checkNums = numsInRange(index1, index2);

    if (checkNums) {
      if (!board[index1][index2]) {
        currentPlayer.addMarker(index1, index2, marker);
        if (checkWin()) {
          console.log(`${name} Wins!`);
          currentPlayer.incWins();
        } else {
          turns++;
          playerTurn();
        }
      }
    }
  }

  const checkWin = function () {
    const board = gameBoard.getSquares().flat();
    const winScenario = [[1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    for (let i = 0; i < winScenario.length; i++) {
      let xCount = 0;
      let oCount = 0;
      for (let j = 0; j < winScenario[i].length; j++) {
        let ind = winScenario[i][j];
        if (board[ind - 1] === 'X') {
          xCount++;
        } else if (board[ind - 1] === 'O') {
          oCount++;
        }
      }
      if (xCount === 3 || oCount === 3) {
        return true;
      }
    }
  }

  const clearWins = () => {
    player1.clearWins();
    player2.clearWins();
  };

  const newGame = function () {
    gameBoard.makeSquares();
    turns = 0;
  }

  return { play, clearWins, newGame };
})();