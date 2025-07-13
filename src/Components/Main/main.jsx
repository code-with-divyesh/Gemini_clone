import { assets } from "../../assets/assets";
import "./main.css";
import { AppContext } from "../../context/Context";
import { useContext } from "react";
import { marked } from "marked";

export default function Main() {
  const {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    response,
    setResponse,
    loading,
    setLoading,
    showResult,
    setShowResult,
    prevPrompts,
    setprevPrompts,
    onsent,
  } = useContext(AppContext);

  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported in your browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    let voiceTextCaptured = false;

    recognition.onstart = () => {
      console.log("🎤 Voice recognition started...");
    };

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      voiceTextCaptured = true;
      console.log("🗣️ You said:", voiceText);

      if (!/^[\x00-\x7F]*$/.test(voiceText)) {
        alert("⚠️ Please give input in English.");
        return;
      }

      setInput(voiceText);
      onsent(voiceText);
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      alert("Voice Error: " + event.error);
    };

    recognition.onend = () => {
      console.log("🎤 Voice recognition ended.");
      if (!voiceTextCaptured) {
        alert("Didn't hear anything. Please try again.");
      }
    };

    recognition.start();
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            {" "}
            <div className="greet">
              <p>
                <span>Hello Dev</span>
              </p>
              <p>How can I Help You Today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  onsent(
                    "Plan a magical road trip with hidden gems and scenic views!"
                  )
                }
              >
                <p>
                  ✨ Plan a magical road trip with hidden gems and scenic views!
                </p>
                <img src={assets.compass_icon} alt="compass" />
              </div>
              <div
                className="card"
                onClick={() =>
                  onsent(` Give me creative ideas to surprise my best friend’s
                  birthday!`)
                }
              >
                <p>
                  💡 Give me creative ideas to surprise my best friend’s
                  birthday!
                </p>
                <img src={assets.bulb_icon} alt="bulb" />
              </div>
              <div
                className="card"
                onClick={() =>
                  onsent(
                    "Recommend mind-blowing sci-fi movies I can binge tonight"
                  )
                }
              >
                <p>
                  🎥 Recommend mind-blowing sci-fi movies I can binge tonight
                </p>
                <img src={assets.message_icon} alt="message" />
              </div>
              <div
                className="card"
                onClick={() =>
                  onsent(
                    " Help me cook something fancy with just bread and eggs!"
                  )
                }
              >
                <p>👨‍🍳 Help me cook something fancy with just bread and eggs!</p>
                <img src={assets.youtube_icon} alt="youtube" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt} </p>
            </div>
            <div className="gemini-response">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: marked(response) }} />
              )}
            </div>
          </div>
        )}

        {/* RESPONSE SECTION – Add dynamic response here later */}
        {/* 
        <div className="response-box">
          <h3>Gemini says:</h3>
          <p>{response}</p>
        </div> 
        */}
      </div>

      <div className="main-bottom">
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter a prompt here"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") onsent(input);
            }}
          />
          <img
            src={assets.gallery_icon}
            alt="gallery"
            onClick={() => {
              alert("image upload feature is not provided yet!!Sorry!!");
            }}
          />
          <img src={assets.mic_icon} alt="mic" onClick={handleVoiceInput} />
          <img
            src={assets.send_icon}
            alt="send"
            onClick={() => {
              onsent(input);
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
        <p className="bottom-info">
          Gemini may display inaccurate info, including about people, so
          double-check its responses. Your privacy and Gemini Apps
        </p>
      </div>
    </div>
  );
}
