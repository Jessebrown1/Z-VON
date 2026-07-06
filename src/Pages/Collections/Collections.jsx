import { useState, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { products } from "../../Components/products";
import Navbar from "../../Components/Navbar/Navbar";
import "./Collections.css";
import { useCart } from "../../Components/Cart/CartContext";

export default function Collections() {
  const [active, setActive] = useState("all");

  const trackRef = useRef(null);
  const btnRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const { addToCart } = useCart();

  const categorized = products.map((item) => {
    const name = item.title.main.toLowerCase();

    let category = "other";

    if (name.includes("hoodie")) category = "hoodie";
    else if (name.includes("tee")) category = "tee";
    else if (name.includes("cargo")) category = "cargo";
    else if (name.includes("knit")) category = "knit";
    else if (name.includes("anime")) category = "anime";
    else if (
      name.includes("accessory") ||
      name.includes("chain") ||
      name.includes("bag")
    ) {
      category = "accessories";
    }

    return { ...item, category };
  });

  const filtered =
    active === "all"
      ? categorized
      : categorized.filter((item) => item.category === active);

  // Luxury indicator + mobile auto-scroll
  useLayoutEffect(() => {
    const activeBtn = btnRefs.current[active];
    const track = trackRef.current;

    if (!activeBtn || !track) return;

    // Scroll active button into view (mobile friendly)
    activeBtn.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });

    // Wait for the scroll to finish before positioning indicator
    requestAnimationFrame(() => {
      const trackRect = track.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();

      setIndicatorStyle({
        width: btnRect.width,
        transform: `translateX(${btnRect.left - trackRect.left + track.scrollLeft}px)`,
      });
    });
  }, [active]);

  return (
    <>
      <Navbar />

      <div className="collections">
        <h1 className="title">ZÉVON'S Collections</h1>

        {/* FILTERS */}
        <div className="filters">
          <div className="filter-track" ref={trackRef}>
            <div
              className="filter-indicator"
              style={indicatorStyle}
            />

            {[
              "all",
              "knit",
              "hoodie",
              "tee",
              "cargo",
              "anime",
              "accessories",
            ].map((cat) => (
              <button
                key={cat}
                ref={(el) => (btnRefs.current[cat] = el)}
                className={`filter-pill ${
                  active === cat ? "active" : ""
                }`}
                onClick={() => setActive(cat)}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="grid">
          {filtered.length === 0 ? (
            <div className="coming-soon">
              <h2>Coming Soon</h2>
              <p>New drops are on the way. Stay tuned.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <Link
                to={`/products/${item.id}`}
                className="card"
                key={item.id}
              >
                <div className="imgBox">
                  <img
                    src={item.image[0]}
                    alt={item.title.main}
                  />
                </div>

                <div className="info">
                  <h3>{item.title.main}</h3>
                  <p>{item.price}</p>

                  {item.stock === 0 ? (
                    <button disabled className="soldOut">
                      Sold Out
                    </button>
                  ) : (
                    <button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(item, "M");
    window.openCart?.();
  }}
>
  Add to Cart
</button>
                  )}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}