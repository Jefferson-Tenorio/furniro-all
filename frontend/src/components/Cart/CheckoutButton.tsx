import { useNavigate } from "react-router";
import { useCartStore } from "../../stores/cart.store";
import toast from "react-hot-toast";

export function CheckoutButton() {
  const isEmpty = useCartStore((s) => s.isEmpty());
  const navigate = useNavigate();

  function handleCheckout() {
    if (isEmpty) {
      toast.error("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  }

  return (
    <button
      className="w-fit cursor-pointer rounded-2xl border border-black px-14.5 py-3.5 text-[20px] transition hover:scale-102"
      onClick={handleCheckout}
    >
      Checkout
    </button>
  );
}
