import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"
import Homepage from "./pages/Homepage";
import Telemetry from "./pages/Telemetry";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/telemetry" element={<Telemetry />} />
      </Routes>
    </Router>
  );
}

export default App;
