import {useEffect, useState} from "react";


const useHistoricalState = value => {
  const [history, setHistory] = useState([value]);

  useEffect(() => {
    if (value !== history[0]) {
      setHistory([value, ...history]);
    }
  }, [value]);

  return history;
};

export default useHistoricalState;