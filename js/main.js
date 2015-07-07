console.log('activate framework!');

// For data modeling, I'll be using a nested array data structure.
// At game start, null values are inserted for all coordinates.
var board = [[null, null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null, null],
            ];

// For this project, I'm going to attempt to take an OOP approach.
// All game pieces will be objects that have two properties:
// team and coordinates. Also to be added (maybe) are methods.
function Piece(team, coordinates) {
  this.team = team;
  this.coordinates = coordinates;
}

// setPiece function adds a piece object depending on current player.
// May or may not be used in the future.
var setPiece = function(row, col, player) {
  board[row-1][col-1] = player;
  return board;
}

//Sets Up Black.
var setBlack = function() {
  for(var i = 0; i < 3; i++) {
    if (i % 2 === 0) {
      for(var j = 0; j < board[i].length; j += 2) {
        board[i][j] = new Piece("B", [i, j]);
      }
    } else {
        for(var j = 1; j < board[i].length; j += 2) {
          board[i][j] = new Piece("B", [i,j]);
        }
      }
  }

  return board;
}

// Sets Up White.
var setWhite = function() {
  for(var i = 5; i <= 7; i++) {
      if (i % 2 === 0) {
        for(var j = 0; j < board[i].length; j += 2) {
          board[i][j] = new Piece("W", [i,j]);
        }
      } else {
          for(var j = 1; j < board[i].length; j += 2) {
            board[i][j] = new Piece("W", [i,j]);
          }
        }
  }

  return board;
}

//Initializes the Board on game start up.
var setBoard = function() {
  setWhite();
  setBlack();
  return board;
}

// Clears the board...
var clearBoard = function() {
  for(var i = 0; i < board.length; i++) {
    for(var j = 0; j < board[i].length; j++) {
      board[i][j] = null;
    }
  }

  return board;
}

// Prints the board in a more readable format in the console. Needs to be
// worked on quite a bit...
var printBoard = function() {
  for(var i =  0; i < board.length; i++) {
    var output = "";

    for(var j = 0; j < board[i].length; j++) {
      if (board[i][j] === null) {
        output += "_ ";
      } else {
        output += board[i][j].team + " ";
      }
    }

    console.log(output);
  }

  return 1;
}

// PUT ALL OF THE DOM STUFF IN THE $(function() {}) jQuery function ready code
// NO MIXING GAME MODEL AND DOM STUFF AT ALL.

// Event delegation/bubbling for all blocks inside the main board div.
$(".board").on("click", ".square", function() {
  var targeted = getSelectedPiece($(this));
  if (targeted) {
    getPossibleMoves();
  } else {
    console.log("Null square selected")
  }
});

// registers where the player clicked and returns the Piece object contained
// within the clicked div.
var getSelectedPiece = function(clicked) {
  var clickedSquare = clicked.attr('id');
  var coordinates = clickedSquare.split(',');

  var selectedPiece = board[coordinates[0]][coordinates[1]];
  console.log(selectedPiece);
  return selectedPiece;
}

// will determine the set of possible legal moves based off of a player's
// selected piece...
var getPossibleMoves = function() {
  var possibleMoves = [];
  var selectedPiece = getSelectedPiece();
  var coordinates = selectedPiece.coordinates;
  if (selectedPiece.team === "W") {
    possibleMoves.push(coordinates)
  } else {

  }
  var possibilities = [];
}






