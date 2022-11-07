import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import myTeam from "./myTeam";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/myTeam" element={<myTeam />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;