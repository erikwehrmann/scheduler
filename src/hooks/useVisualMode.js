import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    replace
      ? setHistory((prev) => {
          prev.pop();
          return [...prev, newMode];
        })
      : setHistory([...history, newMode]);
  };
  const back = () => {
    setMode(history[history.length - 2]);
    setHistory((prev) => {
      prev.pop();
      return prev;
    });
  };
  return { mode, transition, back };
}
