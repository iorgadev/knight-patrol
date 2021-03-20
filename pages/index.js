import Head from "next/head";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  let white = "#ffffff";
  let black = "#000000";
  let currentlySelected = null;
  let previousSelected = null;
  let board = [64];

  let square = (x, y, pos, color) => {
    return {
      x: x,
      y: y,
      pos: pos,
      light: color,
      selected: false,
      visited: false,
      active: false,
      canMove: false,
    };
  };

  const getXY = (i) => {
    return {
      x: i % 8,
      y: Math.floor(i / 8),
    };
  };

  const getBoard = () => {
    return board;
  };

  const getIndex = (pos) => {
    return pos.x + 1 + pos.y * 8;
  };

  const validBounds = (pos) => {
    return pos.x >= 0 && pos.x <= 7 && pos.y >= 0 && pos.y <= 7;
  };

  const isLightSquare = (pos) => getXY(pos).x % 2 == getXY(pos).y % 2;

  const createBoard = () => {
    let _board = [];
    let cur = 0;

    for (let file = 0; file < 8; file++) {
      for (let rank = 0; rank < 8; rank++) {
        let lightSquare = isLightSquare(cur);
        _board[cur++] = square(file, rank, cur, lightSquare);
      }
    }
    // board = _board;
    return _board;
  };

  const drawSquare = (pos) => {
    return (
      <div
        id={pos}
        key={pos}
        className={`w-full box-border border-2 border-yellow-${
          isLightSquare(pos) ? `200` : `700`
        } relative pt-[100%] bg-yellow-${isLightSquare(pos) ? `200` : `700`}`}
        onClick={(e) => clicked(pos)}
      ></div>
    );
  };

  const clicked = (i) => {
    console.log(board[i]);
  };

  useEffect(() => {
    board = createBoard();
  }, [board]);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen space-y-2 bg-gray-900">
        <div className="">
          <button className="p-3 text-white border">test</button>
        </div>
        <div className="w-[800px] h-[800px] bg-gray-500">
          {/* make the board */}
          <div className="grid grid-cols-8 gap-0">
            {createBoard().map((e, pos) => drawSquare(pos))}
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="w-full h-48 bg-gray-700"></div>

      <div className="box-border bg-yellow-200 bg-yellow-700 border-yellow-200 border-yellow-700 border-blue-700"></div>
    </>
  );
}
