import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Product from "./Pages/Product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* FIXED: product routing */}
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;