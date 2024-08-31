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
    squares[row][col].setMarker(player.getMarker());
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
  const getSquares = () => board.getSquares();

  const players = [];

  const Players = function (name) {
    const marker = players.length < 1 ? 'X' : 'O';
    let wins = 0;
    const info = document.querySelector(`.player${players.length + 1}`);
    const showWins = document.querySelector(`.player${players.length + 1}Wins`);

    const getName = () => name;
    const getMarker = () => marker;
    const getWins = () => wins;
    const incWins = () => wins++;
    const resetWins = () => wins = 0;
    const getInfo = () => info;
    const getShowWins = () => showWins;

    return { getName, getMarker, getWins, incWins, resetWins, getInfo, getShowWins };
  }

  players.push(Players(prompt('Player 1 name: ')));
  players.push(Players(prompt('Player 2 name: ')));

  // const player1 = {
  //   name: 'John',
  //   marker: 'X',
  //   wins: 0,
  //   info: document.querySelector('.player1'),
  //   showWins: document.querySelector('.player1Wins'),
  // };
  // const player2 = {
  //   name: 'Sean',
  //   marker: 'O',
  //   wins: 0,
  //   info: document.querySelector('.player2'),
  //   showWins: document.querySelector('.player2Wins'),
  // };

  // const players = [player1, player2];

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
    const leftDiag = squares.filter((row, index) => row[(row.length - 1) - index].getMarker() === player.getMarker());
    const rightDiag = squares.filter((row, index) => row[index].getMarker() === player.getMarker());
    const column = squares.filter(row => row[colIdx].getMarker() === player.getMarker());
    const row = board.getSquares()[rowIdx].filter(item => item.getMarker() === player.getMarker());

    return leftDiag.length === 3 || rightDiag.length === 3 || column.length === 3 || row.length === 3;
  }

  // Play Method.
  const play = (row, col) => {
    board.addMarker(row, col, currentPlayer);
  }

  const newGame = () => {
    board.squaresSetup();
    resetPlayers();
  };

  return { play, getCurrentPlayer, getPlayers, newGame, getSquares, checkWin, checkNull, switchPlayer };
};

const screenController = (function () {
  const game = Game();
  const gameCard = document.querySelector('.gameCard');
  const newGame = document.querySelector('.newGame');
  const playAgain = document.querySelector('.playAgain');

  const player1 = game.getPlayers()[0];
  const player2 = game.getPlayers()[1];

  player1.getInfo().textContent = player1.getName();
  player1.getShowWins().textContent = player1.getWins();
  player2.getInfo().textContent = player2.getName();
  player2.getShowWins().textContent = player2.getWins();

  playAgain.setAttribute('disabled', '');

  const updateScreen = function () {
    gameCard.textContent = '';
    const letterToPlay = document.querySelector('.letterToPlay');
    letterToPlay.textContent = game.getCurrentPlayer().getMarker();
    const squares = game.getSquares();

    if (game.getCurrentPlayer().getName() === player1.getName()) {
      player1.getInfo().classList.add('playerTurn');
      player2.getInfo().classList.remove('playerTurn');
    } else {
      player1.getInfo().classList.remove('playerTurn');
      player2.getInfo().classList.add('playerTurn');
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

  const updateWins = () => game.getPlayers().forEach(item => item.getShowWins().textContent = item.getWins());

  const clickHandler = function (row, cell) {
    game.play(row, cell);

    if (game.checkWin(game.getCurrentPlayer(), row, cell)) {
      game.getCurrentPlayer().incWins();
      updateWins();
      playAgain.disabled = false;

      console.log(`${game.getCurrentPlayer().getName()} wins!`)
    } else if (!game.checkNull()) {
      console.log('It\'s a tie!');
    }

    game.switchPlayer();
    updateScreen();
  }

  newGame.addEventListener('click', () => {
    player1.resetWins();
    player2.resetWins();
    game.newGame();
    playAgain.disabled = true;
    updateWins();
    updateScreen();
  })

  playAgain.addEventListener('click', () => {
    game.newGame();
    updateScreen();
    playAgain.disabled = true;
  });

})();

// const playersArr = [];

// const Players = function (name) {
//   const marker = playersArr.length < 1 ? 'X' : 'O';
//   let wins = 0;
//   const info = document.querySelector(`.player${playersArr.length + 1}`);
//   const showWins = document.querySelector(`.player${playersArr.length + 1}Wins`);

//   const getName = () => name;
//   const getMarker = () => marker;
//   const getWins = () => wins;
//   const resetWins = () => wins = 0;
//   const getInfo = () => info;
//   const getShowWins = () => showWins;

//   return { getName, getMarker, getWins, resetWins, getInfo, getShowWins };
// }

// playersArr.push(Players(prompt('Player 1 Name: ')));
// playersArr.push(Players(prompt('Player 2 Name: ')));

// const player1 = playersArr[0];
// const player2 = playersArr[1];