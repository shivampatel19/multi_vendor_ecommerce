import { ThemeProvider } from "@mui/material";
import "./App.css";
import customTheme from "./theme/customTheme";
import Navbar from "./customer/Navbar/Navbar";
import Home from "./customer/pages/Home/Home";


function App() {
  return (
    <div>
      <ThemeProvider theme={customTheme}>
        <div>
          <Navbar />
          <Home />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
