import React,{Component} from 'react';
import Piece from './Piece'
class Square extends Component {
    render() {
      let color = (this.props.row + this.props.column) % 2 === 0 ? "white" : "black";
      let selection = this.props.selected ? " selected" : "";
      let classes = "square " + color + selection;
      return (
        <div className={classes} onClick={() => this.props.selectSquare(this.props.row, this.props.column)}>
          {this.props.val != null &&
            <Piece checker={this.props.val}
            players={this.props.players} />
          }
        </div>
      )
    }
  }

  export default Square;