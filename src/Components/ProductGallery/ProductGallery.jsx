import { useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./ProductGallery.css";

import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { products } from "../../Components/products";

export default function ProductGallery() {
  const { id } = useParams();

  const product = products.find((p) => String(p.id) === String(id));

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [openModal, setOpenModal] = useState(false);

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

  return (
    <>
      <section className="product-page">

        {/* LEFT */}
        <div className="product-info">

          <div className="product-title">
            <h1>{product.title?.main}</h1>

            {product.title?.subtitle && (
              <p className="product-subtitle-text">
                {product.title.subtitle}
              </p>
            )}
          </div>

          <span
            className={`badge ${
              isSoldOut ? "sold" : isLimited ? "limited" : "live"
            }`}
          >
            {isSoldOut
              ? "Sold Out"
              : isLimited
              ? "Limited Edition"
              : "Standard"}
          </span>

          <div className="editorial">
            <AccordionItem
              title="DESCRIPTION"
              content={product.description?.description}
            />
            <AccordionItem title="FIT" content={product.description?.fit} />
            <AccordionItem
              title="CONSTRUCTION"
              content={product.description?.construction}
            />
          </div>
        </div>

        {/* CENTER */}
        <div
          className="image-column"
          onScroll={(e) => {
            const slideHeight = e.currentTarget.clientHeight;
            const index = Math.round(
              e.currentTarget.scrollTop / slideHeight
            );

            setActiveIndex(
              Math.min(product.image.length - 1, Math.max(0, index))
            );
          }}
        >
          <div className="image-scroll-area">
            {product.image.map((img, i) => (
              <div key={i} className="image-slide">
                <motion.img
                  src={img}
                  className="active-image"
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    setActiveIndex(i);
                    setOpenModal(true);
                  }}
                />
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
            {["S", "M", "L", "XL"].map((size) => {
              const available = product.sizes?.[size] !== false;
              const isActive = selectedSize === size;

              return (
                <button
                  key={size}
                  disabled={isSoldOut || !available}
                  onClick={() => {
                    if (!isSoldOut && available) setSelectedSize(size);
                  }}
                  className={`size-btn ${
                    isActive ? "active" : ""
                  } ${!available ? "disabled" : ""}`}
                >
                  {size}
                  {!available && (
                    <span className="size-label">Sold out</span>
                  )}
                </button>
              );
            })}
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

          <button className="mobile-cart-btn" disabled={isSoldOut}>
            {isSoldOut ? "Sold Out" : "Add To Cart"}
          </button>
        </div>
      </section>

      {/* ================= LIGHTBOX MODAL ================= */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenModal(false)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE BUTTON (ONLY ONCE) */}
              <button
                className="lightbox-close"
                onClick={() => setOpenModal(false)}
              >
                ✕
              </button>

              {/* MAIN IMAGE */}
              <motion.img
                key={activeIndex}
                src={product.image[activeIndex]}
                className="lightbox-main-img"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(event, info) => {
                  const threshold = 80;

                  if (info.offset.x < -threshold) {
                    setActiveIndex((p) =>
                      Math.min(p + 1, product.image.length - 1)
                    );
                  }

                  if (info.offset.x > threshold) {
                    setActiveIndex((p) => Math.max(p - 1, 0));
                  }
                }}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              />

              {/* THUMBNAILS */}
              <div className="thumbnail-strip">
                {product.image.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className={`thumb ${
                      activeIndex === i ? "active" : ""
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <RelatedProducts currentId={id} />
    </>
  );
}

/* ================= ACCORDION ================= */

function AccordionItem({ title, content }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="editorial-block">
      <button
        className="accordion-btn"
        onClick={() => setOpen(!open)}
      >
        <span className="label">{title}</span>
        <span className={`icon ${open ? "open" : ""}`}>+</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="accordion-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p>{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}