import AnotherTable from "./Components/AnotherTable";
import { Route, Routes } from "react-router-dom";
import MyBook from "./Components/MyBook";
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
                    <Route exact path="/" element={<AnotherTable />} />
                    <Route exact path="/mybook" element={<MyBook />} />
                    <Route exact path="/signin" element={<SignIn />} />
                    <Route exact path="/signup" element={<SignUp />} />
                </Routes>
            </ThemeProvider>
        </div>
    );
}

export default App;
