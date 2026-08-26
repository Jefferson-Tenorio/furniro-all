import { useNavigate } from "react-router";
import { useCartStore } from "@/stores/cart.store";
import { formatPrice } from "@/utils/price";
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
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 right-0 z-50 flex h-[746px] w-full max-w-[417px] flex-col bg-white shadow-xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center gap-[152px] px-7 py-[29px] max-[416px]:justify-between max-[416px]:gap-0">
          <h2 className="flex h-[36px] w-[177px] items-center font-poppins text-[24px] leading-[100%] font-semibold tracking-[0%] text-neutral-900">
            Shopping Cart
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-[36px] w-[16.625px] items-center justify-center"
          >
            <img
              src="/Cart/close_cart.svg"
              alt=""
              className="h-[19px] w-[16.625px]"
            />
          </button>
        </div>

        {/* Header divider */}
        <div className="mr-[100px] mb-[42px] ml-[30px] w-[287px] border-b border-[#D9D9D9] max-[416px]:mr-[30px] max-[416px]:ml-[30px] max-[416px]:w-auto" />

        {/* Products */}
        <div className="flex-1 overflow-y-auto px-7">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-neutral-400">
              <span className="text-5xl">🛒</span>
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            <div>
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

        {/* Footer */}
        <div>
          <div className="px-[90px] max-[416px]:px-7">
            <div className="mt-5 flex items-center gap-[101px] max-[416px]:justify-between max-[416px]:gap-4">
              <span className="flex h-[24px] w-[68px] shrink-0 items-center font-poppins text-[16px] leading-[100%] font-normal">
                Subtotal
              </span>

              <span className="flex h-[24px] min-w-[117px] shrink-0 items-center font-poppins text-[16px] leading-[100%] font-semibold tracking-[0%] text-[#B88E2F]">
                {formatPrice(subtotal)}
              </span>
            </div>
          </div>

          {/* Footer divider */}
          <div className="mt-[23px] w-[417px] border-b border-[#D9D9D9] max-[416px]:w-full" />

          {/* Buttons */}
          <div className="px-[90px] max-[416px]:px-7">
            <div className="mt-[28px] mb-[23px] flex justify-center gap-3">
              <button
                type="button"
                onClick={() => handleNavigate("/cart")}
                className="flex h-[30px] w-[87px] shrink-0 items-center justify-center gap-[10px] rounded-[50px] border border-neutral-900 px-[30px] py-[6px] font-poppins text-[12px] leading-[100%] font-normal tracking-[0%] text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
              >
                Cart
              </button>

              <button
                type="button"
                onClick={() => handleNavigate("/checkout")}
                className="flex h-[30px] w-[118px] shrink-0 items-center justify-center gap-[10px] rounded-[50px] border border-neutral-900 px-[30px] py-[6px] font-poppins text-[12px] leading-[100%] font-normal tracking-[0%] text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default CartSidebar;
