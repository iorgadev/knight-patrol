import { useState, useEffect } from "react";
import styles from "../styles/Board.module.css";
// import knight from "../public/knight.svg";

const Board = () => {
  const [selected, setSelected] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [board, setBoard] = useState([]);

  // const [state, setstate] = useState(initialState)
  const [player, setPlayer] = useState(5);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setBoard(createBoard());
  }, []);

  useEffect(() => {
    // console.log(player);
  }, [board]);

  const createBoard = (playerPos = 0) => {
    let _board = [];
    let cur = 0;
    setPlayer(5);

    for (let file = 0; file < 8; file++) {
      for (let rank = 0; rank < 8; rank++) {
        _board[cur++] = square(cur);
      }
    }

    return _board;
  };

  const updateBoard = () => {
    if (player) {
      let _board = board;
      for (let i in board) {
        // console.log(i);
      }
    }
  };

  let h = [2, 1, -1, -2, -2, -1, 1, 2];
  let v = [-1, -2, -2, -1, 1, 2, 2, 1];
  let moves = [-6, -15, -17, -10, 6, 15, 17, 10];

  const clicked = (pos) => {
    if (player && canMove(pos)) {
      let _board = board;
      _board[player].active = false;
      _board[pos].active = true;
      // setBoard(_board);
      setPlayer(pos);
      setBoard(_board);
      // console.log(_board);
      console.log(canMove(pos));
    }
  };

  const canMove = (pos) => {
    let moveable = false;
    let movePos;
    // console.log(player);
    let xy = getXY(player);
    for (let i = 0; i < 8; i++) {
      movePos = player + moves[i];
      // newBounds = getXY(pos);
      if (movePos == pos && validBounds({ x: xy.x + h[i], y: xy.y + v[i] })) {
        moveable = true;
      }
    }
    return moveable;
  };

  const drawSquare = (pos) => {
    return (
      <div
        id={pos}
        key={pos}
        className={
          styles.tile +
          ` 
            ${canMove(pos) ? styles["can-move"] : ` `}
            ${isLightSquare(pos) ? styles["tile-light"] : styles["tile-dark"]}`
        }
        onClick={(e) => clicked(pos)}
      >
        {board[pos].active ? (
          <img className={styles.player} src="./knight.svg" />
        ) : (
          <h1 className={styles.num}>{pos}</h1>
        )}
      </div>
    );
  };

  let square = (pos) => {
    // console.log(playerPos);
    // console.log(pos == playerPos + 1 ? pos : "");
    return {
      x: getXY(pos).x,
      y: getXY(pos).y,
      pos: pos,
      light: isLightSquare(pos),
      selected: pos == player,
      visited: false,
      active: pos == player + 1,
      canMove: false,
    };
  };

  const getXY = (i) => {
    return {
      x: i % 8,
      y: Math.floor(i / 8),
    };
  };

  //needs fix for board object
  const validBounds = ({ x, y }) => {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
    // return pos >= 0 && pos <= 63;
  };

  const isLightSquare = (pos) => getXY(pos).x % 2 == getXY(pos).y % 2;
  const isSelected = (pos) => board[pos].selected;

  return (
    <div id="board" className={styles.board}>
      {board.map((e, pos) => drawSquare(pos))}
    </div>
  );
};

export default Board;
