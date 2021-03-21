import { useState, useEffect } from "react";
import styles from "../styles/Board.module.css";
// import knight from "../public/knight.svg";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

// sleep time expects milliseconds
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const Board = ({ scoreChange }) => {
  const [board, setBoard] = useState([]);
  const [player, setPlayer] = useState(getRandomInt(63));
  const [justMoved, setJustMoved] = useState(false);

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

  const clicked = async (pos) => {
    let movePos = canMove(pos);
    if (movePos.moveable) {
      let _board = board;

      //*bit* of a mess here, need to revisit.. but hey, it works!
      let playerIcon = document.getElementById("player");
      let delay = 200;
      let currentDelay = 0;
      let finalDelay = false;
      //move player on x axis
      for (let x = 1; x <= Math.abs(movePos.xMove); x++) {
        currentDelay += delay;
        sleep(currentDelay).then(() => {
          playerIcon.style.transform = `translateX(${
            x * 96 * Math.sign(movePos.xMove)
          }px) rotate(${10 * Math.sign(movePos.xMove)}deg)`;

          //move player on y axis
          for (let y = 1; y <= Math.abs(movePos.yMove); y++) {
            currentDelay += delay;
            sleep(currentDelay).then(() => {
              playerIcon.style.transform = `translate(${
                movePos.xMove * 96
              }px, ${y * 96 * Math.sign(movePos.yMove)}px)`;

              //register the player move
              if (y == Math.abs(movePos.yMove) && !finalDelay) {
                finalDelay = true;
                console.log(currentDelay);
                sleep(delay).then(() => {
                  setJustMoved(true);
                  _board[player].active = false;
                  _board[pos].active = true;
                  _board[pos].visited = true;
                  setPlayer(pos);
                  setBoard(_board);
                  scoreChange(1);
                  sleep(delay).then(() => {
                    setJustMoved(false);
                  });
                });
              }
            });
          }
        });
      }
    }
  };

  // can move
  let h = [2, 1, -1, -2, -2, -1, 1, 2];
  let v = [-1, -2, -2, -1, 1, 2, 2, 1];
  let moves = [-6, -15, -17, -10, 6, 15, 17, 10];
  const canMove = (pos) => {
    let moveable = false;
    let movePos;
    let move = { x: 0, y: 0, xAbs: 0, yAbs: 0 };

    let xy = getXY(player);
    for (let i = 0; i < 8; i++) {
      movePos = player + moves[i];

      if (
        movePos == pos &&
        validBounds({ x: xy.x + h[i], y: xy.y + v[i] }) &&
        !board[pos].visited
      ) {
        moveable = true;
        move.x = h[i];
        move.y = v[i];
      }
    }
    return { moveable: moveable, xMove: move.x, yMove: move.y };
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
            ${canMove(pos).moveable ? styles["can-move"] : ` `}
            ${board[pos].visited ? styles["visited"] : ` `}
            ${isLightSquare(pos) ? styles["tile-light"] : styles["tile-dark"]}`
        }
        onClick={(e) => clicked(pos)}
      >
        {board[pos].active || board[pos].justMovedThrough ? (
          <img id="player" className={styles.player} src="./player-2.png" />
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
    // console.log(lightTile);
    return {
      x: getXY(pos).x,
      y: getXY(pos).y,
      pos: pos,
      light: isLightSquare(pos),
      selected: pos - 1 == player,
      visited: pos - 1 == player,
      active: pos == player + 1,
      justMovedThrough: false,
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

  const getPos = ({ x, y }) => {
    return x + y * 8;
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
    <div
      id="board"
      className={`${styles.board} ${justMoved ? styles.shake : ``}`}
    >
      {board.map((e, pos) => drawSquare(pos))}
    </div>
  );
};

export default Board;
