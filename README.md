##Checkers

###Description
#####Checkers is a board game that involves two players (one takes the dark pieces, the other takes the light pieces). The dark player always has the first turn. The players take turns moving pieces forward and diagonally one spot and can "capture" opponents by jumping over them diagonally. If a player captures another player's piece and lands in a spot where another capturing move is available, this capturing move must be performed. If a player's piece makes it to the opposing player's side of the board, this piece is "kinged" and is allowed to move backwards diagonally one spot.

###Technologies used:
- HTML:
 - Used to create the structure of the game. 64 divs were used to create the game board. These divs were then applied a class of either 'black-piece' or 'white-piece' in order to represent the game pieces.
- CSS: 
 - Used to style the game. Basic CSS was used and the UI was kept minimal so I could focus on Javascript.
- Javascript:
 - Vanilla Javascript was used to create all of the game logic. Each piece on the gameboard is an object and contains properties indicative of its state (e.g. team, coordinates (row and column), a boolean indicating whether or not its a king). All of the pieces have many available methods that I use extensively throughout the program (e.g., getPossibleMoves() uses a pieces current coordinates to analyze possible squares it can move to and whether or not any "capture" moves are available, or getDivID which converts the coordinate numbers to a string for jQuery utilization, among many others).
- jQuery:
  - jQuery was used exclusively for DOM manipulation. It was used to add pieces to the DOM, remove them from the board (clearBoard), and move them from square to square. Unfortunately, given the time constraints, extra jQuery goodies such as "fade in" and "fade out" were not implemented.

###Design Approach:
I designed the game to be entirely Object Oriented. Each of the game pieces is an object and has properties relevant to its current state in the game. At times, this made creating the program easier and at others it made it more frusturating. The program was designed to utilize many Piece object methods and functions that either alter the data model or the visual UI board that appears in the browser. Unfortunately, my approach was scattered and unorganized. I frequently had to redesign functions and methods in order to keep progressing, only to find that these redesigns wouldn't work with later features. In the future, I plan to psuedocode and wireframe more effectively.

###Get Started:
To install this game and play it, simply download the files and open up the HTML page in the browser. "Set Up Game" button the bottom of the game board will initialize the game, and the game can be cleared and reset at any time by using the "Clear The Board" button. 

If you'd like to download and alter the source code, all of the HTML is contained in `index.html`, all of the CSS is contained in `style.css`, and all of the Javascript and jQuery is contained in the `main.js` file.

###Unsolved Problems/Planned Features:
- The game is not fully functional. The logic for determining piece moves is rather refined, but "capturing" pieces has not yet been fully implemented even though skipping over pieces is possible. The game does not keep track of score. The game does not account for "chain" attacks. The game does not account for king pieces. Over the next few weeks, I'd like to refactor my code and finish a fully working copy.


###User Stories
**As a ___, I want ___, so that I can ___.**


**MVP**:
- [x] As a user, I want to be able to move my pieces on the board so I can try and win the game.
- [x] As a user, I want to be notified as to whether or not my desired move is legal or not so I can make a different move if needed.
- [x] As a user, I want to be able to "capture" or "attack" other players so I can (eventually) win the game.
- [x] As a user, I want to be able to play against another human so that the game is at least playable.
- [x] As a user, I want to have a tracker that summarizes the state of the game, so I can gauge how I'm doing in my current game (by showing, for example, current selected piece and current score).
- [x] As a user, I want a 'reset game' button so that I can reset the game instead of frusturatingly play through a game I know is a lost cause.
- [x] As a user, I want an aesthetically pleasing and functional UI so that I can clearly see the status of the game.
- [ ] As a user, I want to be indicated of what piece I currently have selected.

**Icebox:**
- [ ] As a user, I want to be able to use chain attacks so that I can utilize traditional checkers strategies during the game.
- [ ] As a user, I want to be able to select pieces and be shown a visual list of options as to where I can move the selected pieces so I can easily make decisions about my next move.
- [ ] As a user, I want to be granted a king if I get to the opponents side of the board so that I can utilize the power of king pieces during my game.
- [x] As a user, I want assistance that notifies me of where I'm allowed to move a selected piece.
