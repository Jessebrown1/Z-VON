import { useEffect, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { products } from "../../Components/products";
import "./RelatedProducts.css";

// Fisher-Yates shuffle
function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export default function RelatedProducts({ currentId }) {
  const containerRef = useRef(null);

  // Shuffle only when the current product changes
  const relatedBase = useMemo(() => {
    return shuffleArray(
      products.filter((p) => p.id !== Number(currentId))
    );
  }, [currentId]);

  const [visibleCount, setVisibleCount] = useState(4);

  // Reset visible count when changing products
  useEffect(() => {
    setVisibleCount(4);
  }, [currentId]);

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
  }, [relatedBase]);

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