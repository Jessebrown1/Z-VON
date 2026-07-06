import { useState } from "react";
import "./Navbar.css";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../Cart/CartContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const { cartItems } = useCart();

  // Live cart count
  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const isActive = (path) => location.pathname === path;

  // Hide navbar actions on cart page
  const isCartPage = location.pathname === "/cart";

  return (
    <header className="navbar">

      {/* LOGO */}
      <Link to="/" className="navbar__logo">
        ZÉVON
      </Link>

      {!isCartPage && (
        <>
          {/* NAV LINKS */}
          <nav className={`navbar__links ${menuOpen ? "active" : ""}`}>
            <Link
              className={isActive("/") ? "active" : ""}
              to="/"
            >
              HOME
            </Link>

            <Link
              className={isActive("/collections") ? "active" : ""}
              to="/collections"
            >
              COLLECTIONS
            </Link>

            <Link
              className={isActive("/lookbook") ? "active" : ""}
              to="/lookbook"
            >
              LOOKBOOK
            </Link>

            <Link
              className={isActive("/about") ? "active" : ""}
              to="/about"
            >
              ABOUT
            </Link>
          </nav>

          {/* ACTIONS */}
          <div className="navbar__actions">

            {/* CART BUTTON */}
            <button
              className="navbar__cart"
              onClick={() => window.openCart?.()}
            >
              CART ({cartCount})
            </button>

            {/* MOBILE CART ICON */}
            <button
              className="mobile-cart-btn"
              onClick={() => window.openCart?.()}
            >
              <HiOutlineShoppingBag />
              <span className="cart-count">{cartCount}</span>
            </button>

            {/* MENU */}
            <button
              className="menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={menuOpen ? "menu-icon close" : "menu-icon"}>
                {menuOpen ? "✕" : "☰"}
              </span>
            </button>

          </div>
        </>
      )}

    </header>
  );
}

export default Navbar;