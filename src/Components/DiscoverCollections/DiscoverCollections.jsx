import { Link } from "react-router-dom";
import "./DiscoverCollections.css";

const collections = [
  {
    title: "Hoodie",
    desc: "Oversized comfort crafted for everyday luxury.",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&q=80",
    link: "/collections?category=hoodie",
  },
  {
    title: "Tee",
    desc: "Minimal essentials with a premium streetwear edge.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
    link: "/collections?category=tee",
  },
  {
    title: "Anime",
    desc: "Exclusive designs inspired by iconic anime worlds.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80",
    link: "/collections?category=anime",
  },
  {
    title: "Accessories",
    desc: "Complete your look with premium finishing touches.",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=900&q=80",
    link: "/collections?category=accessories",
  },
];

export default function DiscoverCollections() {
  return (
    <section className="discover">
      <div className="discover-top">
        <h2>Discover Collections</h2>
        <p>Explore the signature collections from ZÉVON.</p>
      </div>

      <div className="discover-slider">
        {collections.map((item, index) => (
          <Link key={index} to={item.link} className="discover-card">
            <img src={item.image} alt={item.title} />

            <div className="overlay">
              <span>{item.title}</span>
              <p>{item.desc}</p>

              <div className="explore">Explore →</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}