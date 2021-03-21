import { useEffect, useState } from "react";
import Board from "../components/Board";
import Menu from "../components/Menu";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [score, setScore] = useState(0);

  const updateScore = (s) => {
    setScore(score + s);
  };

  function getHighScore() {
    return localStorage.getItem("highscore")
      ? localStorage.getItem("highscore")
      : 0;
  }

  //check ls for highscore
  useEffect(() => {
    let currentHighScore = getHighScore();
    //if exists, is ls hs > current score, set it
    if (score > currentHighScore) {
      localStorage.setItem("highscore", score);
      console.log("New High Score: ", score);
    }
  }, [score]);

  return (
    <>
      <div className="main">
        <div className="flex flex-grow space-x-10">
          {/* make the board */}
          <div className="flex items-center justify-center pt-10">
            <div className="p-20 board-container">
              <Board scoreChange={updateScore} />
            </div>
          </div>

          {/* menu */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex flex-col items-center justify-center flex-none w-full mb-10 whitespace-nowrap">
              <h1 className="title">
                <span className="mr-2 text-8xl">KNIGHT</span>
                <img className="logo" src="./logo-3.png" />
                <br />
                PATROL
              </h1>
            </div>
            <div className="score">
              <span>Score:</span>
              <span>{score}</span>
            </div>
            <Menu />
          </div>
        </div>
      </div>
    </>
  );
}
