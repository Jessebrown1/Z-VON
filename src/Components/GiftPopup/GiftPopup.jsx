import { motion } from "framer-motion";
import "./GiftPopup.css";

export default function GiftPopup() {
  return (
    <motion.div
      className="gift-popup"
      initial={{
        opacity: 0,
        y: 50,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 40,
        scale: 0.9,
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <div className="gift-icon">
        🎁
      </div>

      <div>
        <h3>
          Gift Added
        </h3>

        <p>
          Zevon Special Perfume (10ml)
        </p>
      </div>
    </motion.div>
  );
}