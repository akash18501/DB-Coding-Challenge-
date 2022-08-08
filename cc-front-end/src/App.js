import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import Table from "./Components/Table";
import { Route, Routes } from "react-router-dom";
import MyBook from "./Components/MyBook";

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route exact path="/" element={<Table />} />
        <Route exact path="/mybooks" element={<MyBook />} />
      </Routes>
    </>
  );
}

export default App;
