import { motion } from "framer-motion";
import { products } from "../../Components/products";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./LimitedPage.css";

export default function LimitedPage() {
  const limitedItems = products.filter(
    (p) => p.limitedEdition === true
  );

  return (
    <>
      <Navbar />

      <motion.section
        className="limited-page"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="limited-title">
          LIMITED EDITION COLLECTION
        </h1>

        <div className="limited-grid">
          {limitedItems.map((p) => (
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
      </motion.section>
    </>
  );
}