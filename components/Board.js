import { useState, useEffect } from "react";
import styles from "../styles/Board.module.css";
// import knight from "../public/knight.svg";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

const Board = ({ scoreChange }) => {
  const [board, setBoard] = useState([]);
  const [player, setPlayer] = useState(getRandomInt(64));

  useEffect(() => {
    setBoard(createBoard());
  }, []);

  useEffect(() => {
    // console.log(player);
  }, [board]);

  //create board
  const createBoard = () => {
    let _board = [];
    let cur = 0;
    // setPlayer(5);

    for (let file = 0; file < 8; file++) {
      for (let rank = 0; rank < 8; rank++) {
        _board[cur++] = square(cur);
      }
    }

    return _board;
  };

  //update board
  const updateBoard = () => {
    if (player) {
      let _board = board;
      for (let i in board) {
      }
    }
  };

  let h = [2, 1, -1, -2, -2, -1, 1, 2];
  let v = [-1, -2, -2, -1, 1, 2, 2, 1];
  let moves = [-6, -15, -17, -10, 6, 15, 17, 10];

  const clicked = (pos) => {
    if (canMove(pos)) {
      let _board = board;
      _board[player].active = false;
      _board[pos].active = true;
      _board[pos].visited = true;
      setPlayer(pos);
      setBoard(_board);
      scoreChange(1);
    }
  };

  const canMove = (pos) => {
    let moveable = false;
    let movePos;

    let xy = getXY(player);
    for (let i = 0; i < 8; i++) {
      movePos = player + moves[i];

      if (
        movePos == pos &&
        validBounds({ x: xy.x + h[i], y: xy.y + v[i] }) &&
        !board[pos].visited
      ) {
        moveable = true;
      }
    }
    return moveable;
  };

  let lightTiles = [1, 3, 5];
  let darkTiles = [2, 6, 7];

  const drawSquare = (pos) => {
    // console.log(board[pos].tile);
    return (
      <div
        id={pos}
        key={pos}
        style={{
          backgroundImage: `url('./tiles/floor_${board[pos].tile}.png')`,
        }}
        className={
          styles.tile +
          ` flex items-center justify-center
            ${canMove(pos) ? styles["can-move"] : ` `}
            ${board[pos].visited ? styles["visited"] : ` `}
            ${isLightSquare(pos) ? styles["tile-light"] : styles["tile-dark"]}`
        }
        onClick={(e) => clicked(pos)}
      >
        {board[pos].active ? (
          <img className={styles.player} src="./player-2.png" />
        ) : (
          // <h1 className={styles.num}>{pos}</h1>
          ""
        )}
      </div>
    );
  };

  let square = (pos) => {
    let lightTile = lightTiles[getRandomInt(3) - 1];
    let darkTile = darkTiles[getRandomInt(3) - 1];
    console.log(lightTile);
    return {
      x: getXY(pos).x,
      y: getXY(pos).y,
      pos: pos,
      light: isLightSquare(pos),
      selected: pos - 1 == player,
      visited: pos - 1 == player,
      active: pos == player + 1,
      canMove: false,
      tile: isLightSquare(pos) ? darkTile : lightTile,
    };
  };

  //turn a 1-64 position into X,Y coords
  const getXY = (i) => {
    return {
      x: i % 8,
      y: Math.floor(i / 8),
    };
  };

  //get Valid Bounds for possible moves
  const validBounds = ({ x, y }) => {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
  };

  //for checkered pattern of a chessboard
  const isLightSquare = (pos) => getXY(pos).x % 2 == getXY(pos).y % 2;

  //if current square is selected by user
  const isSelected = (pos) => board[pos].selected;

  return (
    <div id="board" className={styles.board}>
      {board.map((e, pos) => drawSquare(pos))}
    </div>
  );
};

export default Board;
