const PLAYER_ONE = 1;
const PLAYER_TWO = 2;

export const getAllMoves = (player,checkers,board)=> {
    let moves = { jumps: [], singles: [] };
    checkers.forEach((checker, index) => {
      if (checker.player == player && !checker.removed) {
        let cMoves = getMovesOfChecker(index,checkers,board);
        moves.jumps = (moves.jumps).concat(cMoves.jumps);
        moves.singles = (moves.singles).concat(cMoves.singles);
      }
    });
    return moves;
  }

 