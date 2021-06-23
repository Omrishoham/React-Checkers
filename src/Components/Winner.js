import React,{Component} from 'react';
function Winner(props) {
    let player = props.players[props.player].name;
    return (
      <div id="winner">
        <div>
          <p>{player} has won the game!</p>
          <button onClick={props.restart}>Play again?</button>
        </div>
      </div>
    );
  }

  export default Winner;
  