import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header"
import Homepage from "./pages/Homepage";
import Telemetry from "./pages/Telemetry";
import Race from "./pages/Race";
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
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
