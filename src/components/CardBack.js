import React from "react";


const CardBack = ({size = "large"}) =>
  <div className={`card card--${size} card__back`}>
    <svg visibility="hidden"
         className="card-svg"
         width="600"
         height="800"
         viewBox="0 0 600 800">
      <rect x="0" y="0" width="600" height="800"/>
    </svg>
  </div>;

export default CardBack;