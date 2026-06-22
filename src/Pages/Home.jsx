import Navbar from "../Components/Navbar/Navbar";
import Header from "../Components/Header/Header";
import DiscoverCollections from "../Components/DiscoverCollections/DiscoverCollections";
import AnimeDrops from "../Components/AnimeDrops/AnimeDrops";
import ProductShowcase from "../Components/ProductShowcase/ProductShowcase";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
            <ProductShowcase />
      <DiscoverCollections />

      <AnimeDrops />
    </>
  );
}