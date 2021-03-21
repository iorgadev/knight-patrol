import { useState, useEffect } from "react";

// sleep time expects milliseconds
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

//get settings
const getHardMode = () => {
  return parseInt(localStorage.getItem("hardmode"));
};

const Menu = ({ newGame, updateSettings, highScore, settings }) => {
  const [menuOption, setMenuOption] = useState(0);
  const [hardMode, setHardMode] = useState(0);

  const toggleHardMode = () => {
    // let hard = getHardMode();
    let hard = settings.hardMode;
    console.log("settings hard: ", settings.hardMode);
    if (hard) {
      localStorage.setItem("hardmode", "0");
      setHardMode(0);
      console.log("hardmode is: ", hard);
    } else {
      localStorage.setItem("hardmode", "1");
      setHardMode(1);
      console.log("hardmode is: ", hard);
    }
    updateSettings();
  };

  useEffect(() => {
    setHardMode(getHardMode());
  }, []);

  function toggleMenu(option = 0) {
    let menuOption = document.getElementById("menu-" + option);
    menuOption.classList.remove("hidden");
    sleep(100).then(() => {
      setMenuOption(option);
    });
  }

  function backToMain() {
    let menu = document.getElementById("menu-" + menuOption);
    menu.classList.remove("slide-menu");
    sleep(500).then(() => {
      setMenuOption(0);
    });
  }

  return (
    <>
      <div className="menu-container">
        <div className="menu">
          <div id="menu-0" className={menuOption == 0 ? `menu-1` : `menu-1`}>
            <div className="flex flex-col px-2 py-5 space-y-5">
              <button className="new-game button" onClick={newGame}>
                <img className="icon" src="./player.png" />
                <span className="new-game">New Game</span>
              </button>
              <button className="button" onClick={(e) => toggleMenu(3)}>
                <img className="icon" src="./highscore.png" />
                <span className="name">Highscore</span>
              </button>
              <button className="button" onClick={(e) => toggleMenu(2)}>
                <img className="icon" src="./icons/about.png" />
                <span className="name">About Me</span>
              </button>
              <button className="button" onClick={(e) => toggleMenu(1)}>
                <img className="icon" src="./settings.png" />
                <span className="name">Settings</span>
              </button>
            </div>
          </div>

          {/* settings menu */}
          <div
            id="menu-1"
            className={menuOption == 1 ? `menu-1 slide-menu` : `hidden`}
          >
            <div className="flex flex-col w-full px-2 py-4 space-y-1">
              <button className="go-back button" onClick={backToMain}>
                <img className="icon" src="./icons/altar.png" />
                <span className="">Back</span>
              </button>
              <span className="text-5xl text-white uppercase">Settings</span>
              <button
                className={`button ${settings.hardMode ? `` : `disabled`}`}
                onClick={toggleHardMode}
              >
                <img className="icon" src="./icons/hard.png" />
                <div className="flex flex-col items-start">
                  <span className="name">Hard Mode</span>
                  <span className="text-sm text-white">
                    [{settings.hardMode ? `✔️` : `❌`}] hide possible moves
                  </span>
                </div>
              </button>
              <button className="button disabled">
                <img className="icon" src="./icons/time.png" />
                <span className="name">Hide Timer</span>
              </button>
              <button className="button disabled">
                <img className="icon" src="./icons/startpos.png" />
                <span className="name">Random Start</span>
              </button>
            </div>
          </div>

          {/* about me menu */}
          <div
            id="menu-2"
            className={menuOption == 2 ? `menu-1 slide-menu` : `hidden`}
          >
            <div className="flex flex-col w-full px-2 py-5 space-y-1">
              <button className="go-back button" onClick={backToMain}>
                <img className="icon" src="./icons/altar.png" />
                <span className="">Back</span>
              </button>

              <div className="w-full h-full space-y-2 ">
                <div className="flex flex-col items-center justify-center h-full text-5xl text-white uppercase bg-red-900 border-8 border-red-600 border-opacity-20 bg-opacity-30">
                  <span className="text-5xl text-[#b4202a] uppercase">
                    About Me
                  </span>

                  <div className="flex mt-4 space-x-2">
                    <img src="./adrian-pixel.png" className="w-20 h-20" />
                    <div className="flex flex-col text-white">
                      <span className="text-2xl">Adrian Iorga</span>
                      <span className="text-lg">Full Stack Dev</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* highscore menu */}
          <div
            id="menu-3"
            className={menuOption == 3 ? `menu-1 slide-menu` : `hidden`}
          >
            <div className="flex flex-col w-full px-2 py-5 space-y-1">
              <button className="go-back button" onClick={backToMain}>
                <img className="icon" src="./icons/altar.png" />
                <span className="">Back</span>
              </button>

              <div className="w-auto h-full space-y-2 ">
                <div className="flex flex-col items-center justify-center h-full text-5xl text-white uppercase bg-red-900 border-8 border-red-600 border-opacity-20 bg-opacity-30">
                  <span>Highscore:</span>
                  <span>{highScore}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* banner */}
        <div className="hidden">
          <div className="banner"></div>
        </div>
      </div>
    </>
  );
};

export default Menu;
