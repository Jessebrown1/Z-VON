import { useState } from "react";
import "./Navbar.css";
import { HiOutlineShoppingBag } from "react-icons/hi2";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [cartCount] = useState(0);

  return (
    <header className="navbar">
      <div className="navbar__logo">
        <h1>ZÉVON</h1>
      </div>

      {/* LEFT SIDE LINKS */}
      <nav className={`navbar__links ${menuOpen ? "active" : ""}`}>
        <a href="/">SHOP</a>
        <a href="/">COLLECTIONS</a>
        <a href="/">ABOUT</a>
        <a href="/">LOOKBOOK</a>
      </nav>

      {/* CART (now independent = can be positioned freely) */}
      <div className="navbar__cart">
        <a href="/">CART ({cartCount})</a>
      </div>

<div className="navbar__actions">

  <button className="mobile-cart-btn">
    <HiOutlineShoppingBag />
    <span className="cart-count">{cartCount}</span>
  </button>

  <button
    className="menu-btn"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    {menuOpen ? "✕" : "☰"}
  </button>

</div>
    </header>
  );
}

export default Navbar;