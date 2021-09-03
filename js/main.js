let gBoard;
let LWRook;
let RWRook;
let LBRook;
let RBRook;
let player1;
let player2;
//test
//new stuff
function init() {
  gBoard = createBoard();
  printBoard(gBoard, ".gameBoard");
  colorCells();
  RWRook = new Rook("RWRook", "white", "&#9814;", false);
  RWRook.display();
  LWRook = new Rook("LWRook", "white", "&#9814;", false);
  LWRook.display();
  player1 = new Player("shani", "white", "");
  // RWRook = new Rook("RWRook", "white", "&#9814;", false);
  // RWRook.display();
  LBRook = new Rook("LBRook", "black", "&#9820;", false);
  LBRook.display();
  RBRook = new Rook("RBRook", "black", "&#9820;", false);
  RBRook.display();

  player2 = new Player("dude", "black", "");
}

function createBoard() {
  let board = [];
  for (let i = 0; i < 8; i++) {
    board[i] = [];
    for (let j = 0; j < 8; j++) {
      board[i][j] = "";
    }
  }
  console.table(board);
  return board;
}

function printBoard(board, selector) {
  let strHtml = "";
  for (let i = 0; i < 8; i++) {
    strHtml += "<tr>";
    for (let j = 0; j < 8; j++) {
      strHtml += `<td id="cell${i}-${j}" onclick="cellClicked(this)"> ${board[i][j]} </td>`;
    }
    strHtml += "</tr>";
  }
  let elBoard = document.querySelector(selector);
  elBoard.innerHTML = strHtml;
}

function colorCells() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let elCell = document.querySelector(`#cell${i}-${j}`);
      if (i % 2 === 0) {
        if (j % 2 === 0) {
          elCell.classList.add("white");
        } else {
          elCell.classList.add("black");
        }
      } else {
        if (j % 2 === 0) {
          elCell.classList.add("black");
        } else {
          elCell.classList.add("white");
        }
      }
    }
  }
}
let isWhiteFirstClick = true;
let isBlackFirstClick = true;
let selectedPiece;
function cellClicked(elCell) {
  let cellCoords = getCoords(elCell);
  let boardCell = gBoard[cellCoords.i][cellCoords.j];

  //only when its white turn , can move
  if (player1.turn) {
    //white move
    //click rook
    //check if R or L rook
    if (
      elCell.innerHTML === "♖" &&
      isWhiteFirstClick &&
      boardCell === "RWRook"
    ) {
      RWRook.colorPossibleMoves();
      selectedPiece = boardCell;
      isWhiteFirstClick = false;
      //click rook second time
    } else if (
      elCell.innerHTML === "♖" &&
      !isWhiteFirstClick &&
      boardCell === "RWRook"
    ) {
      RWRook.removeColorPossibleMoves();
      LWRook.removeColorPossibleMoves();
      isWhiteFirstClick = true;
      //after the way colored
      //click other cell for rook to move there
    } else if (
      !isWhiteFirstClick &&
      elCell.style.border === "1px solid red" &&
      selectedPiece === "RWRook"
    ) {
      RWRook.move(elCell);
      selectedPiece = "";
      isWhiteFirstClick = true;
      //move the turn to other player
      player1.turn = false;
      player2.turn = true;
    }
    //if its L rook
    if (
      elCell.innerHTML === "♖" &&
      isWhiteFirstClick &&
      boardCell === "LWRook"
    ) {
      LWRook.colorPossibleMoves();
      isWhiteFirstClick = false;
      selectedPiece = boardCell;
      //click rook second time
    } else if (
      elCell.innerHTML === "♖" &&
      !isWhiteFirstClick &&
      boardCell === "LWRook"
    ) {
      LWRook.removeColorPossibleMoves();
      RWRook.removeColorPossibleMoves();
      isWhiteFirstClick = true;
      //after the way colored
      //click other cell for rook to move there
    } else if (
      !isWhiteFirstClick &&
      elCell.style.border === "1px solid red" &&
      selectedPiece === "LWRook"
    ) {
      LWRook.move(elCell);
      isWhiteFirstClick = true;
      selectedPiece = "";
      //move the turn to other player
      player1.turn = false;
      player2.turn = true;
    }
  }
  //only when black turn , can move
  if (player2.turn) {
    //black move
    if (
      elCell.innerHTML === "♜" &&
      isBlackFirstClick &&
      boardCell === "RBRook"
    ) {
      RBRook.colorPossibleMoves();
      selectedPiece = boardCell;
      isBlackFirstClick = false;
      //click rook second time
    } else if (
      elCell.innerHTML === "♜" &&
      !isBlackFirstClick &&
      boardCell === "RBRook"
    ) {
      RBRook.removeColorPossibleMoves();
      LBRook.removeColorPossibleMoves();
      isBlackFirstClick = true;
      //after the way colored
      //click other cell for rook to move there
    } else if (
      !isBlackFirstClick &&
      elCell.style.border === "1px solid red" &&
      selectedPiece === "RBRook"
    ) {
      RBRook.move(elCell);
      selectedPiece = "";
      isBlackFirstClick = true;
      //move the turn to other player
      player1.turn = true;
      player2.turn = false;
    }
    //if its L rook
    if (
      elCell.innerHTML === "♜" &&
      isBlackFirstClick &&
      boardCell === "LBRook"
    ) {
      LBRook.colorPossibleMoves();
      isBlackFirstClick = false;
      selectedPiece = boardCell;
      //click rook second time
    } else if (
      elCell.innerHTML === "♜" &&
      !isBlackFirstClick &&
      boardCell === "LBRook"
    ) {
      LBRook.removeColorPossibleMoves();
      RBRook.removeColorPossibleMoves();
      isBlackFirstClick = true;
      //after the way colored
      //click other cell for rook to move there
    } else if (
      !isBlackFirstClick &&
      elCell.style.border === "1px solid red" &&
      selectedPiece === "LBRook"
    ) {
      LBRook.move(elCell);
      isBlackFirstClick = true;
      selectedPiece = "";
      //move the turn to other player
      player1.turn = true;
      player2.turn = false;
    }
  }
}

