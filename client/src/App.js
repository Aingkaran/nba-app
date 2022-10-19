import React from "react";
import "./App.css";
import Players from "./components/Players";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.express));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Players></Players>
      </header>
    </div>
  );
}

export default App;