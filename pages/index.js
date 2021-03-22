import { useEffect, useState } from "react";
import Head from "next/head";
import Board from "../components/Board";
import Menu from "../components/Menu";
import styles from "../styles/Home.module.css";

//get settings
const getHardMode = () => {
  return parseInt(localStorage.getItem("hardmode"));
};

export default function Home() {
  const [currentGame, setCurrentGame] = useState(0);
  const [score, setScore] = useState(0);
  const [settings, setSettings] = useState({});
  const [highScore, setHighScore] = useState(0);

  const updateSettings = () => {
    let options = {
      hardMode: getHardMode(),
    };
    setSettings(options);
  };

  useEffect(() => {
    //initial settings
    if (localStorage.getItem("hardmode") === null) {
      localStorage.setItem("hardmode", "0");
      console.log("initial hard mode set off");
    }
    setSettings({ hardMode: getHardMode() });
    setHighScore(getHighScore());
  }, []);

  const updateScore = (s) => {
    setScore(score + s);
  };

  const newGame = () => {
    setCurrentGame(currentGame + 1);
    setScore(0);
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
      setHighScore(score);
      console.log("New High Score: ", score);
    }
  }, [score]);

  return (
    <>
      <Head>
        <title>Knight Patrol Game</title>
        <meta
          name="description"
          content="Knight Patrol is a chess game based on Knight's Tour. Made in React, by Adrian Iorga."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Adrian Iorga" />
        <meta property="og:image" content="/knight-patrol-thumb2.png" />
      </Head>
      <div className="main">
        <div className="flex flex-col lg:flex-row lg:space-x-10">
          {/* make the board */}
          <div className="flex items-center justify-center">
            <div className="flex md:hidden">
              <h1 className="text-white">
                Unfortunately mobile support not available at the moment.
                <br />
                Please check again on tablet or desktop devices.
              </h1>
            </div>
            <div className="hidden md:flex md:p-0 lg:p-10 board-container">
              <Board
                scoreChange={updateScore}
                currentGame={currentGame}
                options={settings}
              />
            </div>
          </div>

          {/* menu */}
          <div className="flex flex-col items-center justify-center space-y-2 md:flex-row lg:flex-col">
            <div className="flex flex-col">
              <div className="flex flex-col items-center justify-center flex-none mb-10 lg:w-full whitespace-nowrap">
                <h1 className="title">
                  <span className="mr-2 text-6xl lg:text-8xl">KNIGHT</span>
                  <img className="logo" src="./logo-3.png" />
                  <br />
                  PATROL
                </h1>
              </div>
              <div className="score">
                <span>Score:</span>
                <span>{score}</span>
              </div>
            </div>
            <Menu
              newGame={newGame}
              updateSettings={updateSettings}
              highScore={highScore}
              settings={settings}
            />
          </div>
        </div>
      </div>
    </>
  );
}
