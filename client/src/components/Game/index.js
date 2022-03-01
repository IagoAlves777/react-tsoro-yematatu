import "./styles.css";
import Chat from "../Chat";
import { useState } from "react";
import io from "socket.io-client";

function Game({
  changeColor,
  top,
  mid1,
  mid2,
  mid3,
  bottom1,
  bottom2,
  bottom3
}) {
  
  return (
    <div className="game_div">
      <div className="main_div">
        <div className="top_div">
          <div
            className={`point point--${top.colorPoint}`}
            onClick={() => changeColor(top)}
          ></div>
        </div>
        <div className="mid_div">
          <div
            className={`point point--${mid1.colorPoint}`}
            onClick={() => changeColor(mid1)}
          ></div>
          <div
            className={`point point--${mid2.colorPoint}`}
            onClick={() => changeColor(mid2)}
          ></div>
          <div
            className={`point point--${mid3.colorPoint}`}
            onClick={() => changeColor(mid3)}
          ></div>
        </div>
        <div className="bottom_div">
          <div
            className={`point point--${bottom1.colorPoint}`}
            onClick={() => changeColor(bottom1)}
          ></div>
          <div
            className={`point point--${bottom2.colorPoint}`}
            onClick={() => changeColor(bottom2)}
          ></div>
          <div
            className={`point point--${bottom3.colorPoint}`}
            onClick={() => changeColor(bottom3)}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Game;