//oop

class Player {
  constructor(name, color, pieces) {
    this.name = name;
    this.color = color;
    this.pieces = pieces;

    this.color === "white" ? (this._turn = true) : (this._turn = false);
  }
  //set and get
  get turn() {
    return this._turn;
  }
  set turn(value) {
    this._turn = value;
  }
}

class Piece {
  constructor(name, color, symbol, eaten) {
    this.name = name;
    this.color = color;
    this.symbol = symbol;
    this.eaten = false;
  }

  isEaten() {
    this.eaten = true;
  }
}

class Rook extends Piece {
  constructor(name, color, symbol, eaten) {
    super(name, color, symbol, eaten);
  }
  display() {
    if (this.color === "white" && this.name === "RWRook") {
      const cell = document.querySelector("#cell7-7");
      cell.innerHTML = this.symbol;
      this.coords = { i: 7, j: 7 };
      gBoard[this.coords.i][this.coords.j] = this.name;
    } else if (this.color === "white" && this.name === "LWRook") {
      const cell = document.querySelector("#cell7-0");
      cell.innerHTML = this.symbol;
      this.coords = { i: 7, j: 0 };
      gBoard[this.coords.i][this.coords.j] = this.name;
    } else if (this.color === "black" && this.name === "LBRook") {
      const cell = document.querySelector("#cell0-7");
      cell.innerHTML = this.symbol;
      this.coords = { i: 0, j: 7 };
      gBoard[this.coords.i][this.coords.j] = this.name;
    } else if (this.color === "black" && this.name === "RBRook") {
      const cell = document.querySelector("#cell0-0");
      cell.innerHTML = this.symbol;
      this.coords = { i: 0, j: 0 };
      gBoard[this.coords.i][this.coords.j] = this.name;
    }
  }
  newPos(newCoords) {
    const cell = document.querySelector(
      `#cell${this.coords.i}-${this.coords.j}`
    );
    cell.innerHTML = "";
    gBoard[this.coords.i][this.coords.j] = "";
    const newCell = document.querySelector(
      `#cell${newCoords.i}-${newCoords.j}`
    );
    newCell.innerHTML = this.symbol;
    this.coords = newCoords;
    gBoard[this.coords.i][this.coords.j] = this.name;
  }

