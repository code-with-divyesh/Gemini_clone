import React, { createContext, useState } from "react";
import runChat from "../config/gemini";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const onsent = async (prompt) => {
    try {
      setResponse("");
      setLoading(true);
      setShowResult(true);

      let res;
      let finalPrompt = prompt !== undefined ? prompt : input;

      // Add to previous prompts if not already there
      if (!prevPrompts.includes(finalPrompt)) {
        setPrevPrompts((prev) => [finalPrompt, ...prev]);
      }

      setRecentPrompt(finalPrompt);
      res = await runChat(finalPrompt);

      console.log("Gemini Response:", res);
      setResponse(res);
      setLoading(false);
      setInput("");
    } catch (err) {
      console.error("Gemini Error:", err);
      setLoading(false);
    }
  };
  const resetChat = () => {
    setInput("");
    setResponse("");
    setRecentPrompt("");
    setShowResult(false);
    setLoading(false);
  };

  const contextValue = {
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
    setPrevPrompts,
    onsent,
    resetChat,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default ContextProvider;
