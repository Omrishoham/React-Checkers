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


