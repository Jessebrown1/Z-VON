import { motion, AnimatePresence } from "framer-motion";
import "./LimitedEdition.css";

export default function LimitedEdition({
  open,
  onClose,
  products,
  onSelect,
}) {
  const limitedProducts = products.filter(
    (p) => p.limitedEdition === true
  );

  return (
    <AnimatePresence>
      {open && (
        <div className="le-overlay" onClick={onClose}>

          <motion.div
            className="le-panel"
            onClick={(e) => e.stopPropagation()}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
          >

            <div className="le-header">
              <h2>Limited Edition</h2>
              <button onClick={onClose}>✕</button>
            </div>

            <div className="le-list">
              {limitedProducts.map((item) => (
                <div
                  key={item.id}
                  className="le-card"
                  onClick={() => onSelect(item)}
                >
                  <img src={item.image} />

                  <div>
                    <p>{item.name}</p>
                    <span>${item.price}</span>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}