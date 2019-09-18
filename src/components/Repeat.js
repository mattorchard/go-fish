import React from "react";

const Repeat = ({count, render}) => new Array(count)
.fill(null)
.map((value, index) =>
  <React.Fragment key={index}>
    {render(index)}
  </React.Fragment>);

export default Repeat;