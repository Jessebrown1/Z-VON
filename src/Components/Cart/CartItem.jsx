import { motion } from "framer-motion";

export default function CartItem({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  const price = typeof item.price === "number" ? item.price : 0;

  return (
    <motion.div
      className="cart-item"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* IMAGE (SAFE) */}
      <img
        src={item.image?.[0] || "/placeholder.png"}
        alt={item.title?.main || "Product"}
      />

      {/* INFO */}
      <div className="cart-info">
        <h4>{item.title?.main}</h4>

        <p>Size {item.size}</p>

        {/* 🎁 GIFT BADGE */}
        {item.freeGift && (
          <div className="gift-tag locked">
            🎁 Complimentary Zevon 10ml Perfume
          </div>
        )}

        {/* CONTROLS */}
        <div className="cart-controls">
          <button
            disabled={item.freeGift}
            onClick={() =>
              !item.freeGift &&
              decreaseQuantity(item.id, item.size)
            }
          >
            −
          </button>

          <span>{item.quantity}</span>

          <button
            disabled={item.freeGift}
            onClick={() =>
              !item.freeGift &&
              increaseQuantity(item.id, item.size)
            }
          >
            +
          </button>
        </div>
      </div>

      {/* PRICE */}
      <div className="cart-price">
        <p>
          {item.freeGift || price === 0
            ? "FREE"
            : `₵${(price * item.quantity).toFixed(2)}`}
        </p>

        {/* REMOVE */}
        {!item.freeGift && (
          <button onClick={() => removeFromCart(item.id, item.size)}>
            Remove
          </button>
        )}
      </div>
    </motion.div>
  );
}