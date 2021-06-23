import React from 'react';

function Piece(props) {
    let classes = "";
    if (props.checker) {
      classes += props.players[props.checker.player].class;
      if (props.checker.isKing) {
        classes += " king";
      }
    }
    return (
      <div className={classes}></div>
    )
  }
  
  export default Piece;