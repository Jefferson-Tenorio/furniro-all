import { useCartStore } from "@/stores/cart.store";
import type { Product } from "@/types/product";

export function useAddToCart() {
  const addItem = useCartStore((state) => state.addItem);

  const addToCart = (product: Product, quantity: number) => {
    addItem(product, quantity);
  };

  return { addToCart };
}
