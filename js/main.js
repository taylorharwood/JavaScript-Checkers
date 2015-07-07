console.log('activate framework!');

var board = [[null, null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null, null],
            ];

function Piece(team, coordinates) {
  this.team = team;
  this.coordinates = coordinates;
}

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

var clearBoard = function() {
  for(var i = 0; i < board.length; i++) {
    for(var j = 0; j < board[i].length; j++) {
      board[i][j] = null;
    }
  }

  return board;
}

var printBoard = function() {
  for(var i =  0; i < board.length; i++) {
    var output = "";

    for(var j = 0; j < board[i].length; j++) {
      if (board[i][j] === null) {
        output += "_ ";
      } else {
        output += board[i][j] + " ";
      }
    }

    console.log(output);
  }

  return 1;
}

// PUT ALL OF THE DOM STUFF IN THE $(function() {}) jQuery function ready code
// NO MIXING GAME MODEL AND DOM STUFF AT ALL.

$(".board").on("click", ".block", function() {
  getSelectedPiece($(this));
});

var getSelectedPiece = function(clicked) {
  var clickedSquare = clicked.attr('id');
  var coordinates = clickedSquare.split(',');

  var selectedPiece = board[coordinates[0]][coordinates[1]];
  console.log(selectedPiece);
  return selectedPiece;
}

var getPossibleMoves = function() {
  var possibleMoves = [];
  var selectedPiece = getSelectedPiece();
  var coordinates = selectedPiece.coordinates;
  if (selectedPiece.team === "W") {
    possibleMoves.push(selectedPiece.coord)
  } else {

  }
  var possibilities = [];
}






