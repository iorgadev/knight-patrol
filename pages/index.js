import { useEffect, useState } from "react";
import Board from "../components/Board";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen space-y-2 bg-gray-900">
        <div className="flex space-x-4">
          <button className="p-3 text-white border">Button</button>
          <button className="p-3 text-white border">Button</button>
          <button className="p-3 text-white border">Button</button>
        </div>
        <div className="w-auto h-auto bg-gray-500">
          {/* make the board */}
          {/* <div className="grid grid-cols-8 gap-0"> */}
          <Board />
          {/* </div> */}
        </div>
      </div>

      {/* stats */}
      <div className="w-full h-48 bg-gray-700"></div>

      <div className="box-border w-10 h-10 bg-yellow-200 bg-yellow-700 bg-yellow-900 border-yellow-200 border-yellow-700 border-yellow-900 border-blue-700"></div>
    </>
  );
}
