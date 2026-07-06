import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { CartProvider, useCart } from "./Components/Cart/CartContext";

import Home from "./Pages/Home";
import Product from "./Pages/Product";
import LimitedPage from "./Pages/LimitedPage/LimitedPage";
import Collections from "./Pages/Collections/Collections";
import Cart from "./Components/Cart/Cart";

/* ================= SCROLL ================= */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* ================= ROUTES ================= */
function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/limited" element={<LimitedPage />} />
        <Route path="/collections" element={<Collections />} />
      </Routes>
    </AnimatePresence>
  );
}

/* ================= CART OVERLAY CONTROLLER ================= */
function CartOverlay() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const [open, setOpen] = useState(false);

  // ✅ stable handlers (IMPORTANT FIX)
  const openCart = () => setOpen(true);
  const closeCart = () => setOpen(false);

  useEffect(() => {
    window.openCart = openCart;
    window.closeCart = closeCart;
  }, []);

  return (
    <Cart
      open={open}
      onClose={closeCart}
      cartItems={cartItems}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      removeFromCart={removeFromCart}
    />
  );
}

/* ================= APP ================= */
export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
        <CartOverlay /> {/* 👈 GLOBAL CART */}
      </BrowserRouter>
    </CartProvider>
  );
}