console.log('activate framework!');
var currentPlayer = 'black'; //will change each turn and help to
// determine selectable players.

// For data modeling, I'll be using a nested array data structure.
// At game start, null values are inserted for all coordinates.
var board = [
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
];

////////////////////////////////////////////////////////////////////////////////
//Piece Object and Methods//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// For this project, I'm going to attempt to take an OOP approach.
// All game pieces will be objects that have at least three properties:
// team and coordinates and selected (bool).
// Also to be added (maybe) are methods.
function Piece(team, coordinates) {
  this.team = team;
  this.coordinates = coordinates;
  this.selected = false; //will change to true upon click.
}

// will determine the set of possible legal moves based off of a player's
// selected piece...

Piece.prototype.getPossibleMoves = function() {
  var possibleMoves = [];
  if (this.team === "B") { //check for possible black moves
    possibleMoves.push([this.coordinates[0] + 1, this.coordinates[1] - 1]);
    possibleMoves.push([this.coordinates[0] + 1, this.coordinates[1] + 1]);

    //   for(var i = 0; i < possibleMoves.length; i++) {
    //     if(board[possibleMoves[i]] !== null) {
    //       checkForOpponent(possibleMoves[i]);
    //     } else {
    //       possibleMoves.splice(i, 1);
    //     }
    //   }

  } else { //check for possible white moves
    possibleMoves.push([this.coordinates[0] - 1, this.coordinates[1] - 1]);
    possibleMoves.push([this.coordinates[0] - 1, this.coordinates[1] + 1]);
  }

  return possibleMoves;
}


Piece.prototype.checkForOpponent = function() {
  // var potentialOpponent = board[possibleMove[0]][possibleMove[1]];
  // if (potentialOpponent.team !== currentPlayer) {
  //remove potentialOpponent, update score, skip the selected
  //piece to appropriate square.
}

// On click, this function resets the selected piece to the most recently
// clicked.
Piece.prototype.setSelectedPiece = function(clicked) {
  if (this.selected !== true) {
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] !== null) {
          board[i][j].selected = false;
        }
      }
    }

    if (clicked !== null) {
      this.selected = true;
      currentPlayer = this.team;
    }
  } else {
    this.selected = false;
  }
  return clicked;
};

Piece.prototype.moveSelectedPiece = function(coordinates) {
  pieceToMove = getSelectedPiece(); //get currently selected piece
  console.log(pieceToMove);
  pieceToMoveCoordinates = pieceToMove.coordinates;
  console.log(pieceToMoveCoordinates);
  console.log(pieceToMove.getPossibleMoves()[0]);
  console.log(coordinates);
  for (var i = 0; i < pieceToMove.getPossibleMoves().length; i++) {
    if (coordinates == pieceToMove.getPossibleMoves()[i]) {
      console.log("inside");
      pieceToMove.coordinates = coordinates; // change the selected piece coordinates
      board[coordinates[0]][coordinates[1]] = pieceToMove; //move the object to new coordinates.
      getSelectedPiece().selected = false;
      board[pieceToMoveCoordinates] = null;
    }
  }

  //updateVisualBoard() will update the visual board according to board 2D array.
}

////////////////////////////////////////////////////////////////////////////////
//Piece Object and Methods//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


// var updateVisualBoard = function() {
//   for (var i = 0; i < board.length; i++) {
//     for (var j = 0; j < board[i].length; j++) {
//       if (board[i][j] !== null) {
//         if (board[i][j].team === "B") {
//           var coordinate = '#' + board[i][j].coordinates.join('-');
//           var newPiece = $('<div></div>').addClass('black-piece')
//           $(coordinate).append(newPiece);
//         }
//       }
//     }
//   }
// }

// setPiece function adds a piece object depending on current player.
// May or may not be used in the future.
var setPiece = function(row, col, player) {
  board[row - 1][col - 1] = player;
  return board;
};

//Sets Up Black.
var setBlack = function() {
  for (var i = 0; i < 3; i++) {
    if (i % 2 === 0) {
      for (var j = 0; j < board[i].length; j += 2) {
        board[i][j] = new Piece("B", [i, j]);
      }
    } else {
      for (var j = 1; j < board[i].length; j += 2) {
        board[i][j] = new Piece("B", [i, j]);
      }
    }
  }

  return board;
};

// Sets Up White.
var setWhite = function() {
  for (var i = 5; i <= 7; i++) {
    if (i % 2 === 0) {
      for (var j = 0; j < board[i].length; j += 2) {
        board[i][j] = new Piece("W", [i, j]);
      }
    } else {
      for (var j = 1; j < board[i].length; j += 2) {
        board[i][j] = new Piece("W", [i, j]);
      }
    }
  }

  return board;
};

//Initializes the Board on game start up.
var setBoard = function() {
  setWhite();
  setBlack();
  return board;
};

var setVisualBoard = function() {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] !== null) {
        if (board[i][j].team === "B") {
          var coordinate = '#' + board[i][j].coordinates.join('-');
          var newPiece = $('<div></div>').addClass('black-piece')
          $(coordinate).append(newPiece);
        }
      }
    }
  }

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] !== null) {
        if (board[i][j].team === "W") {
          var coordinate = '#' + board[i][j].coordinates.join('-');
          var newPiece = $('<div></div>').addClass('white-piece');
          $(coordinate).append(newPiece);
        }
      }
    }
  }
};

// Prints the board in a more readable format in the console. Needs to be
// worked on quite a bit...
var printBoard = function() {
  for (var i = 0; i < board.length; i++) {
    var output = "";

    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] === null) {
        output += "_ ";
      } else {
        output += board[i][j].team + " ";
      }
    }

    console.log(output);
  }

  return 1;
};

// Clears the board...
var clearBoard = function() {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      board[i][j] = null;
    }
  }

  return board;
};


////////// DOM INTERACTION ///////

// PUT ALL OF THE DOM STUFF IN THE $(function() {}) jQuery function ready code
// NO MIXING GAME MODEL AND DOM STUFF AT ALL.f

// Event delegation/bubbling for all blocks inside the main board div.
$(".board").on("click", ".square", function() {
  var clicked = $(this);
  if (getSelectedPiece().selected == true) {
    var desiredMove = getClickedPiece(clicked);
    console.log(desiredMove);
    console.log("inside the if")
    getSelectedPiece().moveSelectedPiece(desiredMove);
  } else {
    clickedPiece = getClickedPiece(clicked);
    clickedPiece.setSelectedPiece(); //method that sets piece selected as true //gets coordinates
    console.log(clickedPiece);
  }
});

// registers where the player clicked and returns the Piece object contained
// within the clicked div.
var getClickedPiece = function(clicked) {
  var coordinates = clicked.attr('id').split('-');
  if (board[coordinates[0]][coordinates[1]] === null){
    // NEEDS TO CONVERT THE STRING COORDINATES TO NUMBERS.
    coordinates.map(function(x) {
      parseInt(x);
    });
    console.log(coordinates);
    return coordinates; //if it's null, return coordinates.
  } else {
    var boardPiece = board[coordinates[0]][coordinates[1]];
  } //else, if there's a piece object there, return that.
  return boardPiece;
};

var getSelectedPiece = function() {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] !== null && board[i][j].selected === true) {
        return board[i][j];
      }
    }
  }

  return false;
}

//Sets up the visual board on the button click.
$('#set-board').on('click', function() {
  setBoard();
  setVisualBoard();
});

