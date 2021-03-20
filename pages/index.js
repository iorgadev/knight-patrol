import { useEffect, useState } from "react";
import Board from "../components/Board";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [score, setScore] = useState(0);

  const updateScore = (s) => {
    setScore(score + s);
    console.log(score);
  };

  return (
    <>
      <div className="flex items-center justify-between w-full h-screen pr-10 space-y-2 bg-gray-900">
        {/* make the board */}
        <div className="flex items-center justify-center w-full">
          <div className="w-auto bg-gray-500">
            <Board scoreChange={updateScore} />
          </div>
        </div>

        {/* stats */}
        <div className="flex-none bg-gray-700 w-60">
          <div className="flex flex-col px-5 py-5 space-y-2">
            <span className="text-lg font-bold text-gray-300">
              Score: {score}
            </span>
            <button className="p-3 text-white border">Start New Game</button>
            <button className="p-3 text-white border">Button</button>
            <button className="p-3 text-white border">Button</button>
          </div>
        </div>
      </div>
    </>
  );
}
