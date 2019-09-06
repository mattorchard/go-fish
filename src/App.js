import React from 'react';
import './App.css';
import Card from "./components/Card";


function App() {
  return <>
    <Card suit="hearts" rank="A"/>
    <Card suit="hearts" rank="2"/>
    <Card suit="hearts" rank="3"/>
    <Card suit="hearts" rank="4"/>
    <Card suit="hearts" rank="5"/>
    <Card suit="hearts" rank="6"/>
    <Card suit="hearts" rank="7"/>
    <Card suit="hearts" rank="8"/>
    <Card suit="hearts" rank="9"/>
    <Card suit="hearts" rank="10"/>
    <Card suit="spades" rank="J"/>
    <Card suit="spades" rank="Q"/>
    <Card suit="spades" rank="K"/>
  </>;
}

export default App;
