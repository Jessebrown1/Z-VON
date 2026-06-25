import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { products } from "../../Components/products";
import "./RelatedProducts.css";

export default function RelatedProducts({ currentId }) {
  const containerRef = useRef(null);

  const relatedBase = products.filter(
    (p) => p.id !== Number(currentId)
  );

  const [visibleCount, setVisibleCount] = useState(4);

  const visibleProducts = relatedBase.slice(0, visibleCount);

  // AUTO LOAD ON SCROLL
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const scrollBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - 200;

      if (scrollBottom) {
        setVisibleCount((prev) =>
          Math.min(prev + 4, relatedBase.length)
        );
      }
    };

    const el = containerRef.current;
    if (el) el.addEventListener("scroll", handleScroll);

    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, [relatedBase.length]);

  return (
    <section className="related" ref={containerRef}>
      <h2>You may also like</h2>

      <div className="related-grid">
        {visibleProducts.map((p) => (
          <Link key={p.id} to={`/products/${p.id}`} className="related-card">

            <img src={p.image[0]} alt={p.title?.main} />

            <div>
              <h3>{p.title?.main}</h3>
              <p>{p.price}</p>
            </div>

          </Link>
        ))}
      </div>
    </section>
  );
}