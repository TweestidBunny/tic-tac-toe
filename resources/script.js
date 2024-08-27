/* 
Create a tic-tac-toe game.

What do you need:
  Object to add content to page:
    screenObj?
  Game flow object:
    Check for win.
    Check if selected square already has content.
    Switch between Player1 and Player2.
    Check if all squares are full with no winner(a tie).

    Get input from user:
      When square is pressed, get square location:
        querySelectorAll
    
  When square is clicked, get current player marker.
  Add marker to 'square' array.
  Update the screen with the content of the array after every 'play'.

  Keep track of turns:
    Create function to increase turn counter.
    Create function to reset turn counter on new game.
    Create function to retrieve turn counter.

    Create 'currentPlayer' variable, tied to player1 or player2 based on turn count.
    Create method to increase turn count, add currentPlayer marker to array.

    addMarker move to gameFlow from players.
*/

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
  const { addMarker } = gameBoard;
  const getName = () => name;
  const getMarker = () => marker;

  return { addMarker, getName, getMarker };
}

const player1 = players('Sean', 'X');
const player2 = players('John', 'O');