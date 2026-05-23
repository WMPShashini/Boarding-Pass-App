import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scanner from "./pages/Scanner";
import ScanPage from "./pages/ScanPage";
import BoardingPass from "./pages/BoardingPass";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Scanner />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/boarding/:country" element={<BoardingPass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;