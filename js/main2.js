var currentPlayer = 'B'; //will change each turn.

// Nested araay used as the data model.
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

//Object Constructor Function for Piece object.
function Piece(team, row, col) {
  this.team = team;
  this.row = row;
  this.col = col;
  this.king = false; //no one is a king at start, when true, more possible moves.
  this.selected = false; //will change to true upon click.
}

//Figures out legal moves for currently selected player.
Piece.prototype.getPossibleMoves = function() {
  var possibleMoves = [];
  if (this.team === "B") { //check for possible black moves
    possibleMoves.push([this.row + 1, this.col - 1]);
    possibleMoves.push([this.row + 1, this.col + 1]);

  } else { //check for possible white moves
    possibleMoves.push([this.row - 1, this.col - 1]);
    possibleMoves.push([this.row - 1, this.col + 1]);
  }

  if (this.king === true) {
    if (this.team === "B") { //check for possible black moves
      possibleMoves.push([this.row + -1, this.col - 1]);
      possibleMoves.push([this.row + -1, this.col + 1]);

    } else { //check for possible white moves
      possibleMoves.push([this.row + 1, this.col - 1]);
      possibleMoves.push([this.row + 1, this.col + 1]);
    }
  }


  //remove undefined values from possibleMoves array
  for (var i = 0; i < possibleMoves.length; i++) {
    if (board[possibleMoves[i][0]][possibleMoves[i][1]] === undefined) {
      possibleMoves.splice(i, 1);
    }
  }

  //determines if there is an opponent piece in one of the possible moves,
  //and, if so, will remove that and allow the piece over it as a possible move.

  for (var i = 0; i < possibleMoves.length; i++) {
    console.log(board[possibleMoves[i][0]][possibleMoves[i][1]]);
    if (typeof board[possibleMoves[i][0]][possibleMoves[i][1]] === 'object' && this.team == "B" && board[possibleMoves[i][0 + 1]][possibleMoves[i][1 - 1]] === null) {
      possibleMoves.push([possibleMoves[i][0] + 1, possibleMoves[i][1] - 1]);
    } else if (typeof board[possibleMoves[i][0]][possibleMoves[i][1]] === 'object' && this.team == "B" && board[possibleMoves[i][0 + 1]][possibleMoves[i][1 + 1]] === null) {
      possibleMoves.push([possibleMoves[i][0] + 1, possibleMoves[i][1] + 1]);
    } else if (typeof board[possibleMoves[i][0]][possibleMoves[i][1]] === 'object' && this.team == "W" && board[possibleMoves[i][0-1]][possibleMoves[i][1-1]] === null) {
      possibleMoves.push([possibleMoves[i][0] - 1, possibleMoves[i][0] - 1]);
    } else if (typeof board[possibleMoves[i][0]][possibleMoves[i][1]] === 'object' && this.team == "W" && board[possibleMoves[i][0-1]][possibleMoves[i][1+1]] === null) {
      possibleMoves.push([possibleMoves[i][0] - 1, possibleMoves[i][1] + 1]);
    }
    // console.log(board[possibleMoves[1][0]][possibleMoves[1][1]]);
  }
  return possibleMoves;
};

//gets the coordinates for a piece and converts it to a string with the div IDname.
//Used for DOM Manipulation using jQuery.
Piece.prototype.getDivID = function() {
  return '#' + this.row + "-" + this.col;
};

//Will take the opponent and remove it from Visual Board and
//2D Array.
// Piece.prototype.attackOpponent(opponentLocation) = function() {

// };

// Sets the piece object to selected as true and sets selected as false
// for all other pieces.
Piece.prototype.setSelectedPiece = function() {
  if (this.selected !== true) {
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] !== null) {
          board[i][j].selected = false;
        }
      }
    }
  }
  this.selected = true;
};

Piece.prototype.moveSelectedPiece = function(acceptableMove) {
  var pieceToMove = getSelectedPiece();
  var oldCoordinates = [getSelectedPiece().row, getSelectedPiece().col];
  var oldDivID = getSelectedPiece().getDivID();
  pieceToMove.row = acceptableMove[0]; // change the selected piece row to desired location.
  pieceToMove.col = acceptableMove[1]; // change the selected piece column to desired location.
  board[acceptableMove[0]][acceptableMove[1]] = pieceToMove; //move the object to new coordinates on board.
  board[oldCoordinates[0]][oldCoordinates[1]] = null;
  updateVisualBoard(oldDivID);
  getSelectedPiece().selected = false;
  changePlayer();
};

