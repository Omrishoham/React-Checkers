import React,{Component} from 'react'
import Square from './Square'
import './Row.css'
class Row extends Component {
    render() {
      let selectedCol = this.props.choosedSquare ? this.props.choosedSquare.column : null;
      let squares = this.props.row.map((square, i) => {
        return <Square key={i} 
                val={square != null ? this.props.checkers[square] : null} 
                row={this.props.rowNum} 
                column={i} 
                selected={i === selectedCol ? true : false}
                selectSquare={this.props.selectSquare}
                players={this.props.players} />
      });
      return (
        <div className="row">
          {squares}
        </div>
      )
    }
  }

  export default Row;