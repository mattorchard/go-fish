import React from "react";
import useHistoricalState from "../hooks/useHistoricalState";
import "./ActivityLog.css";


const ActivityLog = ({message, messageCount}) => {
  const oldMessages = useHistoricalState(message).slice(1, messageCount + 1);

  return <div className="activity-log ui-border">
    <div className="activity-log__active-message">{message}</div>
    <ol className="activity-log__old-messages">
      {oldMessages.map((message, index) =>
        <li key={`${index}-${message}`}>{message}</li>)}
    </ol>
  </div>
};


export default ActivityLog;