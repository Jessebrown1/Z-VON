import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../../Components/products";
import Navbar from "../../Components/Navbar/Navbar"; // ✅ ADD THIS
import "./Collections.css";

export default function Collections() {
  const [active, setActive] = useState("all");

  const categorized = products.map((item) => {
    const name = item.title.main.toLowerCase();

    let category = "other";

    if (name.includes("hoodie")) category = "hoodie";
    else if (name.includes("tee")) category = "tee";
    else if (name.includes("cargo")) category = "cargo";
    else if (name.includes("knit")) category = "knit";

    return { ...item, category };
  });

  const filtered =
    active === "all"
      ? categorized
      : categorized.filter((item) => item.category === active);

  return (
    <>
      <Navbar /> {/* ✅ HERE */}

      <div className="collections">
        <h1 className="title">ZÉVON'S Collections</h1>

        <div className="filters">
          <button onClick={() => setActive("all")}>All</button>
          <button onClick={() => setActive("knit")}>Knit</button>
          <button onClick={() => setActive("hoodie")}>Hoodies</button>
          <button onClick={() => setActive("tee")}>T-Shirts</button>
          <button onClick={() => setActive("cargo")}>Cargo</button>
        </div>

        <div className="grid">
          {filtered.map((item) => (
            <Link
              to={`/products/${item.id}`}
              className="card"
              key={item.id}
            >
              <div className="imgBox">
                <img src={item.image[0]} alt={item.title.main} />
              </div>

              <div className="info">
                <h3>{item.title.main}</h3>
                <p>{item.price}</p>

                {item.stock === 0 ? (
                  <button disabled className="soldOut">
                    Sold Out
                  </button>
                ) : (
                  <button>Add to Cart</button>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}