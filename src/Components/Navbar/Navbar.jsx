import { useState } from "react";
import "./Navbar.css";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">

      {/* LOGO (HOME) */}
      <Link to="/" className="navbar__logo">
        ZÉVON
      </Link>

      {/* CENTER NAV */}
      <nav className={`navbar__links ${menuOpen ? "active" : ""}`}>
        <Link className={isActive("/home") ? "active" : ""} to="/">
          HOME
        </Link>

        <Link className={isActive("/collections") ? "active" : ""} to="/collections">
          COLLECTIONS
        </Link>

        <Link className={isActive("/lookbook") ? "active" : ""} to="/lookbook">
          LOOKBOOK
        </Link>

        <Link className={isActive("/about") ? "active" : ""} to="/about">
          ABOUT
        </Link>
      </nav>

      {/* RIGHT ACTIONS */}
      <div className="navbar__actions">

        <Link to="/cart" className="navbar__cart">
          CART ({cartCount})
        </Link>

        <button className="mobile-cart-btn">
          <HiOutlineShoppingBag />
          <span className="cart-count">{cartCount}</span>
        </button>

<button
  className="menu-btn"
  onClick={() => setMenuOpen(!menuOpen)}
>
  <span className={menuOpen ? "menu-icon close" : "menu-icon"}>
    {menuOpen ? "✕" : "☰"}
  </span>
</button>

      </div>

    </header>
  );
}

export default Navbar;