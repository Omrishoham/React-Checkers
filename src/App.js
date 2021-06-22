import React, { Component } from 'react';
import './App.css';
import CheckersBoard from './Components/CheckersBoard'
import {getAllMoves,canMoveChecker} from './GameLogic'


const INITIAL_BOARD =
  [[null, 12, null, 13, null, 14, null, 15],
  [16, null, 17, null, 18, null, 19, null],
  [null, 20, null, 21, null, 22, null, 23],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [8, null, 9, null, 10, null, 11, null],
  [null, 4, null, 5, null, 6, null, 7],
  [0, null, 1, null, 2, null, 3, null]];

const PLAYER_ONE = 1;
const PLAYER_TWO = 2;
const PLAYERS = {
  [PLAYER_ONE]: {
    name: "Player One",
    class: "player-one"
  },
  [PLAYER_TWO]: {
    name: "Player Two",
    class: "player-two"
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: INITIAL_BOARD,
      checkers: this.makeCheckers(),
      gameStarted: false,
      currentPlayer: PLAYER_ONE,
      choosedSquare: null,
    };
  }

  startGame() {
    this.setState({ gameStarted: true });
  }

  restart() {
    const INITIAL_BOARD =
      [[null, 12, null, 13, null, 14, null, 15],
      [16, null, 17, null, 18, null, 19, null],
      [null, 20, null, 21, null, 22, null, 23],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [8, null, 9, null, 10, null, 11, null],
      [null, 4, null, 5, null, 6, null, 7],
      [0, null, 1, null, 2, null, 3, null]];

    this.setState({
      board: INITIAL_BOARD,
      checkers: this.makeCheckers(),
      currentPlayer: PLAYER_ONE,
      choosedSquare: null,
    });
  }

  
  //create an array of checkers(objects) on the board and return it
  makeCheckers() {
    let size = 8;//board size
    let checkers = [];
    let num = (size / 2) * 3;
    let row = size - 1, col = 0;
    for (let i = 0; i < num; i++) {
      if (i && i % (size / 2) === 0) {
        row--;
        col = i == size ? 0 : 1;
      }
      checkers.push({ player: PLAYER_ONE, isKing: false, row: row, col: col, removed: false });
      col += 2;
    }
    row = 0;
    col = 1;
    for (let i = 0; i < num; i++) {
      if (i && i % (size / 2) === 0) {
        row++;
        col = i == size ? 1 : 0;
      }
      checkers.push({ player: PLAYER_TWO, isKing: false, row: row, col: col, removed: false });
      col += 2;
    }
    return checkers;
  }

  selectSquare(row, col) {//activated when user select square in board
    console.log("square row "+row+" column "+col);
    let selected = this.state.choosedSquare;
    if (this.canSelectChecker(row, col)) {//check if user select square with checker belong to himself or not
      this.setSquare(row, col);//set choosed square in state
    } else if (selected != null) {//check if user select square to move after he select the square he want to move from
      this.handleMove(row, col);
    }
  }

  handleMove(row, col) {
    let board = this.state.board;
    let checkers = this.state.checkers;
    let selected = this.state.choosedSquare;
    let startCheckerSelected = board[selected.row][selected.column];
    if (!canMoveChecker(board,checkers,startCheckerSelected, row, col)) {//if move isnt in move legal so return and dont make move
      console.log("illegal move");
      return;
    }

    let isJump = this.isJumpMove(startCheckerSelected, row, col);
    let becameKing = false;
    this.moveChecker(startCheckerSelected, row, col);
    if (!this.isKing(startCheckerSelected) && (this.getPlayer(startCheckerSelected) === PLAYER_ONE && row === 0) || (this.getPlayer(startCheckerSelected) === PLAYER_TWO && row === ((this.state.board.length) - 1))) {
      console.log("making King....");
      becameKing = true;
      this.makeKing(startCheckerSelected);
    }
      this.setState({ board: board, currentPlayer: this.oppositePlayer(), choosedSquare: null });
  }

  canSelectChecker(row, column) {
    let checkerID = this.state.board[row][column];
    if (checkerID>=0 && checkerID<=23 && checkerID!=null) {//check if selected square is with checker
     let checkerPlayer = this.state.checkers[checkerID].player;
      return checkerPlayer === this.state.currentPlayer;//check if checker selecetd belong to the current player playing
    }
    return false;
  }

  setSquare(row, column) {
    this.setState({ choosedSquare: { row: row, column: column } });
  }

  oppositePlayer() {
    return (this.state.currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE)
  }

  //get all single moves and jump moves of checkers

  hasMoves(player) {
    let checkers = this.state.checkers;
    let board = this.state.board;
    let moves = getAllMoves(player,checkers,board);
    return moves.jumps.length + moves.singles.length > 0;
  }
  
  isJumpMove(checker, row) {
    return Math.abs(this.state.checkers[checker].row - row) === 2;
  }

  moveChecker(checker, row, col) {
    let c = this.state.checkers[checker];
    let board = this.state.board;
    let checkers = this.state.checkers;
    let cRow = c.row;
    let cCol = c.col;
    if (this.isJumpMove(checker, row)) {
      let midRow = (cRow + row) / 2;
      let midCol = (cCol + col) / 2;
      let removedPlayer = this.state.board[midRow][midCol];
      board[midRow][midCol] = null;
      checkers[removedPlayer].removed = true;
    }
    c.row = row;
    c.col = col;
    board[cRow][cCol] = null;
    board[row][col] = checker;
    this.setState({ board: board, checkers: checkers });
  }


  

  render() {

    return (
      <div className="App">
        {this.state.gameStarted ?
          <div>
            <h3 className={this.state.currentPlayer == PLAYER_ONE ? 'white-color' : 'red-color'}>{PLAYERS[this.state.currentPlayer].name}'s Turn</h3>
            <CheckersBoard
              board={this.state.board}
              choosedSquare={this.state.choosedSquare}
              selectSquare={this.selectSquare.bind(this)}
              players={PLAYERS}
              checkers={this.state.checkers} />
            <br></br>
            <button className="button" onClick={this.restart.bind(this)} >Restart</button>
          </div>
          : <button className="button" onClick={this.startGame.bind(this)} >Start New Game</button>}
      </div>
    );
  }
}

export default App;


