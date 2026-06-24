import "./ProductShowcase.css";
import { Link } from "react-router-dom";
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
            to={`/product/${product.id}`}
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