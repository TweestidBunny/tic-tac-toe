/* 
Create a tic-tac-toe game.

What do you need:
  Game Board to hold an array for the squares:
    Created with Module/IIFE
  Player objects:
    Created using a Module.
  Object to add content to page:
    screenObj?
  Game flow object:
    Check for win.
    Check if selected square already has content.
    Switch between Player1 and Player2.
    Check if all squares are full with no winner(a tie).
*/

const gameBoard = (function () {
  const squares = [];
  for (let i = 0; i < 9; i++) {
    squares.push(null);
  }

  const getSquares = () => squares;
  const clearSquares = function () {
    for (let i = 0; i < 9; i++) {
      squares[i] = null;
    }
  }
  const addMarker = function (index, marker) {
    squares[index] = marker;
  }
  return { getSquares, clearSquares, addMarker };
})();