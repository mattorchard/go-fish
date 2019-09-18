import {useEffect, useState} from "react";


const useHistoricalState = value => {
  const [history, setHistory] = useState([value]);

  useEffect(() => {
    setHistory(history => {
      if (value !== history[0]) {
        return [value, ...history];
      }
      return history
    })
  }, [value]);

  return history;
};

export default useHistoricalState;