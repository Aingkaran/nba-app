import React from "react";
import "./App.css";
import Header_Login from "./components/Header_Login";
import Players from "./components/Players";

import 'bootstrap/dist/css/bootstrap.min.css'
function App() {


  return (
    <div className="App">
      <Header_Login></Header_Login>
      <Players className="container-xxl"></Players>

    </div>
  );
}

export default App;