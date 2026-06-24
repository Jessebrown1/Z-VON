import product1 from "../assets/product1.jpg";
import product2 from "../assets/product2.jpg";
import product3 from "../assets/product3.jpg";
import product4 from "../assets/product4.jpg";
import product5 from "../assets/product5.jpg";

/* ================= PRODUCTS ================= */

export const products = [
  {
    id: 1,
    title: {
      main: "ZÉVON Knit Polo",
      subtitle: "Heavyweight Edition",
    },
    price: "₵1,299.00",
    image: [product1, product2, product3, product4, product5],
    stock: 12,
    limitedEdition: false,

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
      main: "Black Cowl-Back Dress",
      subtitle: "Evening Collection",
    },
    price: "₵1,499.00",
    image: [product2, product3, product4, product5],
    stock: 1,
    limitedEdition: true,

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
    price: "₵899.00",
    image: [product3, product4, product5],
    stock: 8,
    limitedEdition: false,

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
    price: "₵1,299.00",
    image: [product4, product5],
    stock: 5,
    limitedEdition: true,

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
      main: "ZÉVON Hoodie",
      subtitle: "Core Collection",
    },
    price: "₵1,199.00",
    image: [product5, product1, product2, product3, product4],
    stock: 3,
    limitedEdition: false,

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