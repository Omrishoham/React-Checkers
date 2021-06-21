import React,{Component} from 'react'
import Row from './Row'
import './CheckersBoard.css'
class CheckersBoard extends Component {
    render() {
      let selectedRow = this.props.choosedSquare ? this.props.choosedSquare.row : null;
      let rows = this.props.board.map((row, i) => {
        return <Row key={i} 
                row={row} 
                choosedSquare={i === selectedRow ? this.props.choosedSquare : null}
                rowNum={i} 
                checkers={this.props.checkers}
                selectSquare={this.props.selectSquare}
                players={this.props.players} />;
      });
      return (
        <div className="board">
          {rows}
        </div>
      )
    }
  }

  export default CheckersBoard;