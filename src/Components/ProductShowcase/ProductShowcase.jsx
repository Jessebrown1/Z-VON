import "./ProductShowcase.css";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

import { products } from "../products";

function ProductShowcase() {
  return (
    <section className="showcase">
      <div className="showcase-header">
        <h2>Latest Drops</h2>

        <Link to="/shop" className="showcase-link">
          View All <span>→</span>
        </Link>
      </div>

      <div className="showcase-grid">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}   // ✅ FIXED ROUTE FORMAT
            className="product-card"
          >
            <button
              className="wishlist-btn"
              onClick={(e) => e.preventDefault()}
            >
              <Heart size={16} />
            </button>

            <div className="product-image">
              <img src={product.image[0]} alt={product.name} />
            </div>

            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ProductShowcase;