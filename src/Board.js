import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps={
    nrows:5, 
    ncols:5 
  }
  constructor(props) {
    super(props);
    this.state={
      board: this.createBoard(),
      hasWon:false,
    }
    this.handleClick=this.handleClick.bind(this); 
  }


  createBoard() {
    let {ncols, nrows} = this.props;
    let board = [];
    for (let i=0;i<nrows;i++){
      let rows=[];
      for (let j=0;j<ncols;j++){
          rows.push(Math.random()<=0.2); 
      }
      board.push(rows); 
    }
    return board;
  }

  toggle(i,j,board){
    let {ncols, nrows} = this.props;
    if (i >= 0 && i < nrows && j >= 0 &&  j< ncols  ) {
      board[i][j] = !board[i][j];
    }
  }

  flipCellsAround(coord) {
    let [i, j] = coord.split("-").map(Number);
    let board= this.state.board; 
    this.toggle(i,j,board);
    this.toggle(i-1,j,board); 
    this.toggle(i+1,j,board); 
    this.toggle(i,j-1,board);
    this.toggle(i,j+1,board); 
    this.setState({ board:board, hasWon:board.every(row=> row.every(cell => !cell))})
  }

  handleClick(){
    this.setState({
      board: this.createBoard(),
      hasWon:false,
    });
  }

  render() {
    if (this.state.hasWon){
        return (
          <div className='Board-message'>
            <h1 className="Board-winner">Lights Out!! You Won the Game</h1>
            <button className="Board-reset" onClick={this.handleClick}>Restart</button>
          </div>
        )
    }

      let content=[]; 
      let {ncols, nrows} = this.props;
      let board = this.state.board;

      for (let i=0;i<nrows;i++){
        let row=[] 
        for (let j=0;j<ncols;j++){
            let coords= `${i}-${j}`
            let td=<Cell key={coords} isLit={board[i][j]} flipCellsAroundMe={()=>this.flipCellsAround(coords)} />; 
            row.push(td); 
        }
        content.push(<tr key={i}>{row}</tr>)

    }
      return (
        <div>
          <div className="Board-title">
            <div className='Board-name'>Lights Out</div>
          </div>
          <table className="Board">
            <tbody>
              {content}
            </tbody>
          </table>
          <button className="Board-reset"onClick={this.handleClick}>Reset</button>
        </div>
    )
  }
}


export default Board;
