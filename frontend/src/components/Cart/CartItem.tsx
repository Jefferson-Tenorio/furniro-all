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
    <div className="grid grid-cols-6 min-w-200 sm:min-w-auto gap-9 mt-8 items-center">
      <Link to={`/product/${id}`}>
        <img
          src={getImage(image)}
          className="w-26.25 h-26.25 object-cover rounded-[10px]"
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
