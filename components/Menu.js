import { useState } from "react";

const Menu = () => {
  const [settingsMenu, setSettingsMenu] = useState(false);

  function toggleSettings() {
    setSettingsMenu(!settingsMenu);
  }

  return (
    <>
      <div className="menu-container">
        <div className="menu">
          <div
            id="menu-1"
            className={settingsMenu ? `menu-1 settings-menu` : `menu-1`}
          >
            <div className="flex flex-col px-2 py-5 space-y-5">
              <button className="new-game button">
                <img className="icon" src="./player.png" />
                <span className="new-game">New Game</span>
              </button>
              <button className="button">
                <img className="icon" src="./highscore.png" />
                <span className="name">Highscore</span>
              </button>
              <button className="button" onClick={toggleSettings}>
                <img className="icon" src="./settings.png" />
                <span className="name">Settings</span>
              </button>
              <button className="button" onClick={toggleSettings}>
                <img className="icon" src="./settings.png" />
                <span className="name">About Me</span>
              </button>
            </div>
          </div>
          <div
            id="menu-2"
            className={settingsMenu ? `menu-1 settings-menu` : `menu-1`}
          >
            <div className="flex flex-col px-2 py-5 space-y-1">
              <button className="new-game button">
                <img className="icon" src="./player.png" />
                <span className="new-game">Go Back</span>
              </button>
              <button className="button">
                <img className="icon" src="./highscore.png" />
                <div className="flex flex-col">
                  <span className="name">Hard Mode</span>
                  <span className="text-xs text-white">
                    hide possible moves
                  </span>
                </div>
              </button>
              <button className="button" onClick={toggleSettings}>
                <img className="icon" src="./settings.png" />
                <span className="name">Hide Timer</span>
              </button>
              <button className="button" onClick={toggleSettings}>
                <img className="icon" src="./settings.png" />
                <span className="name">Starting Pos</span>
              </button>
              <button className="button" onClick={toggleSettings}>
                <img className="icon" src="./settings.png" />
                <span className="name">Starting Pos</span>
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
