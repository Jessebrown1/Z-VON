import { motion } from "framer-motion";

import Navbar from "../Components/Navbar/Navbar";
import Header from "../Components/Header/Header";
import DiscoverCollections from "../Components/DiscoverCollections/DiscoverCollections";
import AnimeDrops from "../Components/AnimeDrops/AnimeDrops";
import ProductShowcase from "../Components/ProductShowcase/ProductShowcase";
import LimitedDrop from "../Components/LimitedDrop/LimitedDrop";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Navbar />
      <Header />
      <ProductShowcase />
      <LimitedDrop />
      <DiscoverCollections />
      <AnimeDrops />
    </motion.main>
  );
}