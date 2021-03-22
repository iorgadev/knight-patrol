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
  // const [hardMode, setHardMode] = useState(0);

  const toggleHardMode = () => {
    // let hard = getHardMode();
    let hard = settings.hardMode;
    if (hard) {
      localStorage.setItem("hardmode", "0");
      // setHardMode(0);
    } else {
      localStorage.setItem("hardmode", "1");
      // setHardMode(1);
    }
    updateSettings();
  };

  const toggleScreenshake = () => {
    let shake = settings.screenShake;
    console.log(settings.screenShake);
    localStorage.setItem("screenshake", shake ? "0" : "1");
    updateSettings();
  };

  useEffect(() => {
    // setHardMode(getHardMode());
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
            <div className="flex flex-col px-2 space-y-1 lg:py-5 lg:space-y-5">
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

              <div className="flex flex-col items-start justify-center h-full text-5xl text-white uppercase bg-red-900 border-8 border-red-600 border-opacity-20 bg-opacity-30">
                <span className="hidden mx-auto md:flex menu-title">
                  Settings
                </span>

                {/* hard mode  */}
                <button
                  className={`button ${settings.hardMode ? `` : `disabled`}`}
                  onClick={toggleHardMode}
                >
                  <img className="icon" src="./icons/hard.png" />
                  <div className="flex flex-col items-start text-4xl">
                    <span className="name">Hard Mode</span>
                    <span className="text-sm text-white">
                      [{settings.hardMode ? `✔️` : `❌`}] hide possible moves
                    </span>
                  </div>
                </button>

                {/* hide timer  */}
                <button
                  className={`button ${
                    !settings.screenShake ? `disabled` : ``
                  }`}
                >
                  <img className="icon" src="./icons/shake.png" />
                  <div
                    className="flex flex-col items-start text-4xl"
                    onClick={toggleScreenshake}
                  >
                    <span className="name">Screenshake</span>
                    <span className="text-sm text-white">
                      [{settings.screenShake ? `✔️` : `❌`}] screenshake on
                      player move
                    </span>
                  </div>
                </button>

                {/* random start pos  */}
                <button className="button disabled">
                  <img className="icon" src="./icons/startpos.png" />
                  <div className="flex flex-col items-start text-4xl">
                    <span className="name">Random Start</span>
                    <span className="text-sm text-white">
                      [{settings.randomStartPos ? `✔️` : `✔️`}] random start
                      position
                    </span>
                  </div>
                </button>
              </div>
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
                  <span className="menu-title">About Me</span>

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
