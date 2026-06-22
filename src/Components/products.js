import product1 from "../assets/product1.jpg";
import product2 from "../assets/product2.jpg";
import product3 from "../assets/product3.jpg";
import product4 from "../assets/product4.jpg";
import product5 from "../assets/product5.jpg";

export const products = [
  {
    id: 1,
    name: "ZÉVON Knit Polo",
    price: "R 1,299.00",
    image: [product1,product2,product3,product4,product5],
    stock: 12,
    limitedEdition: false,
  },
  {
    id: 2,
    name: "Black Cowl-Back Dress",
    price: "R 1,499.00",
    image: [product2,product3,product4,product5],
    stock: 0,
    limitedEdition: true,
  },
  {
    id: 3,
    name: "ZÉVON Oversized Tee",
    price: "R 899.00",
    image: [product3,product4,product5],
    stock: 8,
    limitedEdition: false,
  },
  {
    id: 4,
    name: "ZÉVON Cargo Pants",
    price: "R 1,299.00",
    image: [product4,product5],
    stock: 5,
    limitedEdition: true,
  },
  {
    id: 5,
    name: "ZÉVON Hoodie",
    price: "R 1,199.00",
    image: [product5,product1,product2,product3,product4],
    stock: 3,
    limitedEdition: false,
  },
];