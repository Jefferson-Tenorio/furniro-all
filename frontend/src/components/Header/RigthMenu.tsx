import clsx from "clsx";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useCartStore } from "../../stores/cart.store";
import { useAuthStore } from "@/stores/auth.store";
import { authService } from "@/services/auth.service";
import toast from "react-hot-toast";
import { FiUser, FiLogOut } from "react-icons/fi";
import { CartSidebar } from "../../pages/CartSideBar";

type RightMenuProps = {
  className?: string;
};

const RightMenu = ({ className }: RightMenuProps) => {
  const totalItems = useCartStore((s) => s.getTotalItems());
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
      logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch {
      toast.error("Error logging out");
    }
  };

  const LinkHover: string =
    "hover:cursor-pointer hover:scale-110 transition flex items-center";

  return (
    <>
      <div className={clsx("flex gap-[33.66px]", className)}>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className={clsx(LinkHover)}
            title="Logout"
          >
            <FiLogOut size={22} />
          </button>
        ) : (
          <Link to="/login" className={clsx(LinkHover)} title="Login">
            <FiUser size={22} />
          </Link>
        )}

        <button
          onClick={() => setCartOpen(true)}
          className={clsx(LinkHover, "relative")}
          aria-label="Open cart"
        >
          <img
            src="/Icons/shop.svg"
            alt="Ícone de carrinho"
            className={clsx("max-h-[22.05px]")}
          />
          {totalItems > 0 && (
            <span
              className={clsx(
                "absolute -top-3 -right-3",
                "h-4.5 w-4.5",
                "rounded-full",
                "bg-over-secundary",
                "text-xs font-bold text-white",
                "flex items-center justify-center",
              )}
            >
              {totalItems}
            </span>
          )}
        </button>
      </div>

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default RightMenu;
