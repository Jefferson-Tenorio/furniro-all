import { FiX } from "react-icons/fi";
import { formatPrice } from "@/utils/price";
import { memo } from "react";

interface SidebarCartItemProps {
  name: string;
  image: string;
  price: number;
  quantity: number;
  onRemove: () => void;
}

export const SidebarCartItem = memo(({
  name,
  image,
  price,
  quantity,
  onRemove,
}: SidebarCartItemProps) => {
  return (
    <div className="flex items-center gap-4 py-4">
      <img
        src={image}
        alt={name}
        className="h-[105px] w-[108px] shrink-0 rounded-md object-cover bg-neutral-100"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder.jpg";
        }}
      />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-900 truncate">{name}</p>
        <p className="mt-1 text-sm text-neutral-400">
          {quantity}{" "}
          <span className="text-neutral-500 mx-1">x</span>{" "}
          <span className="font-medium text-[#B88E2F]">{formatPrice(price)}</span>
        </p>
      </div>

      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${name}`}
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full
                   bg-neutral-900 text-white text-xs transition hover:bg-red-500"
      >
        <FiX size={12} />
      </button>
    </div>
  );
});

SidebarCartItem.displayName = "SidebarCartItem";