  //trying new color func
  colorPossibleMoves() {
    let whitePassEnemyPieceTop = false;
    let whitePassEnemyPieceBottom = false;
    let whitePassEnemyPieceLeft = false;
    let whitePassEnemyPieceRight = false;
    let blackPassEnemyPieceTop = false;
    let blackPassEnemyPieceBottom = false;
    let blackPassEnemyPieceLeft = false;
    let blackPassEnemyPieceRight = false;

    for (let i = 1; i < 8; i++) {
      if (this.color === "white") {
        //white piece
        //i column
        //TOP
        if (i <= this.coords.i) {
          const cellI = document.querySelector(
            `#cell${this.coords.i - i}-${this.coords.j}`
          );
          if (
            (cellI.innerText === "♜" && !whitePassEnemyPieceTop) ||
            (cellI.innerText === "" && !whitePassEnemyPieceTop)
          ) {
            cellI.style.border = "1px solid red";
            //Encounter enemy piece will block color
            if (cellI.innerText === "♜") {
              whitePassEnemyPieceTop = true;
            }
            //Encounter white piece will block color
          } else {
            whitePassEnemyPieceTop = true;
          }
        }
        //BOTTOM
        if (i > this.coords.i) {
          const cellI = document.querySelector(`#cell${i}-${this.coords.j}`);
          if (
            (cellI.innerText === "♜" && !whitePassEnemyPieceBottom) ||
            (cellI.innerText === "" && !whitePassEnemyPieceBottom)
          ) {
            cellI.style.border = "1px solid red";
            if (cellI.innerText === "♜") {
              whitePassEnemyPieceBottom = true;
            }
          } else {
            whitePassEnemyPieceBottom = true;
          }
        }
        // j row
        //LEFT
        if (i <= this.coords.j) {
          const cellI = document.querySelector(
            `#cell${this.coords.i}-${this.coords.j - i}`
          );
          if (
            (cellI.innerText === "♜" && !whitePassEnemyPieceLeft) ||
            (cellI.innerText === "" && !whitePassEnemyPieceLeft)
          ) {
            cellI.style.border = "1px solid red";
            if (cellI.innerText === "♜") {
              whitePassEnemyPieceLeft = true;
            }
          } else {
            whitePassEnemyPieceLeft = true;
          }
        }
        //RIGHT
        if (i > this.coords.j) {
          const cellI = document.querySelector(`#cell${this.coords.i}-${i}`);
          if (
            (cellI.innerText === "♜" && !whitePassEnemyPieceRight) ||
            (cellI.innerText === "" && !whitePassEnemyPieceRight)
          ) {
            cellI.style.border = "1px solid red";
            if (cellI.innerText === "♜") {
              whitePassEnemyPieceRight = true;
            }
          } else {
            whitePassEnemyPieceRight = true;
          }
        }
      } else {
        //black piece
        //i column
        //TOP
        if (i <= this.coords.i) {
          const cellI = document.querySelector(
            `#cell${this.coords.i - i}-${this.coords.j}`
          );
          if (
            (cellI.innerText === "♖" && !blackPassEnemyPieceTop) ||
            (cellI.innerText === "" && !blackPassEnemyPieceTop)
          ) {
            cellI.style.border = "1px solid red";
            //Encounter enemy piece will block color
            if (cellI.innerText === "♖") {
              blackPassEnemyPieceTop = true;
            }
          } else {
            blackPassEnemyPieceTop = true;
          }
        }
        //BOTTOM
        if (i > this.coords.i) {
          const cellI = document.querySelector(`#cell${i}-${this.coords.j}`);
          if (
            (cellI.innerText === "♖" && !blackPassEnemyPieceBottom) ||
            (cellI.innerText === "" && !blackPassEnemyPieceBottom)
          ) {
            cellI.style.border = "1px solid red";
            if (cellI.innerText === "♖") {
              blackPassEnemyPieceBottom = true;
            }
          } else {
            blackPassEnemyPieceBottom = true;
          }
        }
        // j row
        //LEFT
        if (i <= this.coords.j) {
          const cellI = document.querySelector(
            `#cell${this.coords.i}-${this.coords.j - i}`
          );
          if (
            (cellI.innerText === "♖" && !blackPassEnemyPieceLeft) ||
            (cellI.innerText === "" && !blackPassEnemyPieceLeft)
          ) {
            cellI.style.border = "1px solid red";
            if (cellI.innerText === "♖") {
              blackPassEnemyPieceLeft = true;
            }
          } else {
            blackPassEnemyPieceLeft = true;
          }
        }
        //RIGHT
        if (i > this.coords.j) {
          const cellI = document.querySelector(`#cell${this.coords.i}-${i}`);
          if (
            (cellI.innerText === "♖" && !blackPassEnemyPieceRight) ||
            (cellI.innerText === "" && !blackPassEnemyPieceRight)
          ) {
            cellI.style.border = "1px solid red";
            if (cellI.innerText === "♖") {
              blackPassEnemyPieceRight = true;
            }
          } else {
            blackPassEnemyPieceRight = true;
          }
        }
      }
    }
  }

  removeColorPossibleMoves() {
    for (let i = 0; i < 8; i++) {
      const cellI = document.querySelector(`#cell${i}-${this.coords.j}`);
      cellI.style.border = "1px solid black";
      const cellJ = document.querySelector(`#cell${this.coords.i}-${i}`);
      cellJ.style.border = "1px solid black";
    }
  }

  move(elCell) {
    if (elCell.style.border === "1px solid red") {
      let str = elCell.id;
      let newCoords = { i: 0, j: 0 };
      newCoords.i = str[str.indexOf("-") - 1];
      newCoords.j = str[str.indexOf("-") + 1];
      this.removeColorPossibleMoves();
      this.newPos(newCoords);
    } else {
      console.log("can't move there");
    }
  }
}

function getCoords(elCell) {
  let str = elCell.id;
  let newCoords = { i: 0, j: 0 };
  newCoords.i = str[str.indexOf("-") - 1];
  newCoords.j = str[str.indexOf("-") + 1];
  return newCoords;
}
