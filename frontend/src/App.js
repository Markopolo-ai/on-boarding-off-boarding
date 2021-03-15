import React from "react";
import "./App.css";
import List from "./components/List";
import Navbar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <List></List>
    </div>
  );
}

export default App;
