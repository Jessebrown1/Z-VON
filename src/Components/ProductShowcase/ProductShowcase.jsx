import "./ProductShowcase.css";
import { Link } from "react-router-dom";
import { products } from "../products";

function ProductShowcase() {
  return (
    <section className="showcase">
      <div className="showcase-header">
        <h2>Latest Drops</h2>

        {/* FIXED: match your router if you ever create /shop later */}
        <Link to="/limited" className="showcase-link">
          View All <span>→</span>
        </Link>
      </div>

      <div className="showcase-grid">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}   // ✅ FIXED HERE
            className="product-card"
          >
            <div className="product-image">
              <img
                src={product.image?.[0]}
                alt={product.title?.main}
              />
            </div>

            <div className="product-infoo">
              <h3>{product.title?.main}</h3>

              {product.title?.subtitle && (
                <p className="product-subtitle">
                  {product.title.subtitle}
                </p>
              )}

              <p>{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ProductShowcase;