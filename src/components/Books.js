import React from "react";
import Spread from "./Spread";

const Books = ({books}) => <ul className="books ui-border">
  <div className="ui-border__label">{books.length} book{books.length > 1 ? "s" : ""}</div>
  {books.map((book, index) =>
    <li key={index}
        className="books__slot">
      <Spread cards={book}/>
    </li>)
  }</ul>;


export default Books;