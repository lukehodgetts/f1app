import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Homepage from "./pages/Homepage";
import Telemetry from "./pages/Telemetry";
import Race from "./pages/Race";
import Driver from "./pages/Driver";
import GrandPrix from "./pages/GrandPrix";
import Constructor from "./pages/Constructor";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e10600",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/telemetry" element={<Telemetry />} />
          <Route path="/race/:name/:year" element={<Race />} />
          <Route path="/driver/:name" element={<Driver />} />
          <Route path="/gp/:name" element={<GrandPrix />} />
          <Route path="/constructor/:name" element={<Constructor />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
