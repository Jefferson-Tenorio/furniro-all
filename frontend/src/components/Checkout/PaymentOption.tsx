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
            className={`flex h-4 w-4 items-center justify-center rounded-full border ${selected ? "border-neutral-900" : "border-neutral-300"}`}
          >
            {selected && (
              <span className="h-2 w-2 rounded-full bg-neutral-900" />
            )}
          </span>
          <span
            className={`flex h-[24px] w-[160px] items-center font-poppins text-[16px] leading-[100%] font-normal tracking-[0%] ${
              selected ? "text-neutral-900" : "text-[#9F9F9F]"
            }`}
          >
            {label}
          </span>
        </button>
        {selected && description && (
          <p className="mb-2 text-justify font-poppins text-[16px] leading-[100%] font-light tracking-[0%] text-neutral-400">
            {description}
          </p>
        )}
      </div>
    );
  },
);

PaymentOption.displayName = "PaymentOption";
