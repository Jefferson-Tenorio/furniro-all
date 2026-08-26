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
    <div className="flex items-center gap-[35px] pb-[20px]">
      <img
        src={image}
        alt={name}
        className="h-[105px] w-[105px] shrink-0 rounded-[10px] bg-neutral-100 object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder.jpg";
        }}
      />

      <div className="flex h-[56px] w-[130px] mr-[25px] min-w-0 flex-col">
        <p className="font-poppins h-[24px] w-[108px] truncate text-[16px] font-normal leading-[100%] tracking-[0%] text-neutral-900">
          {name}
        </p>

<div className="flex h-[24px] w-max items-center whitespace-nowrap">
  <span className="font-poppins h-[24px] w-[5px] shrink-0 text-[16px] font-light leading-[100%] tracking-[0%] text-neutral-900">
    {quantity}
  </span>

  <span className="font-poppins ml-[15px] mr-[15px] h-[18px] w-[8px] shrink-0 text-[12px] font-light leading-[100%] tracking-[0%] text-neutral-900">
    X
  </span>

  <span className="font-poppins h-[18px] min-w-[87px] shrink-0 whitespace-nowrap text-[12px] font-medium leading-[100%] tracking-[0%] text-[#B88E2F]">
    {formatPrice(price)}
  </span>
</div>
      </div>

<button
  type="button"
  onClick={onRemove}
  aria-label={`Remove ${name}`}
  className="flex h-[20px] w-[20px] shrink-0 items-center justify-center transition"
>
  <img
    src="/Cart/close_cart_item_list.svg"
    alt=""
    className="h-[20px] w-[20px]"
  />
</button>
    </div>
  );
});

SidebarCartItem.displayName = "SidebarCartItem";
