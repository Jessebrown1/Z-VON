import "./DiscoverCollections.css";

import mensImg from "../../assets/mens.png";
import womensImg from "../../assets/womens.png";
import animeImg from "../../assets/animes.png";

const collections = [
  {
    title: "MEN'S WEAR",
    image: mensImg,
  },
  {
    title: "WOMEN'S WEAR",
    image: womensImg,
  },
  {
    title: "ANIME COLLECTION",
    image: animeImg,
  },
];

function DiscoverCollections() {
  return (
    <section className="discover">
      <div className="discover-header">
        <h2>DISCOVER THE COLLECTIONS</h2>
      </div>

      <div className="discover-grid">
        {collections.map((item, index) => (
          <div
            className="collection-card"
            key={index}
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          >
            <div className="overlay"></div>

            <div className="card-content">
              <h3>{item.title}</h3>

              <button>
                Explore
                <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DiscoverCollections;