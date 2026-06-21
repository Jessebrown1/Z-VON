import { useState, useEffect } from "react";
import "./AnimeDrops.css";

import animeBanner from "../../assets/animeBanner.jpg";
import limitedBanner from "../../assets/limitedBanner.jpg";

const slides = [
  {
    title: "ANIME DROPS",
    subtitle: "Inspired by iconic worlds.",
    text: "New drops. Limited quantities.",
    image: animeBanner,
    button: "Explore Collection",
  },
  {
    title: "LIMITED EDITION",
    subtitle: "Crafted in small quantities.",
    text: "Once sold out, it's gone.",
    image: limitedBanner,
    button: "Explore Collection",
  },
];

function AnimeDrops() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="anime-drops">
      <div className="anime-header">
        <h2>ANIME DROPS</h2>
      </div>

      <div
        className="drop-slide"
        style={{
          backgroundImage: `url(${slides[current].image})`,
        }}
      >
        <div className="overlay" />

        <div key={current} className="slide-content">
          <h3>{slides[current].title}</h3>

          <p>{slides[current].subtitle}</p>

          <span>{slides[current].text}</span>

          <button>{slides[current].button}</button>
        </div>
      </div>


    </section>
  );
}

export default AnimeDrops;