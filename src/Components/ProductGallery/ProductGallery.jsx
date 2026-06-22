import { useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./ProductGallery.css";

import { products } from "../../Components/products";

export default function ProductGallery() {
  const { id } = useParams();

  // ✅ SAFE MATCH (prevents blank screen)
  const product = products.find((p) => String(p.id) === String(id));

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");

  // ✅ SAFE FALLBACK (IMPORTANT)
  if (!product) {
    return (
      <section className="product-page">
        <h2>Product not found</h2>
        <p>Invalid product ID: {id}</p>
      </section>
    );
  }

  const isSoldOut = product.stock === 0;
  const isLimited = product.limitedEdition === true;

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const index = Math.round(scrollTop / 500);

    setActiveIndex(
      Math.min(product.image.length - 1, Math.max(0, index))
    );
  };

  return (
    <section className="product-page">

      {/* LEFT */}
      <div className="product-info">
        <h1>{product.name}</h1>

        <span className={`badge ${isSoldOut ? "sold" : "live"}`}>
          {isSoldOut
            ? "Sold Out"
            : isLimited
            ? "Limited Edition"
            : "Standard"}
        </span>

        <ul>
          <li>Premium heavyweight cotton</li>
          <li>Oversized luxury fit</li>
          <li>Custom embroidery</li>
          <li>Metal hardware</li>
        </ul>
      </div>

      {/* CENTER */}
      <div className="image-column" onScroll={handleScroll}>
        <div className="image-scroll-area">
          {product.image.map((img, i) => (
            <div key={i} className="image-slide">
              <AnimatePresence mode="wait">
                {activeIndex === i && (
                  <motion.img
                    src={img}
                    className="active-image"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="purchase-column">
        <h2>{product.price}</h2>

        <p className="product-subtitle">
          {isSoldOut
            ? "Currently Unavailable"
            : isLimited
            ? "Limited Edition"
            : "Standard Release"}
        </p>

        <div className="sizes">
          {["S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              disabled={isSoldOut}
              onClick={() => setSelectedSize(size)}
              className={`size-btn ${
                selectedSize === size ? "active" : ""
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <button
          className={`cart-btn ${isSoldOut ? "soldout" : ""}`}
          disabled={isSoldOut}
        >
          {isSoldOut ? "Sold Out" : "Add To Cart"}
        </button>
      </div>

      {/* MOBILE */}
      <div className="mobile-cart-bar">
        <div className="mobile-price">
          <span className="price-label">{product.price}</span>
          <span className="price-sub">
            {isSoldOut
              ? "Sold Out"
              : isLimited
              ? "Limited Edition"
              : "Standard"}
          </span>
        </div>

        <button
          className="mobile-cart-btn"
          disabled={isSoldOut}
        >
          {isSoldOut ? "Sold Out" : "Add To Cart"}
        </button>
      </div>

    </section>
  );
}