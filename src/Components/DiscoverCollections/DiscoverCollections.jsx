import "./DiscoverCollections.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import mensImg from "../../assets/mens.png";
import womensImg from "../../assets/womens.png";
import animeBanner from "../../assets/animeBanner.jpg";

const collections = [
  {
    title: "MEN'S WEAR",
    subtitle: "Built for everyday dominance",
    button: "Explore Men",
    image: mensImg,
    link: "/products/mens-wear",
  },
  {
    title: "WOMEN'S WEAR",
    subtitle: "Elegance meets street power",
    button: "Explore Women",
    image: womensImg,
    link: "/products/womens-wear",
  },
  {
    title: "ANIME COLLECTION",
    subtitle: "Inspired by iconic worlds",
    button: "Explore Anime",
    image: animeBanner,
    link: "/products/anime-collection",
  },
];

function DiscoverCollections() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % collections.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [paused]);

  const item = collections[index];

  return (
    <section className="discover">

      <div className="discover-header">
        <h2>DISCOVER THE COLLECTIONS</h2>
      </div>

      <div
        className="slider-container"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >

        <Link to={item.link} className="slider-card">

          {/* 🔥 BLUR CROSSFADE LAYER SYSTEM */}
          <div className="image-layer">

            <div
              className="bg-image old"
              style={{
                backgroundImage: `url(${collections[(index - 1 + collections.length) % collections.length].image})`,
              }}
            />

            <div
              className="bg-image active"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            />

          </div>

          <div className="overlay"></div>

          <div className="card-content">
            <h3 key={item.title}>{item.title}</h3>

            <p key={item.subtitle}>
              {item.subtitle}
            </p>

            <button key={item.button}>
              {item.button} <span>→</span>
            </button>
          </div>

        </Link>

      </div>
    </section>
  );
}

export default DiscoverCollections;