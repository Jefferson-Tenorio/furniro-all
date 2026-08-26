import { memo, useCallback } from "react";

interface PaymentOptionProps {
  id: string;
  label: string;
  description?: string;
  selected: boolean;
  onSelect: (id: string) => void;
}

export const PaymentOption = memo(
  ({ id, label, description, selected, onSelect }: PaymentOptionProps) => {
    const handleClick = useCallback(() => {
      onSelect(id);
    }, [id, onSelect]);

    return (
      <div>
        <button
          type="button"
          onClick={handleClick}
          className="flex w-full items-center gap-3 py-2 text-left"
        >
          <span
            className={`flex h-4 w-4 items-center justify-center rounded-full border
            ${selected ? "border-neutral-900" : "border-neutral-300"}`}
          >
            {selected && (
              <span className="h-2 w-2 rounded-full bg-neutral-900" />
            )}
          </span>
          <span
            className={`font-poppins flex h-[24px] w-[160px] items-center text-[16px] font-normal leading-[100%] tracking-[0%] ${
              selected ? "text-neutral-900" : "text-[#9F9F9F]"
            }`}
          >
            {label}
          </span>
        </button>
        {selected && description && (
          <p className="mb-2 font-poppins text-[16px] font-light leading-[100%] tracking-[0%] text-justify text-neutral-400">
            {description}
          </p>
        )}
      </div>
    );
  },
);

PaymentOption.displayName = "PaymentOption";
