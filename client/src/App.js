import React from "react";
import "./App.css";
import Header_Login from "./components/Header_Login";
import Players from "./components/Players";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from "./components/Login";
import Signup from "./components/Sign-Up";
import Myteam from "./components/Myteam";

function App() {


  return (
    <div className="App">
      <Login></Login>
      <Players className="container-xxl"></Players>
      <Myteam></Myteam>
    </div>
  );
}

export default App;