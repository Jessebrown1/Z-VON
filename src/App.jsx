import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { CartProvider, useCart } from "./Components/Cart/CartContext";
import Checkout from "./Pages/Checkout/Checkout";
import GiftPopup from "./Components/GiftPopup/GiftPopup";

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
        <Route path="/checkout" element={<Checkout />} />
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
    giftPopup,
  } = useCart();

  const [open, setOpen] = useState(false);

  const openCart = () => setOpen(true);
  const closeCart = () => setOpen(false);

  useEffect(() => {
    window.openCart = openCart;
    window.closeCart = closeCart;
  }, []);

  return (
    <>
      {/* CART DRAWER */}
      <Cart
        open={open}
        onClose={closeCart}
        cartItems={cartItems}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
      />

      {/* 🎁 GIFT POPUP */}
      {giftPopup && <GiftPopup />}
    </>
  );
}

/* ================= APP ================= */
export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />

        <AppRoutes />

        {/* GLOBAL CART + POPUPS */}
        <CartOverlay />
      </BrowserRouter>
    </CartProvider>
  );
}