//Moves selected piece to the desired coordinates, assuming they match one of
//the legal moves produced by getPossibleMoves().
Piece.prototype.checkDesiredMove = function(desiredCoordinates) {
  var selectedPiece = getSelectedPiece(); //get currently selected piece
  var possibleMoves = selectedPiece.getPossibleMoves();
  var acceptableMove = null;
  console.log(possibleMoves);
  for (var i = 0; i < possibleMoves.length; i++) {
    if (desiredCoordinates[0] === possibleMoves[i][0] && desiredCoordinates[1] === possibleMoves[i][1]) {
      acceptableMove = possibleMoves[i];
      console.log(acceptableMove);
      break;
    }
  }

  // else if (typeof desiredCoordinates[0] === 'object' || typeof desiredCoordinates[1] === 'object') {
  //   //then call attackOpponent method that will move to appropriate square and update Vis board.
  // }
  if (acceptableMove === null) {
    alert("You can't move there.");
    return;
  }

  getSelectedPiece().moveSelectedPiece(acceptableMove);
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//Takes in the coordinates of the old piece and updates the visual board
//with the moved piece in it's new location.
var updateVisualBoard = function(oldCoordinates) {
  var classType;
  if (currentPlayer === 'B') {
    classType = 'black-piece';
  } else {
    classType = 'white-piece';
  }

  $(oldCoordinates).children().remove();

  var pieceToMoveDiv = getSelectedPiece().getDivID();
  var newPiece = $('<div></div>').addClass(classType);
  $(pieceToMoveDiv).append(newPiece);

  // getSelectedPiece().selected = false;
};

//Sets Up Black.
var setBlack = function() {
  for (var i = 0; i < 3; i++) {
    if (i % 2 === 0) {
      for (var j = 0; j < board[i].length; j += 2) {
        board[i][j] = new Piece("B", i, j);
      }
    } else {
      for (var j = 1; j < board[i].length; j += 2) {
        board[i][j] = new Piece("B", i, j);
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
        board[i][j] = new Piece("W", i, j);
      }
    } else {
      for (var j = 1; j < board[i].length; j += 2) {
        board[i][j] = new Piece("W", i, j);
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
          var coordinate = board[i][j].getDivID();
          var newPiece = $('<div></div>').addClass('black-piece');
          $(coordinate).append(newPiece);
        }
      }
    }
  }

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] !== null) {
        if (board[i][j].team === "W") {
          var coordinate = board[i][j].getDivID();
          var newPiece = $('<div></div>').addClass('white-piece');
          $(coordinate).append(newPiece);
        }
      }
    }
  }
};

// Prints the board in a more readable format in the console.
var printBoard = function() {
  for (var i = 0; i < board.length; i++) {
    var output = i + ":  ";

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

// Clears the board array...
var clearBoard = function() {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      board[i][j] = null;
    }
  }

  return board;
};

// Clears the board on browser screen...
var clearVisualBoard = function() {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      var coordinates = "#" + i + "-" + j;
      $(coordinates).children().remove();
    }
  }
};

////////// DOM INTERACTION ///////

// Event delegation/bubbling for all blocks inside the main board div.
$(".board").on("click", ".square", function() {
  var clickedSquare = $(this); //this square was clicked
  var clickedPiece = getClicked(clickedSquare); //the piece inside the square
  if (getSelectedPiece() === false && clickedPiece.team === currentPlayer) { //set as selected
    clickedPiece.setSelectedPiece(); //method that sets piece selected as true //gets coordinates
    console.log(clickedPiece);
    // need to finish: setVisualSelected();
  } else if (getSelectedPiece().selected === true && getClicked(clickedSquare) !== null && clickedPiece.team === currentPlayer) { //switch selected
    //to be done: set visual selected
    clickedPiece.setSelectedPiece();
  } else { //try to move
    if (getSelectedPiece().team === currentPlayer) {
      var desiredMove = getClicked(clickedSquare);
      getSelectedPiece().checkDesiredMove(desiredMove);
    } else {
      alert("It's not your turn!");
    }
  }
});

// registers where the player clicked and returns the Piece object contained
// within the clicked div. otherwise, returns coordinates of the null board location.
var getClicked = function(clicked) {
  var coordinates = clicked.attr('id').split('-');
  if (board[coordinates[0]][coordinates[1]] === null) {

    var coorInts = coordinates.map(function(x) {
      return parseInt(x);
    });

    return coorInts; //if it's null, return coordinates.
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
};

var changePlayer = function() {
  if (currentPlayer === 'B') {
    currentPlayer = 'W';
  } else {
    currentPlayer = 'B';
  }
  $('#current-player h3').html("Current Player: " + currentPlayer);
};

var setVisualSelected = function() {
  //remove prior selected visual shadow
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] !== null) {
        board[i][j].selected = false;
      }
    }
  }
  var selectedPiece = $(getSelectedPiece().getDivID()).children();
  selectedPiece.addClass('selected');
};

//Sets up the visual board on the button click.
$('#set-board').on('click', function() {
  setBoard();
  setVisualBoard();
});

//Clear board button clears board array and Virtual Board.
$('#clear-board').on('click', function() {
  clearBoard();
  currentPlayer = "B";
  clearVisualBoard();
});
