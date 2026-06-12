import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Header.css";

import zevon1 from "../../assets/zevon1.jpg";
import zevon2 from "../../assets/zevon2.jpg";
import zevon3 from "../../assets/zevon3.jpg";
import zevon4 from "../../assets/zevon4.jpg";

function Header() {
  const slides = [
    {
      image: zevon1,
      title: "BUILT DIFFERENT",
      text: "Premium streetwear crafted for individuals who refuse to blend in.",
    },
    {
      image: zevon2,
      title: "OWN YOUR STYLE",
      text: "Minimal. Bold. Unapologetic fashion for the new generation.",
    },
    {
      image: zevon3,
      title: "LIMITED DROP",
      text: "Exclusive pieces designed to stand out in every crowd.",
    },
    {
      image: zevon4,
      title: "ZÈVON CULTURE",
      text: "More than fashion — it’s identity, attitude, and movement.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const imgRefs = useRef([]);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (current + 1) % slides.length;

      // IMAGE ANIMATION (morph)
      gsap.to(imgRefs.current[current], {
        opacity: 0,
        scale: 1.15,
        duration: 1.5,
        ease: "power2.inOut",
      });

      gsap.to(imgRefs.current[next], {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.inOut",
      });

      // TEXT ANIMATION
      gsap.to([titleRef.current, textRef.current], {
        opacity: 0,
        y: 20,
        duration: 0.4,
        onComplete: () => {
          setCurrent(next);

          gsap.to([titleRef.current, textRef.current], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          });
        },
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <section className="header">
      {/* TEXT */}
      <div className="header__content">
        <h1 ref={titleRef}>{slides[current].title}</h1>
        <p ref={textRef}>{slides[current].text}</p>
        <button>SHOP NOW</button>
      </div>

      {/* IMAGES */}
      <div className="header__image">
        {slides.map((slide, index) => (
          <img
            key={index}
            ref={(el) => (imgRefs.current[index] = el)}
            src={slide.image}
            alt="Zevon Fashion"
            className="slide-img"
            style={{
              opacity: index === 0 ? 1 : 0,
              transform: "scale(1.1)",
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default Header;