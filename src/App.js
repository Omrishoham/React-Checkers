import React, { Component } from 'react';
import './App.css';
import Board from './Board.js';
import GameBoard from './Components/GameBoard'

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
      gameStarted: false,
      board: new Board(PLAYER_ONE, PLAYER_TWO),
      currentPlayer: PLAYER_ONE,
      choosedSquare: null, winner: null
    };
  }

  startGame() {
    this.setState({ gameStarted: true });
  }

  //If there are no available moves left, announce a winner
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPlayer != this.state.currentPlayer) {
      let board = this.state.board;
      if (!board.hasMoves(this.state.currentPlayer)) {
        this.setState({ winner: this.oppositePlayer
      () });
      }
    }
  }

  selectSquare(row, column) {
    console.log("in select square for row " + row + " column " + column);
    let selected = this.state.choosedSquare;
    if (this.canSelectSquare(row, column)) {
      this.setSquare(row, column);
    } else if (selected != null) {
      this.handleMove(row, column);
    }
  }

  handleMove(row, col) {
    let board = this.state.board;
    let selected = this.state.choosedSquare;
    let start = board.board[selected.row][selected.column];
    if (!board.canMoveChecker(start, row, col)) {
      console.log("illegal move");
      return;
    }

    let isJump = board.isJumpMove(start, row, col);
    let becameKing = false;
    board.moveChecker(start, row, col);
    if (!board.isKing(start) && (board.getPlayer(start) === PLAYER_ONE && row === 0) || (board.getPlayer(start) === PLAYER_TWO && row === ((board.board.length) - 1))) {
      console.log("making King....");
      becameKing = true;
      board.makeKing(start);
    }

    if (!becameKing && isJump && board.canKeepJumping(start)) {
      this.setState({ board: board, choosedSquare: { row: row, column: col } });
    } else {
      this.setState({ board: board, currentPlayer: this.oppositePlayer
    (), choosedSquare: null });
    }
  }

  canSelectSquare(row, column) {
    let square = this.state.board.board[row][column];
    if (!square) {
      return false;
    }
    let player = this.state.board.checkers[square].player;
    return player === this.state.currentPlayer;
  }

  setSquare(row, column) {
    this.setState({ choosedSquare: { row: row, column: column } });
  }

  oppositePlayer() {
    return (this.state.currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE)
  }

  restart() {
    this.setState({
      board: new Board(PLAYER_ONE, PLAYER_TWO),
      currentPlayer: PLAYER_ONE, choosedSquare: null, winner: null
    });
  }

  render() {

    return (
      <div className="App">
        {this.state.gameStarted ?
          <div>
            <h3 className={this.state.currentPlayer==PLAYER_ONE?'white-color':'red-color'}>{PLAYERS[this.state.currentPlayer].name}'s Turn</h3>
            <GameBoard
              board={this.state.board}
              choosedSquare={this.state.choosedSquare}
              selectSquare={this.selectSquare.bind(this)}
              players={PLAYERS} />
            <br></br>
            <button className="button" onClick={this.restart.bind(this)} >Restart</button>
          </div>
          : <button className="button" onClick={this.startGame.bind(this)} >Start New Game</button>}
      </div>
    );
  }
}

export default App;


