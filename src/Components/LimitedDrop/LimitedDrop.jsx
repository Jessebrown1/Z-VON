import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../../Components/products";
import "./LimitedDrop.css";

/* FIXED 24H DROP TIMER */
const DROP_END_TIME =
  new Date().getTime() + 24 * 60 * 60 * 1000;

export default function LimitedDrop() {

  const limitedProducts = products
    .filter((p) => p.limitedEdition === true)
    .slice(0, 3); // ✅ ONLY SHOW 3 PRODUCTS

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date().getTime();
    const diff = DROP_END_TIME - now;

    return {
      hours: Math.max(0, Math.floor(diff / (1000 * 60 * 60))),
      minutes: Math.max(0, Math.floor((diff / 1000 / 60) % 60)),
      seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const format = (n) => String(n).padStart(2, "0");

  return (
    <section className="limited-section">

      <div className="limited-header">
        <h2>LIMITED EDITION DROP</h2>

        <div className="timer">
          DROP ENDS IN:{" "}
          <span>
            {format(timeLeft.hours)}:
            {format(timeLeft.minutes)}:
            {format(timeLeft.seconds)}
          </span>
        </div>

        {/* ✅ LINK TO FULL PAGE */}
        <Link to="/limited" className="see-more-link">
          SEE MORE →
        </Link>
      </div>

      {/* GRID (ONLY 2–3 ITEMS) */}
      <div className="limited-grid">
        {limitedProducts.map((p) => (
          <div
            key={p.id}
            className={`limited-card ${p.stock === 0 ? "sold" : ""}`}
          >
            <Link to={`/products/${p.id}`}>
              <img src={p.image[0]} alt={p.title?.main} />

              <div className="limited-info">
                <h3>{p.title?.main}</h3>
                <p>{p.price}</p>

                {p.stock === 0 && <span>SOLD OUT</span>}
              </div>
            </Link>
          </div>
        ))}
      </div>

    </section>
  );
}