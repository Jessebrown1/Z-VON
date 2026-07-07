import { gsap } from "gsap";

export function flyToCart(product) {
  const imgSrc = product?.image?.[0] || "/placeholder.png";

  const cart =
    document.getElementById("cart-target") ||
    document.getElementById("cart-target-mobile");

  if (!cart) {
    console.warn("Cart not found");
    return;
  }

  const img = document.createElement("img");
  img.src = imgSrc;

  Object.assign(img.style, {
    position: "fixed",
    left: "0px",
    top: "0px",
    width: "70px",
    height: "90px",
    objectFit: "cover",
    borderRadius: "10px",
    zIndex: "999999",
    pointerEvents: "none",
    willChange: "transform",
  });

  document.body.appendChild(img);

  requestAnimationFrame(() => {
    setTimeout(() => {
      const cartRect = cart.getBoundingClientRect();

      const startX = window.innerWidth / 2 - 35;
      const startY = window.innerHeight - 120;

      gsap.set(img, {
        x: startX,
        y: startY,
        scale: 1,
      });

      gsap.to(img, {
        duration: 0.9,
        x: cartRect.left,
        y: cartRect.top,
        scale: 0.2,
        ease: "power3.inOut",
        onComplete: () => img.remove(),
      });
    }, 50);
  });
}