import knit1 from "../assets/knit1.png";
import knit2 from "../assets/knit2.png";
import knit3 from "../assets/knit3.png";
import knit4 from "../assets/knit4.png";

import hoodie1 from "../assets/hoodie1.png";
import hoodie2 from "../assets/hoodie2.png";

import over1 from "../assets/over1.png";
import over2 from "../assets/over2.png";
import over3 from "../assets/over3.png";
import over4 from "../assets/over4.png";

import car1 from "../assets/car1.png";
import car2 from "../assets/car2.png";
import car3 from "../assets/car3.png";

import lav1 from "../assets/lav1.png";
import lav2 from "../assets/lav2.png";
import lav3 from "../assets/lav3.png";


/* ================= PRODUCTS ================= */

export const products = [
  {
    id: 1,
    title: {
      main: "ZÉVON Knit Polo",
      subtitle: "Heavyweight Edition",
    },
    price: "₵200.00",
    image: [knit1,knit4, knit2, knit3],
    stock: 12,
    isLowStock: false,
    limitedEdition: false,
    is3D: true,

    sizes: {
      S: true,
      M: true,
      L: true,
      XL: true,
    },

    description: {
      description:
        "Crafted from premium dense cotton knit with a structured yet breathable feel. Designed for modern street-luxury styling.",
      fit:
        "Relaxed oversized silhouette with dropped shoulders for a loose contemporary shape.",
      construction:
        "Precision stitching with reinforced collar structure and durable seam finishing.",
    },
  },

  {
    id: 2,
    title: {
      main: "ZÉVON Black Hoodie",
      subtitle: "Evening Collection",
    },
    price: "₵250.00",
    image: [hoodie1, hoodie2],
    stock: 1,
    isLowStock: true,
    limitedEdition: false,
    is3D: true,

    sizes: {
      S: true,
      M: false,
      L: false,
      XL: true,
    },

    description: {
      description:
        "Fluid satin-like stretch fabric that enhances natural movement and elegance.",
      fit:
        "Body-contouring silhouette with a dramatic open cowl-back design.",
      construction:
        "Engineered seam placement with reinforced draping for structural flow.",
    },
  },

  {
    id: 3,
    title: {
      main: "ZÉVON Oversized Tee",
      subtitle: "Street Essentials",
    },
    price: "₵100",
    image: [over1, over2, over3, over4],
    stock: 8,
    limitedEdition: false,
    is3D: true,

    sizes: {
      S: true,
      M: true,
      L: true,
      XL: true,
    },

    description: {
      description:
        "Heavyweight cotton jersey with a smooth structured finish for everyday wear.",
      fit:
        "Boxy oversized cut designed for relaxed streetwear layering.",
      construction:
        "Double-stitched hems with reinforced neckline ribbing for durability.",
    },
  },

  {
    id: 4,
    title: {
      main: "ZÉVON Cargo Pants",
      subtitle: "Utility Drop",
    },
    price: "₵300.00",
    image: [car3, car1, car2],
    stock: 11,
    isLowStock: false,
    limitedEdition: true,
    is3D: true,

    sizes: {
      S: false,
      M: true,
      L: true,
      XL: false,
    },

    description: {
      description:
        "Durable cotton twill with a washed premium texture for a worn-in aesthetic.",
      fit:
        "Relaxed tapered fit with adjustable waist structure for utility styling.",
      construction:
        "Multi-pocket system with reinforced stitching and metal hardware detailing.",
    },
  },

  {
    id: 5,
    title: {
      main: "Oversized Tee in Lavender",
      subtitle: "ZÉVON Essentials",
    },
    price: "₵100.00",
    image: [lav1, lav2, lav3],
    stock: 0,
    isLowStock: true,
    limitedEdition: true,
    is3D: true,

    sizes: {
      S: true,
      M: true,
      L: false,
      XL: true,
    },

    description: {
      description:
        "Heavy fleece cotton blend with a soft brushed interior for premium comfort.",
      fit:
        "Oversized drop-shoulder silhouette designed for relaxed streetwear fit.",
      construction:
        "Double-layer hood with ribbed cuffs and reinforced stitching throughout.",
    },
  },
];