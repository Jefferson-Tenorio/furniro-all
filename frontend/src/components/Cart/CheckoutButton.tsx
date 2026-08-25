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
      className="w-fit text-[20px] py-3.5 px-14.5 rounded-2xl border border-black cursor-pointer transition hover:scale-102"
      onClick={handleCheckout}
    >
      Checkout
    </button>
  );
}
