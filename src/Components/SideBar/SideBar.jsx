import React, { useState } from "react";
import { assets } from "../../assets/assets";
import "./sidebar.css";
import { useContext } from "react";
import { AppContext } from "../../context/Context";
export default function SideBar(props) {
  const [extended, setExtended] = useState(false);
  const { prevPrompts, onsent, setPrevPrompts, setRecentPrompt, resetChat } =
    useContext(AppContext);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);

    // Save prompt to previous list if not already there
    if (!prevPrompts.includes(prompt)) {
      setPrevPrompts((prev) => [...prev, prompt]);
    }

    await onsent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          src={assets.menu_icon}
          alt="menu"
          onClick={() => {
            setExtended((prev) => !prev);
          }}
        />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? (
            <p
              onClick={() => {
                resetChat();
              }}
            >
              New Chat
            </p>
          ) : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className="recent-entry"
                >
                  <img src={assets.message_icon} alt="msg img" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item  recent-entry">
          <img src={assets.question_icon} alt="que" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="que" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="que" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
}
