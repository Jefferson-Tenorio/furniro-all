import { useNavigate } from "react-router";
import { useCartStore } from "@/stores/cart.store";
import { formatPrice } from "@/utils/price";
import { FiX } from "react-icons/fi";
import { SidebarCartItem } from "@/components/Cart/SidebarCartItem";
import { getImage } from "../lib/assets";

export function CartSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();

  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const getSubtotal = useCartStore((s) => s.getSubtotal);

  const subtotal = getSubtotal();

  const handleNavigate = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300
          ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden="true"
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[417px] flex-col
          bg-white shadow-xl transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-7 py-[29px]">
          <h2 className="text-2xl font-semibold text-neutral-900">
            Shopping Cart
          </h2>
          <div className="h-[60px] w-px bg-neutral-300 ml-auto mr-6" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="text-neutral-400 transition hover:text-neutral-700"
          >
            <FiX size={28} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-neutral-400">
              <span className="text-5xl">🛒</span>
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {items.map((item) => (
                <SidebarCartItem
                  key={item.id}
                  name={item.name}
                  image={getImage(item.image)}
                  price={item.price}
                  quantity={item.quantity}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-neutral-200 px-7 py-[18px]">
          <div className="flex items-center gap-16">
            <span className="text-base font-semibold text-neutral-900">
              Subtotal
            </span>
            <span className="text-base font-semibold text-[#B88E2F]">
              {formatPrice(subtotal)}
            </span>
          </div>

          <div className="mt-6 flex gap-3 justify-center">
            <button
              type="button"
              onClick={() => handleNavigate("/cart")}
              className="rounded-full border border-neutral-900 px-8 py-2
                         text-xs font-normal text-neutral-900 transition
                         hover:bg-neutral-900 hover:text-white"
            >
              Cart
            </button>
            <button
              type="button"
              onClick={() => handleNavigate("/checkout")}
              className="rounded-full border border-neutral-900 px-8 py-2
                         text-xs font-normal text-neutral-900 transition
                         hover:bg-neutral-900 hover:text-white"
            >
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default CartSidebar;
