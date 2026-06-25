// src/utils/productUtils.js

export function getProductStatus(product) {
  const isSoldOut = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;

  return {
    isSoldOut,
    isLowStock,
  };
}