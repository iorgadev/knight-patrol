import { useState } from "react";

// sleep time expects milliseconds
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const Menu = () => {
  const [menuOption, setMenuOption] = useState(0);
  const [settingsMenu, setSettingsMenu] = useState(false);

  function toggleMenu(option = 0) {
    let menuOption = document.getElementById("menu-" + option);
    menuOption.classList.remove("hidden");
    sleep(100).then(() => {
      console.log("set option: ", option);
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
              <button className="new-game button">
                <img className="icon" src="./player.png" />
                <span className="new-game">New Game</span>
              </button>
              <button className="button">
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
            <div className="flex flex-col px-2 py-5 space-y-1">
              <button className="go-back button" onClick={backToMain}>
                <img className="icon" src="./player.png" />
                <span className="">Back</span>
              </button>
              <button className="button">
                <img className="icon" src="./icons/hard.png" />
                <div className="flex flex-col">
                  <span className="name">Hard Mode</span>
                  <span className="text-sm text-white">
                    hide possible moves
                  </span>
                </div>
              </button>
              <button className="button">
                <img className="icon" src="./icons/time.png" />
                <span className="name">Hide Timer</span>
              </button>
              <button className="button">
                <img className="icon" src="./icons/startpos.png" />
                <span className="name">Random Start</span>
              </button>
            </div>
          </div>

          <div
            id="menu-2"
            className={menuOption == 2 ? `menu-1 slide-menu` : `hidden`}
          >
            <div className="flex flex-col px-2 py-5 space-y-1">
              <button className="go-back button" onClick={backToMain}>
                <img className="icon" src="./player.png" />
                <span className="">About</span>
              </button>
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
