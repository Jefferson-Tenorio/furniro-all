import { formatPrice } from "@/utils/price";
import { useCartStore } from "../../stores/cart.store";
import { CheckoutButton } from "./CheckoutButton";

export function CartTotals() {
  const subtotal = useCartStore((s) => s.getSubtotal());
  const total = useCartStore((s) => s.getTotal());

  return (
    <div className="col-span-1 mx-auto flex flex-col items-center justify-center bg-cart px-10 pt-4 pb-16 sm:px-18.75 sm:pb-20 lg:mx-0 lg:w-auto">
      <h1 className="text-[32px] font-bold">Card Totals</h1>
      <div className="mt-15 mb-10.5 flex flex-col gap-7.5">
        <div className="flex gap-14">
          Subtotal:{" "}
          <span className="text-footer-gray">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex gap-14 text-nowrap">
          Total:{" "}
          <span className="text-xl font-medium text-over-secundary">
            {formatPrice(total)}
          </span>
        </div>
      </div>
      <CheckoutButton />
    </div>
  );
}
