import clsx from "clsx";
import { Link, useNavigate } from "react-router";
import { useCartStore } from "../../stores/cart.store";
import { useState } from "react";
import { FiUser, FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";

import { useAuthStore } from "@/stores/auth.store";
import { authService } from "@/services/auth.service";

type RightMenuProps = {
  className?: string;
};
const RightMenu = ({ className }: RightMenuProps) => {
  const totalItems = useCartStore((s) => s.getTotalItems());
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

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


  const LinkHover: string = "hover:cursor-pointer hover:scale-110 transition";
  return (
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
          onClick={() => (true)}
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
                "w-4.5 h-4.5",
                "rounded-full",
                "bg-over-secundary",
                "text-white text-xs font-bold",
                "flex justify-center items-center",
              )}
            >
              {totalItems}
            </span>
          )}
        </button>
      </div>
  );
};
export default RightMenu;
