import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Home from "./Pages/Home";
import Product from "./Pages/Product";
import LimitedPage from "./Pages/LimitedPage/LimitedPage";

/* ================= SCROLL TO TOP ================= */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* ================= ROUTES WITH ANIMATION ================= */
function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* PRODUCT PAGE (FIXED CONSISTENCY) */}
        <Route path="/products/:id" element={<Product />} />

        {/* LIMITED PAGE */}
        <Route path="/limited" element={<LimitedPage />} />

      </Routes>
    </AnimatePresence>
  );
}

/* ================= APP ================= */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}