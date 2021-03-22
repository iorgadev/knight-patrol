import { useState, useEffect } from "react";
import styles from "../styles/Board.module.css";
import Menu from "../components/Menu";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

// sleep time expects milliseconds
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const Board = ({ scoreChange, currentGame, options }) => {
  const [board, setBoard] = useState([]);
  const [player, setPlayer] = useState(-1);
  const [justMoved, setJustMoved] = useState(false);
  const [gameID, setGameID] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [possibleMoves, setPossibleMoves] = useState(8);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    //start new game
    setGameID(1);
  }, []);

  useEffect(() => {
    setPlayer(getRandomInt(63));
  }, [currentGame]);

  useEffect(() => {
    if (gameID != currentGame) {
      setGameID(currentGame);
      scoreChange(0);
      setPossibleMoves(movesAllowed());
      sleep(100).then(() => {
        setBoard(createBoard());
        sleep(100).then(() => {
          for (let i = 0; i < 64; i++) {
            let sq = document.getElementById(i);
            sq.style.transform = "none";
          }
        });
      });
    } else {
      setPossibleMoves(movesAllowed());
    }
  }, [player]);

  useEffect(() => {
    // if (board.length > 0)
    //   for (let i = 0; i < 64; i++) {
    //     let sq = document.getElementById(i);
    //     sq.style.transform = "translateY(0%) translateX(0%)";
    //   }
  }, [board]);

  useEffect(() => {
    if (board.length > 0 && possibleMoves === 0) {
      //game over here
      //
      //
      let sq = document.getElementById(player);
      sq.style.transform = "translateY(200%)";
      // let menuWidth = 4;
      // let menuHeight = 6;
      // for (let x = 0; x < menuWidth; x++) {
      //   for (let y = 0; y < menuHeight; y++) {
      //     sleep((x + y) * 50).then(() => {
      //       let sq = document.getElementById(10 + x + y * 8);
      //       sq.style.transform = "translateY(600%)";
      //       console.log("moved sq: ", 24 + x + y * 8);
      //     });
      //   }
      // }
    }
  }, [possibleMoves]);

  const toggleMenu = () => {
    setMenu;
  };

  //create board
  const createBoard = () => {
    let _board = [];
    let curPos = 0;

    for (let file = 0; file < 8; file++) {
      for (let rank = 0; rank < 8; rank++) {
        _board[curPos++] = square(curPos);
      }
    }

    return _board;
  };

  let square = (pos) => {
    let lightTile = lightTiles[getRandomInt(3) - 1];
    let darkTile = darkTiles[getRandomInt(3) - 1];
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

  // can move
  let h = [2, 1, -1, -2, -2, -1, 1, 2];
  let v = [-1, -2, -2, -1, 1, 2, 2, 1];
  let moves = [-6, -15, -17, -10, 6, 15, 17, 10];
  const movesAllowed = () => {
    let count = 0;
    if (board.length > 0)
      for (let i = 0; i < 64; i++) if (canMove(i).moveable) count++;
    return count;
  };

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
        break;
      }
    }
    return {
      moveable: moveable,
      xMove: move.x,
      yMove: move.y,
    };
  };

  const clicked = (pos) => {
    //testing movesALlowed
    // console.log(possibleMoves);
    if (isMoving) return;
    let movePos = canMove(pos);
    if (movePos.moveable) {
      // setPossibleMoves(movesAllowed());
      setIsMoving(true);
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
              }px, ${y * 96 * Math.sign(movePos.yMove)}px) 
              rotate(${10 * Math.sign(movePos.xMove)}deg)`;

              //register the player move
              if (y == Math.abs(movePos.yMove) && !finalDelay) {
                finalDelay = true;
                sleep(delay).then(() => {
                  setJustMoved(true);
                  _board[player].active = false;
                  _board[pos].active = true;
                  _board[pos].visited = true;
                  // _board[pos].canMove = true;
                  setPlayer(pos);
                  setBoard(_board);
                  scoreChange(1);
                  sleep(delay).then(() => {
                    setJustMoved(false);
                    setIsMoving(false);
                    // setPossibleMoves(movesAllowed(pos));
                  });
                });
              } //end setting player movement
            });
          } //end y loop
        });
      } //end x loop
    }
  };

  let lightTiles = [1, 3, 5];
  let darkTiles = [2, 6, 7];

  const drawSquare = (pos) => {
    let moveData = canMove(pos);

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
            ${moveData.moveable && !options.hardMode ? styles["can-move"] : ` `}
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

  return (
    <>
      <div
        id="board"
        className={`${styles.board} ${
          justMoved && options.screenShake ? styles.shake : ``
        }`}
      >
        {board.map((e, pos) => drawSquare(pos))}
      </div>
    </>
  );
};

export default Board;
