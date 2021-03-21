import { useEffect, useState } from "react";
import Board from "../components/Board";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [score, setScore] = useState(0);

  const updateScore = (s) => {
    setScore(score + s);
  };

  function getHighScore() {
    // let hs = localStorage.getItem("highscore");
    // console.log(hs);
    return localStorage.getItem("highscore")
      ? localStorage.getItem("highscore")
      : 0;
  }

  //check ls for highscore
  useEffect(() => {
    let currentHighScore = getHighScore();
    console.log(currentHighScore);
    //if exists, is ls hs > current score, set it
    if (score > currentHighScore) {
      localStorage.setItem("highscore", score);
      console.log("New High Score: ", score);
    }
  }, [score]);

  return (
    <>
      <div className="main">
        <div className="flex-none">
          <h1 className="title">KNIGHT PATROL</h1>
        </div>
        <div className="flex flex-grow space-x-10">
          {/* make the board */}
          <div className="flex items-start justify-center">
            <div className="p-20 board-container">
              <Board scoreChange={updateScore} />
            </div>
          </div>

          {/* menu */}
          <div className="flex items-start transition-all duration-300 transform">
            <div className="menu">
              <div className="flex flex-col px-5 py-5 space-y-2">
                <span className="score">Score: {score}</span>
                <button className="button">Start New Game</button>
                <button className="button">Highscore</button>
                <button className="button">Settings</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
