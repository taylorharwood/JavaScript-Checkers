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

var setPiece = function(row, col, player) {
  board[row-1][col-1] = player;
  return board;
}

//Sets Up Black.
var setBlack = function() {
  for(var i = 0; i < 3; i++) {
    if (i % 2 === 0) {
      for(var j = 0; j < board[i].length; j += 2) {
        board[i][j] = "B";
      }
    } else {
        for(var j = 1; j < board[i].length; j += 2) {
          board[i][j] = "B";
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
          board[i][j] = "W";
        }
      } else {
          for(var j = 1; j < board[i].length; j += 2) {
            board[i][j] = "W";
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

// PUT ALL OF THE DOM STUFF IN THE $(function() {}) jQuery function ready code
// NO MIXING GAME MODEL AND DOM STUFF AT ALL.

$(".board").on("click", ".block", function() {
  console.log($(this));
  selectPiece($(this));
});

var selectPiece = function(clicked) {
  var clickedSquare = clicked.attr('id');
  var coordinates = clickedSquare.split(',');
  board[coordinates[0]][coordinates[1]] = "B";
  console.log(clickedSquare);
}




