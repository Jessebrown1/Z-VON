import { motion } from "framer-motion";

import Navbar from "../Components/Navbar/Navbar";
import ProductGallery from "../Components/ProductGallery/ProductGallery";

export default function Product() {
  return (
    <motion.main
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Navbar />
      <ProductGallery />
    </motion.main>
  );
}