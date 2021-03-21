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
        <div className="flex justify-center flex-none w-full whitespace-nowrap">
          <img className="logo" src="./logo-3.png" />
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
          <div className="flex flex-col items-start transition-all duration-300 transform w-80">
            <div className="menu">
              <div className="flex flex-col px-2 py-5 space-y-5">
                <span className="score">Score: {score}</span>
                <button className="new-game button">
                  <img className="icon" src="./player.png" />
                  <span className="new-game">New Game</span>
                </button>
                <button className="button">
                  <img className="icon" src="./highscore.png" />
                  <span className="name">Highscore</span>
                </button>
                <button className="button">
                  <img className="icon" src="./settings.png" />
                  <span className="name">Settings</span>
                </button>
              </div>

              {/* banner */}
            </div>
            <div className="relative">
              <div className="banner"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
