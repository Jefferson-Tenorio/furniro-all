import { formatPrice } from "@/utils/price";
import { Link } from "react-router";
import { getImage } from "../../lib/assets";
import {
  useCartStore,
  type CartItem as CartItemType,
} from "../../stores/cart.store";
import { QuantityInput } from "./QuantityInput";
import { RemoveItem } from "./RemoveItem";
import { memo } from "react";

type CartItemProps = {
  item: CartItemType;
};

export const CartItem = memo(({ item }: CartItemProps) => {
  const { id, name, image, price } = item;

  const itemSubtotal = useCartStore((s) => s.getItemSubtotal(id));

  return (
    <div className="mt-8 grid min-w-200 grid-cols-6 items-center gap-9 sm:min-w-auto">
      <Link to={`/product/${id}`}>
        <img
          src={getImage(image)}
          className="h-26.25 w-26.25 rounded-[10px] object-cover"
        />
      </Link>
      <span className="text-footer-gray">{name}</span>
      <span className="text-footer-gray">{formatPrice(price)}</span>
      <QuantityInput id={id} />
      <span className="text-nowrap">{formatPrice(itemSubtotal)}</span>
      <RemoveItem id={id} />
    </div>
  );
});

CartItem.displayName = "CartItem";
