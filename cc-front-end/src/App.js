import BondsTable from "./Components/BondsTable";
import { Route, Routes } from "react-router-dom";
import WatchList from "./Components/WatchList";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0018a8",
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route exact path="/" element={<BondsTable />} />
          <Route exact path="/watchlist" element={<WatchList />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
