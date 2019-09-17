import React from "react";
import Spread from "./Spread";

const Books = ({books}) => <ul className="books">{
  books.map((book, index) =>
    <li key={index}
        className="books__slot">
      <Spread cards={book}/>
    </li>)
}</ul>;


export default Books;