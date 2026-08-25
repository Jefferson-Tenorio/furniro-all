import type { Product } from "@/types/product";
import { useState } from "react";
import toast from "react-hot-toast";
import { ADDED_TO_CART_MESSAGE } from "../constants/messages";
import { validateVariant } from "../utils/validateVariant";
import { useAddToCart } from "./useAddToCart";

export function useProductVariant(product: Product) {
  const { addToCart: addItemToCart } = useAddToCart();

  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? "");
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity((value) => value + 1);

  const decreaseQuantity = () => setQuantity((value) => Math.max(1, value - 1));

  const addToCart = () => {
    const error = validateVariant(selectedSize, selectedColor);

    if (error) {
      toast.error(error);
      return;
    }
    setQuantity(1);
    addItemToCart(product, quantity);
    toast.success(`${product.name} ${ADDED_TO_CART_MESSAGE}`);
  };

  return {
    selectedSize,
    selectedColor,
    quantity,
    setSelectedSize,
    setSelectedColor,
    increaseQuantity,
    decreaseQuantity,
    addToCart,
  };
}
