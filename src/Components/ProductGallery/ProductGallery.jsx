import { useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./ProductGallery.css";

import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { products } from "../../Components/products";
import { getProductStatus } from "../../Components/productUtils";

import Product3DViewer from "../../Components/ProductViewer3D/ProductViewer3D";




export default function ProductGallery() {
  const { id } = useParams();

  const product = products.find((p) => String(p.id) === String(id));
const has3D =
  product?.model3D &&
  product.model3D !== "" &&
  product.model3D.includes(".glb");
  const [openShipping, setOpenShipping] = useState(false);

  const [openSizeGuide, setOpenSizeGuide] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [openModal, setOpenModal] = useState(false);
  const [open3DModal, setOpen3DModal] = useState(false);

  if (!product) {
    return (
      <section className="product-page">
        <h2>Product not found</h2>
        <p>Invalid product ID: {id}</p>
      </section>
    );
  }

const status = product ? getProductStatus(product) : null;

const isSoldOut = status?.isSoldOut;
const isLowStock = status?.isLowStock;
const isLimited = product?.limitedEdition === true;

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

{isLowStock && (
  <div className="stock-warning">
    Only {product.stock} left — hurry!
  </div>
)}

{isSoldOut && (
  <div className="stock-sold">
    Sold Out
  </div>
)}

          

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

{/* Size Guide */}
<div className="product-utils">
  <button onClick={() => setOpenSizeGuide(true)}>
  📏 Size Guide
</button>

  <button onClick={() => setOpenShipping(true)}>
  🚚 Shipping & Returns
</button>
</div>


{/* 3D Viewer */}
<button
  className={`view-3d-btn ${!has3D ? "locked" : ""}`}
  disabled={!has3D}
  onClick={() => {
    if (!has3D) return;
    setOpen3DModal(true);
  }}
>
  <span className="btn-icon">
    {has3D ? "🧊" : "🔒"}
  </span>

  <span className="btn-text">
    {has3D ? "View in 3D" : "Locked • Coming Soon"}
  </span>
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



              <AnimatePresence>
  {openSizeGuide && (
    <motion.div
      className="size-guide-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setOpenSizeGuide(false)}
    >
      <motion.div
        className="size-guide-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="size-guide-close"
          onClick={() => setOpenSizeGuide(false)}
        >
          ✕
        </button>

        <h2>Size Guide</h2>

        <table className="size-table">
          <thead>
            <tr>
              <th>Size</th>
              <th>Chest</th>
              <th>Length</th>
              <th>Shoulder</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>S</td>
              <td>96 cm</td>
              <td>68 cm</td>
              <td>43 cm</td>
            </tr>

            <tr>
              <td>M</td>
              <td>102 cm</td>
              <td>71 cm</td>
              <td>45 cm</td>
            </tr>

            <tr>
              <td>L</td>
              <td>108 cm</td>
              <td>74 cm</td>
              <td>47 cm</td>
            </tr>

            <tr>
              <td>XL</td>
              <td>114 cm</td>
              <td>77 cm</td>
              <td>49 cm</td>
            </tr>

            <tr>
              <td>XXL</td>
              <td>120 cm</td>
              <td>80 cm</td>
              <td>51 cm</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


<AnimatePresence>
  {open3DModal && (
     <motion.div
      className="coming-soon-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="coming-soon-content"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "90vw",
          maxWidth: "1200px",
          height: "85vh",
          padding: "0",
          overflow: "hidden",
          borderRadius: "24px",
        }}
      >
        <button
  className="coming-soon-close"
  onClick={() => {
    setOpen3DModal(false);
  }}
>
  ✕
</button>

        {open3DModal && (
  <Product3DViewer
    modelUrl={`/models/${product.id}.glb`}
    onClose={() => setOpen3DModal(false)}
  />
)}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>



<AnimatePresence>
  {openShipping && (
    <motion.div
      className="size-guide-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setOpenShipping(false)}
    >
      <motion.div
        className="size-guide-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="size-guide-close"
          onClick={() => setOpenShipping(false)}
        >
          ✕
        </button>

        <h2>Shipping & Returns</h2>

        <div className="policy-text">
          <p>
            We process all orders within <strong>1–3 business days</strong>.
            Delivery times vary depending on your location but typically range
            from <strong>3–7 business days</strong> for domestic orders.
          </p>

          <p>
            Once your order is shipped, you will receive a tracking number via
            email or SMS.
          </p>

          <p>
            We offer a <strong>14-day return policy</strong> for unworn and
            unused items in their original condition. Refunds or exchanges are
            processed once the item is inspected.
          </p>

          <p>
            Please note that sale or limited-edition items may not be eligible
            for returns.
          </p>
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